'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');

util.inherits(SHL, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function SHL(options) {
    var self = this;
    options = options || {};

    options.title     = 'SHL';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    SHL.super_.call(self, options);

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

    self.shiftOutPin = self.addPin(Pin.POS.TOP, 3, 7, 'out');
    self.shiftInPin  = self.addPin(Pin.POS.BOTTOM, 3, 7, 'in');

}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHL.prototype.init = function () {
    var self = this;
    var basePoint = self.width * 0.25;
    var step = 25;
    for (var i = 0; i < 7; ++i) {
        var ri = 7 - i;
        self.addWire({
            cnn: [
                self.inputs[ri - 1],
                self.outputs[ri]
            ],
            segment: [
                self.inputs[ri - 1],
                {
                    left: basePoint + i * step,
                    top: 'cnn1.top'
                },
                self.outputs[ri]
            ]
        });
    }

    self.addWire({
        cnn: [
            self.shiftInPin,
            self.outputs[0]
        ],
        segment: [
            self.shiftInPin,
            {
                left  : basePoint + step * 7,
                top   : self.height - 13,
                yFirst: true
            },
            {
                left: 0, relX: true,
                top: 'cnn1.top'
            },
            self.outputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.inputs[7],
            self.shiftOutPin
        ],
        segment: [
            self.inputs[7],
            {
                left: basePoint - step,
                top: 13
            },
            self.shiftOutPin
        ]
    });

    return SHL.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHL.prototype.getTitle = function () {
    var self = this;
    var title = SHL.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
SHL.prototype.drawSelf = function (ctx) {
    var self = this;
    SHL.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = SHL;