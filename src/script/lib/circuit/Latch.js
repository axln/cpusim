'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var NAND    = require('../gate/NAND');
var Wire    = require('../conductor/Wire');
var Pin     = require('../conductor/Pin');

util.inherits(Latch, Circuit);

Latch.DEFAULT_HEIGHT = 210;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Latch(options) {
    var self = this;
    options = options || {};

    options.width = 440;
    options.height = Latch.DEFAULT_HEIGHT;
    options.pinMargin = 0.2;


    Latch.super_.call(self, options);

    self.dataPin = self.addPin(Pin.POS.LEFT, 1, 2, 'i', options.dataValue);
    self.setPin = self.addPin(Pin.POS.LEFT, 0, 2, 's');
    self.output = self.addPin(Pin.POS.RIGHT, 0, 1, 'o');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Latch.prototype.init = function () {
    var self = this;

    //self.debugPin = true;

    var nand1 = new NAND({
        id: 'nand1',
        title: 'NAND1',
        left: 40,
        top: 20,
        debugPin: self.debugPin
    });
    //nand1.output.title = 'a';
    self.addChild(nand1);

    var nand2 = new NAND({
        id: 'nand2',
        title: 'NAND2',
        left: 160,
        top: 140,
        //values: [false, true],
        debugPin: self.debugPin
    });
    //nand2.output.title = 'b';
    self.addChild(nand2);

    var nand3 = new NAND({
        type: 'NAND',
        id: 'nand3',
        title: 'NAND3',
        left: 310,
        top: 20,
        //values: [true, false],
        debugPin: self.debugPin
    });
    //nand3.output.title = 'o';
    self.addChild(nand3);

    var nand4 = new NAND({
        id: 'nand4',
        title: 'NAND4',
        left: 310,
        top: 140,
        //values: [true, false],
        debugPin: self.debugPin
    });
    //nand4.output.title = 'c';
    self.addChild(nand4);

    // dataPin to nand1 input[1]
    self.addWire({
        cnn: [
            self.dataPin,
            nand1.inputs[1]
        ],
        segments: [
            [
                self.dataPin,
                nand1.inputs[1]
            ]
        ]
    });

    // setPin to nand1 and nand2
    self.addWire({
        cnn: [
            self.setPin,
            nand1.inputs[0],
            nand2.inputs[0]
        ],
        segments: [
            [
                nand1.inputs[0],
                {
                    left: 0, relX: true,
                    top: 'cnn0.top',
                    solder: true
                }
            ],
            [
                self.setPin,
                {
                    left: 130,
                    top: 0, relY: true
                },
                'cnn2+'
            ]
        ]
    });

    // nand1 output to nand2 and nand3
    self.addWire({
        cnn: [
            nand1.output,
            nand2.inputs[1],
            nand3.inputs[1]
        ],
        segments: [
            [
                nand2.inputs[1],
                {
                    left: 130,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                nand1.output,
                {
                    left: 130,
                    top: 0, relY: true,
                    solder: true
                }
            ]
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
                self.output,
                {
                    left: -25, relX: true,
                    top: 0, relY: true
                },
                'cnn0*+'
            ],
            [
                nand3.output,
                {
                    left: 0, relX: true,
                    top: 40, relY: true
                },
                {
                    left: 'cnn1.left',
                    top: 40, relY: true,
                    skew: true
                },
                nand4.inputs[1]
            ]
        ]
    });

    // nand2 to nand4
    self.addWire({
        cnn: [
            nand2.output,
            nand4.inputs[0]
        ],
        segments: [
            [
                nand2.output,
                'cnn1+'
            ]
        ]
    });

    // nand4 to nand3
    self.addWire({
        cnn: [
            nand4.output,
            nand3.inputs[0]
        ],
        segments: [
            [
                nand4.output,
                {
                    left: 0, relX: true,
                    top: -40, relY: true
                },
                {
                    left: 'cnn1.left',
                    top: -40, relY: true,
                    skew: true
                },
                nand3.inputs[0]
            ]
        ]
    });

    return Latch.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Latch.prototype.drawSelf = function (ctx) {
    var self = this;
    Latch.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 80 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#444444';
        self.fillText(ctx, 'M:' + self.output, self.width / 2, self.height / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Latch.prototype.setTo1 = function () {
    var self = this;
    return self.children['nand3'].output.setValue(false);
};

module.exports = Latch;