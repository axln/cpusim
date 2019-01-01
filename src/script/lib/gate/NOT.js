'use strict';

var util = require('util');
var Gate = require('./Gate');

util.inherits(NOT, Gate);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function NOT(options) {
    var self = this;
    options.inputCount  = 1;
    options.width  = options.width  !== undefined ? options.width  : 40;
    options.height = options.height !== undefined ? options.height : 50;

    options.outline = false;
    NOT.super_.call(self, options);
    self.output.inverted    = true;
    self.output.invertColor = true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
NOT.prototype.drawSelf = function (ctx) {
    var self = this;
    ctx.strokeStyle = '#444444';
    ctx.fillStyle   = '#F4F4F4';
    var halfHeight = self.height / 2;

    // triangle
    ctx.beginPath();
    if (self.flip) {
        self.moveTo(ctx, self.width, 0);
        self.lineTo(ctx, 0, halfHeight);
        self.lineTo(ctx, self.width, self.height);
        self.lineTo(ctx, self.width, 0);
    } else {
        self.moveTo(ctx, 0, 0);
        self.lineTo(ctx, self.width, halfHeight);
        self.lineTo(ctx, 0, self.height);
        self.lineTo(ctx, 0, 0);
    }
    ctx.fill();
    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
NOT.prototype.getOutputValue = function () {
    var self = this;
    // will be inverted by pin
    return self.inputs[0].getValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
NOT.prototype.getTitlePos = function () {
    var self = this;
    return {
        left    : self.flip ? self.width - 4 : 3,
        top     : self.height / 2 - 1,
        baseLine: 'middle'
    };
};

module.exports = NOT;