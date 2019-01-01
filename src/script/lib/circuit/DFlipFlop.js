'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var NAND    = require('../gate/NAND');
var NOT     = require('../gate/NOT');
var Wire    = require('../conductor/Wire');
var Pin     = require('../conductor/Pin');

util.inherits(DFlipFlop, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function DFlipFlop(options) {
    var self = this;
    options = options || {};

    options.width     = 440;
    options.height    = 210;
    options.pinMargin = 0.2;

    DFlipFlop.super_.call(self, options);

    self.dataPin = self.addPin(Pin.POS.LEFT,  3, 4, 'i', options.dataValue);
    self.setPin  = self.addPin(Pin.POS.LEFT,  1, 4, 's');
    self.output  = self.addPin(Pin.POS.RIGHT, 0, 1, 'o');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DFlipFlop.prototype.init = function () {
    var self = this;

    var not = new NOT({
        id: 'not1',
        title: 'NOT',
        left: 40,
        top: 150
    });
    self.addChild(not);

    var nand1 = new NAND({
        id   : 'nand1',
        title: 'NAND1',
        left : 160,
        top  : 20
    });
    nand1.output.title = 'a';
    self.addChild(nand1);

    var nand2 = new NAND({
        id   : 'nand2',
        title: 'NAND2',
        left : 160,
        top  : 140
    });
    nand2.output.title = 'b';
    self.addChild(nand2);

    var nand3 = new NAND({
        type : 'NAND',
        id   : 'nand3',
        title: 'NAND3',
        left : 310,
        top  : 20
    });
    nand3.output.title = 'o';
    self.addChild(nand3);

    var nand4 = new NAND({
        id   : 'nand4',
        title: 'NAND4',
        left : 310,
        top  : 140
    });
    nand4.output.title = 'c';
    self.addChild(nand4);

    self.addWire({
        cnn: [
            self.dataPin,
            nand1.inputs[1],
            not.inputs[0]
        ],
        segments: [
            [
                self.dataPin,
                {
                    left: 'cnn1.left',
                    top: 'cnn0.top'
                },
                nand1.inputs[1]
            ],
            [
                not.inputs[0],
                {
                    left: 0, relX: true,
                    top: 'cnn0.top',
                    solder: true

                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.setPin,
            nand1.inputs[0],
            nand2.inputs[1]
        ],
        segments: [
            [
                self.setPin,
                {left: 'cnn1.left', top: 'cnn0.top', solder: true},
                nand1.inputs[0]
            ],
            [
                {left: 'cnn1.left', top: 'cnn0.top'},
                nand2.inputs[1]
            ]
        ]
    });

    self.addWire({
        cnn: [
            not.output,
            nand2.inputs[0]
        ],
        segment: [
            not.output,
            nand2.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            nand1.output,
            nand3.inputs[1]
        ],
        segment: [
            nand1.output,
            nand3.inputs[1]
        ]
    });

    self.addWire({
        cnn: [
            nand2.output,
            nand4.inputs[0]
        ],
        segments: [
            [
                nand2.output,
                {
                    left: 'cnn0.left',
                    top: 'cnn1.top'
                },
                nand4.inputs[0]
            ]
        ]
    });
    self.addWire({
        cnn: [
            nand4.output,
            nand3.inputs[0]
        ],
        segment: [
            nand4.output,
            {
                left: 'cnn0.left',
                top: -40, relY: true
            },
            {
                left: 'cnn1.left',
                top: -40, relY: true,
                skew: true
            },
            nand3.inputs[0]
        ]
    });
    self.addWire({
        cnn: [
            nand3.output,
            nand4.inputs[1],
            self.output
        ],
        segments: [
            [
                nand3.output,
                {left: 'cnn0.left', top: 40, relY: true},
                {left: 'cnn1.left', top: 40, relY: true, skew: true},
                nand4.inputs[1]
            ],
            [
                'cnn0*',
                {left: 20, top: 'cnn0.top', relX: true},
                {left: 0, top: 'cnn2.top', relX: true},
                self.output
            ]
        ]
    });

    return DFlipFlop.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
DFlipFlop.prototype.drawSelf = function (ctx) {
    var self = this;
    DFlipFlop.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 80 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, 'M:' + self.output, self.width / 2, self.height / 2);
    }
};

module.exports = DFlipFlop;