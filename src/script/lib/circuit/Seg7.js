'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Pin     = require('../conductor/Pin');

util.inherits(Seg7, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Seg7(options) {
    var self = this;

    if (options.width === undefined) {
        options.width = 70;
    }
    if (options.height === undefined) {
        options.height = 120;
    }

    Seg7.super_.call(self, options);

    self.lineSize   = 3;
    self.margin     = 5;
    self.lineHeight = self.height / 2 - self.margin * 2 - self.lineSize * 2;
    self.lineWidth  = self.width - self.margin * 2 - self.lineSize * 2;

    self.segments = [
        {
            left: self.margin + self.lineSize,
            top: self.margin,
            width: self.lineWidth,
            height: self.lineSize
        },
        {
            left: self.width - self.margin - self.lineSize,
            top: self.margin + self.lineSize,
            width: self.lineSize,
            height: self.lineHeight
        },
        {
            left: self.width - self.margin - self.lineSize,
            top: self.height / 2 + self.margin,
            width: self.lineSize,
            height: self.lineHeight
        },
        {
            left: self.margin + self.lineSize,
            top: self.height - self.margin - self.lineSize,
            width: self.lineWidth,
            height: self.lineSize
        },
        {
            left: self.margin,
            top: self.height / 2 + self.margin,
            width: self.lineSize,
            height: self.lineHeight
        },
        {
            left: self.margin,
            top: self.margin + self.lineSize,
            width: self.lineSize,
            height: self.lineHeight
        },
        {
            left: self.margin + self.lineSize,
            top: self.height / 2 - self.lineSize,
            width: self.lineWidth,
            height: self.lineSize
        }
    ];

    self.inputs = [];
    var inputCount = 7;

    for (var i = 0; i < inputCount; ++i) {
        var title = String.fromCharCode(97 + i);
        var input = self.addPin(Pin.POS.LEFT, inputCount - 1 - i, inputCount, title);
        self.inputs.push(input);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Seg7.prototype.getTitle = function () {
    //var self = this;
    return '';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Seg7.prototype.drawSelf = function (ctx) {
    var self = this;
    Seg7.super_.prototype.drawSelf.call(self, ctx);
    for (var i = 0; i < self.inputs.length; ++i) {
        if (self.inputs[i].value) {
            var segment = self.segments[i];
            ctx.beginPath();
            self.moveTo(ctx, segment.left, segment.top);
            self.lineTo(ctx, segment.left + segment.width, segment.top);
            self.lineTo(ctx, segment.left + segment.width, segment.top + segment.height);
            self.lineTo(ctx, segment.left, segment.top + segment.height);
            self.lineTo(ctx, segment.left, segment.top);
            ctx.strokeStyle =  '#444444';
            ctx.fillStyle = '#444444';
            ctx.fill();
        }
    }
};

module.exports = Seg7;