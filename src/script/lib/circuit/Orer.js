'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');
var OR      = require('../gate/OR');

util.inherits(Orer, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Orer(options) {
    var self = this;
    options = options || {};

    options.title     = 'OR';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Orer.super_.call(self, options);

    self.inputsA = [];
    self.inputsB = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var inputA = self.addPin(Pin.POS.LEFT, i, pinCount, 'a'+ i);
        self.inputsA.push(inputA);

        var inputB = self.addPin(Pin.POS.TOP, i, pinCount, 'b'+ i);
        self.inputsB.push(inputB);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'c'+ j);
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Orer.prototype.init = function () {
    var self = this;
    var scale = 0.7;
    for (var i = 0; i < 8; ++i) {
        var or = new OR({
            title: 'OR' + i,
            left : self.width * 0.7,
            top  : self.getPinPoint(i, Pin.POS.LEFT, 8).top - (50 * scale) / 2,
            scale: scale
        });
        self.addChild(or);

        self.addWire({
            cnn: [
                self.inputsA[i],
                or.inputs[0]
            ],
            segment: [
                self.inputsA[i],
                {
                    top: 'cnn1.top',
                    left: 20
                },
                or.inputs[0]
            ]
        });

        self.addWire({
            cnn: [
                self.inputsB[i],
                or.inputs[1]
            ],
            segment: [
                self.inputsB[i],
                {
                    top   : 35 - 3 * i,
                    left  : self.width * self.pinMargin + 21 - 3 * i,
                    yFirst: true
                },
                {
                    left: 0, relX: true,
                    top: 'cnn1.top'
                },
                or.inputs[1]
            ]
        });

        self.addWire({
            cnn: [
                or.output,
                self.outputs[i]
            ],
            segment: [
                or.output,
                self.outputs[i]
            ]
        });
    }

    return Orer.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Orer.prototype.getTitle = function () {
    var self = this;
    var title = Orer.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Orer.prototype.drawSelf = function (ctx) {
    var self = this;
    Orer.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Orer;