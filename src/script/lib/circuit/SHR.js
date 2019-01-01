'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');

util.inherits(SHR, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SHR(options) {
    var self = this;
    options = options || {};

    options.title     = 'SHR';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    SHR.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, pinCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'o'+ j);
        self.outputs.push(output);
    }

    self.shiftInPin  = self.addPin(Pin.POS.TOP, 0, 1, 'in');
    self.shiftOutPin = self.addPin(Pin.POS.BOTTOM, 0, 1, 'out');

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHR.prototype.init = function () {
    var self = this;
    var basePoint = self.width * 0.75;
    var step = 25;
    for (var i = 0; i < 7; ++i) {
        var ri = 7 - i;
        self.addWire({
            cnn: [
                self.inputs[ri],
                self.outputs[ri - 1]
            ],
            segment: [
                self.inputs[ri],
                {
                    left: basePoint - i * step,
                    top: 'cnn1.top'
                },
                self.outputs[ri - 1]
            ]
        });
    }

    self.addWire({
        cnn: [
            self.shiftInPin,
            self.outputs[7]
        ],
        segment: [
            self.shiftInPin,
            {
                left: 20, relX: true,
                top: 13,
                yFirst: true
            },
            {
                left: basePoint + step,
                top: 'cnn1.top'
            },
            self.outputs[7]
        ]
    });

    self.addWire({
        cnn: [
            self.inputs[0],
            self.shiftOutPin
        ],
        segments: [
            [
                self.inputs[0],
                {
                    left: basePoint - step * 7,
                    top: self.height - 13
                },
                self.shiftOutPin
            ]
        ]
    });

    return SHR.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHR.prototype.getTitle = function () {
    var self = this;
    var title = SHR.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHR.prototype.drawSelf = function (ctx) {
    var self = this;
    SHR.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = SHR;