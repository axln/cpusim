'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var Pin     = require('../conductor/Pin');

util.inherits(Enabler, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Enabler(options) {
    var self = this;
    options = options || {};
    options.width     = 200;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    options.title = options.title || 'E';

    Enabler.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, pinCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'eo'+ j);
        self.outputs.push(output);
    }

    self.enablePin = self.addPin(Pin.POS.BOTTOM, 6, 8, 'e');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Enabler.prototype.init = function () {
    var self = this;
    var ands = [];
    var enableWireOptions = {
        cnn     : [self.enablePin],
        segments: []
    };
    var scale = 0.5;

    for (var i = 0; i < 8; ++i) {
        var and = new AND({
            id      : 'and' + i,
            title   : 'eAND' + i,
            left    : self.width / 2 - 30 * scale,
            top     : self.outputs[i].getPoint(true).top - 25 * scale,
            scale   : scale,
            debugPin: self.debugPin
        });
        ands.push(and);
        self.addChild(and);

        // input to and
        self.addWire({
            cnn: [
                self.inputs[i],
                and.inputs[1]
            ],
            segment: [
                self.inputs[i],
                {
                    left: 25, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        //
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

        enableWireOptions.cnn.push(and.inputs[0]);

        if (i == 7) {
            enableWireOptions.segments.push([
                self.enablePin,
                'cnn' + (i + 1) + '+'
            ]);
        } else {
            enableWireOptions.segments.push([
                and.inputs[0],
                {
                    left: 'cnn0.left',
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

    }
    self.addWire(enableWireOptions);

    return Enabler.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Enabler.prototype.getTitle = function () {
    var self = this;
    var title = Enabler.super_.prototype.getTitle.call(self);
    return title + ':' + self.enablePin;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Enabler.prototype.drawSelf = function (ctx) {
    var self = this;
    Enabler.super_.prototype.drawSelf.call(self, ctx);

    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Enabler;