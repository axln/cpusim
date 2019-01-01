'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');
var AND     = require('../gate/AND');

util.inherits(Ander, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Ander(options) {
    var self = this;
    options = options || {};

    options.title     = 'AND';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Ander.super_.call(self, options);

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
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ander.prototype.init = function () {
    var self = this;
    var scale = 0.7;
    for (var i = 0; i < 8; ++i) {
        var and = new AND({
            title: 'AND' + i,
            left : self.width * 0.7,
            top  : self.getPinPoint(i, Pin.POS.LEFT, 8).top - (50 * scale) / 2,
            scale: scale
        });
        self.addChild(and);

        self.addWire({
            cnn: [
                self.inputsA[i],
                and.inputs[0]
            ],
            segment: [
                self.inputsA[i],
                {
                    top: 'cnn1.top',
                    left: 20
                },
                and.inputs[0]
            ]
        });

        self.addWire({
            cnn: [
                self.inputsB[i],
                and.inputs[1]
            ],
            segment: [
                self.inputsB[i],
                {
                    top   : 35 - 3 * i,
                    left  : self.width * self.pinMargin  + 21 - 3 * i,
                    yFirst: true
                },
                'cnn1+'
            ]
        });

        self.addWire({
            cnn: [
                and.output,
                self.outputs[i]
            ],
            segment: [
                and.output,
                self.outputs[i]
            ]
        });
    }

    return Ander.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ander.prototype.getTitle = function () {
    var self = this;
    var title = Ander.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ander.prototype.drawSelf = function (ctx) {
    var self = this;
    Ander.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Ander;