'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var XOR     = require('../gate/XOR');
var AND     = require('../gate/AND');
var NOT     = require('../gate/NOT');
var OR      = require('../gate/OR');
var Wire    = require('../conductor/Wire');
var Pin     = require('../conductor/Pin');

util.inherits(CMP, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CMP(options) {
    var self = this;
    options = options || {};

    options.width     = 440;
    options.height    = 210;
    options.pinMargin = 0.2;
    options.title     = options.title || 'CMP';

    CMP.super_.call(self, options);

    self.eqInPin     = self.addPin(Pin.POS.TOP,  4, 6, 'equal in');
    self.largerInPin = self.addPin(Pin.POS.TOP,  1, 6, 'a larger in');

    self.inputA = self.addPin(Pin.POS.LEFT, 1, 2, 'a');
    self.inputB = self.addPin(Pin.POS.LEFT, 0, 2, 'b');
    self.inputs = [self.inputA, self.inputB];

    self.eqOutPin     = self.addPin(Pin.POS.BOTTOM,  4, 6, 'equal out');
    self.largerOutPin = self.addPin(Pin.POS.BOTTOM,  1, 6, 'a larger out');

    self.output   = self.addPin(Pin.POS.RIGHT, 0, 1, 'xor');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CMP.prototype.init = function () {
    var self = this;
    var xor = new XOR({
        title: 'XOR',
        left: 40,
        top : 55
    });
    self.addChild(xor);

    var not = new NOT({
        title: 'NOT',
        left: 70,
        top: 130
    });
    self.addChild(not);

    var and1 = new AND({
        title: 'AND1',
        left: 220,
        top: 30,
        inputCount: 3
    });
    self.addChild(and1);

    var and2 = new AND({
        title: 'AND2',
        left: 190,
        top: 130
    });
    self.addChild(and2);

    var or = new OR({
        title: 'OR',
        left: 340,
        top: 30
    });
    self.addChild(or);

    self.addWire({
        cnn: [
            self.inputA,
            xor.inputs[1],
            and1.inputs[1]
        ],
        segments: [
            [
                {
                    top: 'cnn0.top',
                    left: 'cnn1.left',
                    solder: true
                },
                xor.inputs[1]
            ],
            [
                self.inputA,
                {
                    left: 120, relX: true,
                    top: 'cnn2.top'
                },
                and1.inputs[1]
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.inputB,
            xor.inputs[0]
        ],
        segment: [
            self.inputB,
            xor.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            xor.output,
            self.output,
            not.inputs[0],
            and1.inputs[0]
        ],
        segments: [
            [
                xor.output,
                {
                    left: 20, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                'cnn0*',
                {
                    left: 0, relX: true,
                    top: 40, relY: true
                },
                not.inputs[0]
            ],
            [
                {
                    left: 'cnn3.left',
                    top: 'cnn1.top',
                    solder: true
                },
                and1.inputs[0]
            ]
        ]
    });
    self.addWire({
        cnn: [
            self.eqInPin,
            and2.inputs[1],
            and1.inputs[2]
        ],
        segments: [
            [
                self.eqInPin,
                {
                    left: 'cnn1.left',
                    top: 20, relY: true,
                    yFirst: true
                },
                and2.inputs[1]
            ],
            [
                {
                    left: 'cnn1.left',
                    top: 'cnn2.top',
                    solder: true
                },
                and1.inputs[2]
            ]
        ]
    });

    self.addWire({
        cnn: [
            not.output,
            and2.inputs[0]
        ],
        segment: [
            not.output,
            and2.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            and2.output,
            self.eqOutPin
        ],
        segment: [
            and2.output,
            {
                left: 0, relX: true,
                top: self.height - 15
            },
            self.eqOutPin
        ]
    });

    self.addWire({
        cnn: [
            and1.output,
            or.inputs[0]
        ],
        segment: [
            and1.output,
            or.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.largerInPin,
            or.inputs[1]
        ],
        segment: [
            self.largerInPin,
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            or.output,
            self.largerOutPin
        ],
        segment: [
            or.output,
            {
                top: self.height - 15,
                left: 0, relX: true
            },
            self.largerOutPin
        ]
    });

    return CMP.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CMP.prototype.drawSelf = function (ctx) {
    var self = this;
    CMP.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 80 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, 'CMP:' + self.output, self.width / 2, self.height / 2);
    }
};

module.exports = CMP;