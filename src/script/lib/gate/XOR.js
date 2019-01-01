'use strict';

var util = require('util');
var OR   = require('./OR');

util.inherits(XOR, OR);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function XOR(options) {
    var self = this;
    XOR.super_.call(self, options);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
XOR.prototype.drawSelf = function (ctx) {
    var self = this;
    XOR.super_.prototype.drawSelf.call(self, ctx);

    var leftOffset = 5;
    // inputs arc
    ctx.beginPath();

    if (self.flip) {
        var topPointF = {
            left: self.width,
            top : 0
        };

        var bottomPointF = {
            left: self.width,
            top : self.height
        };

        self.moveTo(ctx, leftOffset + bottomPointF.left, bottomPointF.top);
        self.bezierCurveTo(
            ctx,
            leftOffset + bottomPointF.left - 10, bottomPointF.top - 10,
            leftOffset + topPointF.left - 10, topPointF.top + 10,
            leftOffset + topPointF.left, topPointF.top
        );
    } else {
        var topPoint = {
            left: 0,
            top: 0
        };

        var bottomPoint = {
            left: 0,
            top : self.height
        };

        self.moveTo(ctx, -leftOffset + bottomPoint.left, bottomPoint.top);
        self.bezierCurveTo(
            ctx,
            -leftOffset + bottomPoint.left + 10, bottomPoint.top - 10,
            -leftOffset + topPoint.left + 10, topPoint.top + 10,
            -leftOffset + topPoint.left, topPoint.top
        );
    }

    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
XOR.prototype.getOutputValue = function () {
    var self = this;
    var result = XOR.xor(self.inputs[0].getValue(), self.inputs[1].getValue());
    for(var i = 2; i < self.inputs.length; ++i ) {
        result = XOR.xor(result, self.inputs[i].getValue());
    }
    return result;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
XOR.xor = function (a, b) {
    return a !== b;
};

module.exports = XOR;