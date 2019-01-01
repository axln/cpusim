'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');
var ADD     = require('./ADD');

util.inherits(Adder, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Adder(options) {
    var self = this;
    options = options || {};

    options.title     = 'ADD';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Adder.super_.call(self, options);

    self.inputsA = [];
    self.inputsB = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var inputA = self.addPin(Pin.POS.LEFT, i, pinCount, 'a' + i);
        self.inputsA.push(inputA);

        var inputB = self.addPin(Pin.POS.TOP, i, pinCount, 'b' + i);
        self.inputsB.push(inputB);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'c' + j);
        self.outputs.push(output);
    }

    self.carryIn  = self.addPin(Pin.POS.BOTTOM, 4, 6, 'carry in');
    self.carryOut = self.addPin(Pin.POS.BOTTOM, 1, 6, 'carry out');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Adder.prototype.init = function () {
    var self = this;
    var scale = 0.2;
    var baseTop = 45;

    for (var i = 0; i < 8; ++i) {
        var ri = 7 - i;
        var add = new ADD({
            title: 'ADD' + ri,
            id   : 'add' + ri,
            left : 100,
            top  : baseTop + 55 * i,
            scale: scale
        });
        self.addChild(add);

        self.addWire({
            cnn: [
                self.inputsA[ri],
                add.inputA
            ],
            segment: [
                self.inputsA[ri],
                {
                    left: 10, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        self.addWire({
            cnn: [
                self.inputsB[ri],
                add.inputB
            ],
            segment: [
                self.inputsB[ri],
                {
                    top   : 3 + i * 3,
                    left  : self.width * self.pinMargin + i * 3,
                    yFirst: true
                },
                'cnn1+'
            ]
        });

        self.addWire({
            cnn: [
                add.output,
                self.outputs[ri]
            ],
            segment: [
                add.output,
                {
                    left: self.width - 10,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });
        if (i > 0) {
            var prevCarryIn = self.children['add' + (ri + 1)].carryIn;
            self.addWire({
                cnn: [
                    add.carryOut,
                    prevCarryIn
                ],
                segment: [
                    add.carryOut,
                    prevCarryIn
                ]
            });
        }
    }

    self.addWire({
        cnn: [
            self.carryIn,
            self.children['add0'].carryIn
        ],
        segment: [
            self.carryIn,
            {
                left: 0, relX: true,
                top: self.height - 10
            },
            self.children['add0'].carryIn
        ]
    });

    self.addWire({
        cnn: [
            self.children['add7'].carryOut,
            self.carryOut
        ],
        segments: [
            [
                self.children['add7'].carryOut,
                {
                    top: -5, relY: true,
                    left: 0, relX: true
                },
                self.carryOut
            ]
        ]
    });

    return Adder.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Adder.prototype.getTitle = function () {
    var self = this;
    var title = Adder.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Adder.prototype.drawSelf = function (ctx) {
    var self = this;
    Adder.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Adder;