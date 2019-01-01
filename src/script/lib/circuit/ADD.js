'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var XOR     = require('../gate/XOR');
var AND     = require('../gate/AND');
var NOT     = require('../gate/NOT');
var OR      = require('../gate/OR');
var Wire    = require('../conductor/Wire');
var Pin     = require('../conductor/Pin');

util.inherits(ADD, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ADD(options) {
    var self = this;
    options = options || {};

    options.width     = 410;
    options.height    = 210;
    options.pinMargin = 0.2;
    options.title     = options.title || 'ADD';

    ADD.super_.call(self, options);

    self.inputA = self.addPin(Pin.POS.LEFT, 6,8, 'a');
    self.inputB = self.addPin(Pin.POS.LEFT, 1,8, 'b');

    self.carryIn  = self.addPin(Pin.POS.BOTTOM, 0,1, 'carry in');
    self.carryOut = self.addPin(Pin.POS.TOP,    0,1, 'carry out');

    self.output = self.addPin(Pin.POS.RIGHT, 0,1, 'c');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ADD.prototype.init = function () {
    var self = this;

    var scale = 1;

    var xor1 = new XOR({
        title: 'XOR1',
        top  : 15,
        left : 55,
        scale: scale
    });
    self.addChild(xor1);

    var xor2 = new XOR({
        title: 'XOR2',
        id   : 'xor2',
        top  : 15,
        left : 305,
        scale: scale
    });
    self.addChild(xor2);

    var and1 = new AND({
        title: 'AND1',
        id   : 'and1',
        top  : 70,
        left : 180,
        scale: scale
    });
    self.addChild(and1);

    var and2 = new AND({
        title: 'AND2',
        top  : 130,
        left : 180,
        scale: scale
    });
    self.addChild(and2);

    var or = new OR({
        title: 'OR',
        top  : 100,
        left : 290,
        scale: scale
    });
    self.addChild(or);

    // a to xor1 and and2
    self.addWire({
        cnn: [
            self.inputA,
            xor1.inputs[1],
            and2.inputs[1]
        ],
        segments: [
            [
                xor1.inputs[1],
                {
                    left: 15,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                self.inputA,
                {
                    left: 15,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    // b to xor1 and and2
    self.addWire({
        cnn: [
            self.inputB,
            xor1.inputs[0],
            and2.inputs[0]
        ],
        segments: [
            [
                xor1.inputs[0],
                {
                    left: 30,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                self.inputB,
                {
                    left: 30,
                    top: 0, relY: true,
                    solder: true
                }
            ]

        ]
    });

    // xor1 to xor2 and and1
    self.addWire({
        cnn: [
            xor1.output,
            xor2.inputs[1],
            and1.inputs[0]
        ],
        segments: [
            [
                xor2.inputs[1],
                {
                    left: 140,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                xor1.output,
                {
                    left: 140,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.carryIn,
            and1.inputs[1],
            xor2.inputs[0]
        ],
        segments: [
            [
                self.carryIn,
                {
                    left: 155,
                    top: self.height - 15,
                    yFirst: true
                },
                'cnn2+'
            ],
            [
                and1.inputs[1],
                {
                    left: 155,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            and1.output,
            or.inputs[1]
        ],
        segments: [
            [
                and1.output,
                or.inputs[1]
            ]
        ]
    });

    self.addWire({
        cnn: [
            and2.output,
            or.inputs[0]
        ],
        segments: [
            [
                and2.output,
                or.inputs[0]
            ]
        ]
    });

    self.addWire({
        cnn: [
            xor2.output,
            self.output
        ],
        segments: [
            [
                xor2.output,
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            or.output,
            self.carryOut
        ],
        segments: [
            [
                or.output,
                {
                    top: -50, relY: true,
                    left: 0, relX: true
                },
                {
                    top: 15,
                    left: 250
                },
                self.carryOut
            ]
        ]
    });

    return ADD.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ADD.prototype.drawSelf = function (ctx) {
    var self = this;
    ADD.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 80 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, 'ADD:' + self.output, self.width / 2, self.height / 2);
    }
};

module.exports = ADD;