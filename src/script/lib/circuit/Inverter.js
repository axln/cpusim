'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');
var NOT     = require('../gate/NOT');

util.inherits(Inverter, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Inverter(options) {
    var self = this;
    options = options || {};

    options.title     = 'NOT';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Inverter.super_.call(self, options);

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
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Inverter.prototype.init = function () {
    var self = this;
    var scale = 0.7;
    for (var i = 0; i < 8; ++i) {
        var not = new NOT({
            title: 'NOT' + i,
            left : self.width / 2 - 25 * scale,
            top  : self.getPinPoint(i, Pin.POS.LEFT, 8).top - (50 * scale) / 2,
            scale: scale
        });
        self.addChild(not);

        self.addWire({
            cnn: [
                self.inputs[i],
                not.inputs[0]
            ],
            segment: [
                self.inputs[i],
                not.inputs[0]
            ]
        });

        self.addWire({
            cnn: [
                not.output,
                self.outputs[i]
            ],
            segment: [
                not.output,
                self.outputs[i]
            ]
        });
    }

    return Inverter.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Inverter.prototype.getTitle = function () {
    var self = this;
    var title = Inverter.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Inverter.prototype.drawSelf = function (ctx) {
    var self = this;
    Inverter.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Inverter;