'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');
var NOT     = require('../gate/NOT');
var ORR     = require('../gate/OR');

util.inherits(Zero, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Zero(options) {
    var self = this;
    options = options || {};

    options.title     = 'Z';
    options.width     = 120;
    options.height    = 200;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Zero.super_.call(self, options);

    self.inputs  = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, pinCount, 'i'+ i);
        self.inputs.push(input);
    }
    self.output = self.addPin(Pin.POS.RIGHT, 0, 1, 'z');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Zero.prototype.init = function () {
    var self = this;
    var scale = 0.4;

    var or = new ORR({
        title: 'OR',
        left: 45,
        top : self.height / 2 - 25 * scale,
        scale: scale,
        inputCount: 8
    });
    self.addChild(or);

    var not = new NOT({
        title: 'NOT',
        left: 85,
        top : self.height / 2 - 25 * scale,
        scale: scale
    });
    self.addChild(not);

    for (var i = 0; i < 8; ++i) {
        var offset = i < 4 ? 4 - i : i - 3;
        self.addWire({
            cnn:[
                self.inputs[i],
                or.inputs[i]
            ],
            segment: [
                self.inputs[i],
                {
                    left: 20  + offset * 3,
                    top: 'cnn1.top'
                },
                'cnn1+'
            ]
        });
    }

    self.addWire({
        cnn: [
            or.output,
            not.inputs[0]
        ],
        segment: [
            or.output,
            not.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            not.output,
            self.output
        ],
        segment: [
            not.output,
            self.output
        ]
    });

    return Zero.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Zero.prototype.getTitle = function () {
    var self = this;
    var title = Zero.super_.prototype.getTitle.call(self);
    return title + ':' + (self.output.value ? '1' : '0');
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Zero.prototype.drawSelf = function (ctx) {
    var self = this;
    Zero.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 30 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Zero;