'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var NOT     = require('../gate/NOT');
var Pin     = require('../conductor/Pin');
var Helper  = require('../Helper');

util.inherits(Decoder, Circuit);

Decoder.AND_Y_SPACE = 30;
Decoder.NOT_X_SPACE = 40;
Decoder.NOT_Y_SPACE = 12;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Decoder(options) {
    var self = this;
    options = options || {};

    options.inputCount  = options.inputCount || 2;
    options.outputCount = Math.pow(2, options.inputCount);

    options.width     = Decoder.NOT_X_SPACE * (options.inputCount + 2);
    options.height    = options.height    || Decoder.AND_Y_SPACE * options.outputCount + Decoder.AND_Y_SPACE + 30;
    options.pinMargin = options.pinMargin || 0.18;
    options.minScale  = 0.5;


    Decoder.super_.call(self, options);

    self.flip     = options.flip     !== undefined ? !!options.flip     : false;
    self.reversed = options.reversed !== undefined ? !!options.reversed : false;

    self.inputs  = [];
    self.outputs = [];

    for (var i = 0; i < options.inputCount; ++i) {
        var input = self.addPin(self.flip ? Pin.POS.RIGHT : Pin.POS.LEFT, i, options.inputCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < options.outputCount; ++j) {
        var output = self.addPin(self.flip ? Pin.POS.LEFT : Pin.POS.RIGHT, self.reversed ? options.outputCount - 1- j : j, options.outputCount, 'o'+ j);
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Decoder.prototype.init = function () {
    var self = this;
    var nots     = [];
    var onWires  = [];
    var offWires = [];

    for (var j = 0; j < self.inputs.length; ++j) {
        var rj =  self.inputs.length - 1 - j;

        var notLeft = self.flip ?
            Decoder.NOT_X_SPACE * (rj + 1) + 25:
            Decoder.NOT_X_SPACE * (self.inputs.length - rj);

        var not = new NOT({
            id   : 'not' + j,
            title: 'NOT' + j,
            left : notLeft,
            top  : 7 + Decoder.NOT_Y_SPACE * rj,
            scale: 0.25,
            flip : self.flip
        });
        nots.push(not);
        self.addChild(not);

        var offset = 5 * (rj + 1);
        onWires.push({
            cnn: [
                self.inputs[j],
                not.inputs[0]
            ],
            segments: [
                [
                    self.inputs[j],
                    {
                        left: self.flip ? -offset: offset, relX: true,
                        top : 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });
        offWires.push({
            cnn     : [not.output],
            segments: []
        });
    }

    var scale = 0.25;
    for (var i = 0; i < self.outputs.length; ++i) {
        var and = new AND({
            id        : 'and' + i,
            title     : 'AND' + i,
            left      : self.children['not' + (self.inputs.length - 1)].left + (self.flip ? - 45 : 45),
            top       : self.outputs[i].getPoint(true).top - 25 * scale,
            inputCount: self.inputs.length,
            scale     : scale,
            flip      : self.flip
        });
        self.addChild(and);

        // and to output
        self.addWire({
            cnn: [
                and.output,
                self.outputs[i]
            ],
            segments: [
                [
                    and.output,
                    self.outputs[i]
                ]
            ]
        });

        var binary = Helper.number2BinString(i);
        // zero padding
        var count = self.inputs.length - binary.length;
        for (var k = 0; k < count; ++k) {
            binary = '0' + binary;
        }
        binary = binary.split('');
        //console.log('binary:', binary);

        for (var n = 0; n < binary.length; ++n) {
            var nr = binary.length - 1 - n;
            var value = binary[n];
            if (value == '0') {
                offWires[nr].cnn.push(and.inputs[n]);
                offWires[nr].segments.push([
                    and.inputs[n],
                    {
                        left  : 'cnn0.left',
                        top   : 0, relY: true,
                        solder: true
                    }
                ]);

            } else {
                onWires[nr].cnn.push(and.inputs[n]);
                onWires[nr].segments.push([
                    and.inputs[n],
                    {
                        left  : 'cnn1.left',
                        top   : 0, relY: true,
                        solder: true
                    }
                ]);
            }
        }
    }

    for (var m = 0; m < onWires.length; ++m) {
        var wireOptions = onWires[m];
        var lastSegment = wireOptions.segments[self.reversed ? wireOptions.segments.length - 1 : 1];
        //console.log('onWires[%d], lastSegment ', index, lastSegment);
        lastSegment[lastSegment.length - 1].solder = false;
        lastSegment.push('cnn1*');
        self.addWire(wireOptions);
    }

    for (var p = 0; p < offWires.length; ++p) {
        var offWireOptions = offWires[p];
        var lastOffSegment = offWireOptions.segments[self.reversed ? offWireOptions.segments.length - 1 : 0];
        //console.log('offWires[%d], lastSegment ', index, lastSegment);
        lastOffSegment[lastOffSegment.length - 1].solder = false;
        lastOffSegment.push('cnn0');
        self.addWire(offWireOptions);
    }

    return Decoder.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Decoder.prototype.drawSelf = function (ctx) {
    var self = this;
    Decoder.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.inputs.length + 'X' + self.outputs.length, self.width / 2, self.height / 2);
    }
};

module.exports = Decoder;