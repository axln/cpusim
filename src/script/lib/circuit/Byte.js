'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Latch   = require('./Latch');
var Pin     = require('../conductor/Pin');
var Helper  = require('../Helper');

util.inherits(Byte, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Byte(options) {
    var self = this;
    options = options || {};

    options.width     = options.width  || 190;
    options.height    = options.height || Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.08;

    options.cellCount = options.cellCount || 8;

    Byte.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];

    for (var i = 0; i < options.cellCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, options.cellCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < options.cellCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, options.cellCount, 'o'+ j);
        self.outputs.push(output);
    }

    self.setPin = self.addPin(Pin.POS.BOTTOM, 18, 20, 's');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Byte.prototype.init = function () {
    var self = this;
    var setWireOptions = {
        cnn     : [self.setPin],
        segments: []
    };
    var scale = 0.25;

    for (var i = 0; i < self.inputs.length; ++i) {
        var latch = new Latch({
            id   : 'latch' + i,
            title: 'Latch' + i,
            left : 40,
            top  : self.outputs[i].getPoint(true).top - Latch.DEFAULT_HEIGHT / 2 * scale,
            scale: scale
        });
        self.addChild(latch);

        // input to latch's i
        self.addWire({
            cnn: [
                self.inputs[i],
                latch.dataPin
            ],
            segment: [
                self.inputs[i],
                {
                    left: 10, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        // latch's output to output
        self.addWire({
            cnn: [
                latch.output,
                self.outputs[i]
            ],
            segment: [
                latch.output,
                self.outputs[i]
            ]
        });

        setWireOptions.cnn.push(latch.setPin);
        if (i == self.inputs.length - 1) {
            setWireOptions.segments.push([
                self.setPin,
                'cnn' + self.inputs.length + '+'
            ]);
        } else {
            setWireOptions.segments.push([
                latch.setPin,
                {
                    left: 'cnn0.left',
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }
    }

    self.addWire(setWireOptions);

    return Byte.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Byte.prototype.getTitle = function () {
    var self = this;
    var title = Byte.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Byte.prototype.drawSelf = function (ctx) {
    var self = this;
    Byte.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Byte.prototype.setByte = function (byte) {
    var self = this;
    var binaryString = Helper.number2BinString(byte);
    var bitsToSet = [];
    for (var i =  0; i < binaryString.length; ++i) {
        var ri = binaryString.length - 1 - i;
        if (binaryString[ri] === '1') {
            bitsToSet.push(i);
        }
    }
    return Promise.all(bitsToSet.map(function (latchIndex) {
        return self.children['latch' + latchIndex].setTo1();
    }));
};

module.exports = Byte;