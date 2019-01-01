'use strict';

var util = require('util');
var Gate = require('./Gate');

util.inherits(AND, Gate);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function AND(options) {
    var self = this;
    if (options.inputCount !== undefined) {
        options.inputCount  = Math.max(options.inputCount, 2);
    } else {
        options.inputCount = 2;
    }
    if (options.width === undefined) {
        options.width = 60;
    }
    if (options.height === undefined) {
        options.height = 50;
    }
    options.outline = false;
    AND.super_.call(self, options);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AND.prototype.drawSelf = function (ctx) {
    var self = this;
    var radius = self.height / 2;

    // gray line between arc and rectangle
    ctx.beginPath();
    ctx.strokeStyle = '#F4F4F4';
    if (self.flip) {
        self.moveTo(ctx, radius, self.height);
        self.lineTo(ctx, radius, 0);
    } else {
        self.moveTo(ctx, self.width - radius, self.height);
        self.lineTo(ctx, self.width - radius, 0);
    }
    ctx.stroke();

    // body and fill
    ctx.beginPath();
    ctx.strokeStyle = '#444444';
    ctx.fillStyle   = '#F4F4F4';

    if (self.flip) {
        self.moveTo(ctx, radius, 0);
        self.lineTo(ctx, self.width, 0);
        self.lineTo(ctx, self.width, self.height);
        self.lineTo(ctx, radius, self.height);

        self.moveTo(ctx, radius, 0);
        self.bezierCurveTo(
            ctx,
            -8.4, 0,
            -8.4, self.height,
            radius, self.height
        );
    } else {
        self.moveTo(ctx, self.width - radius, 0);
        self.lineTo(ctx, 0, 0);
        self.lineTo(ctx, 0, self.height);
        self.lineTo(ctx, self.width - radius, self.height);

        self.moveTo(ctx, self.width - radius, 0);
        self.bezierCurveTo(
            ctx,
            self.width + 8.4, 0,
            self.width + 8.4, self.height,
            self.width - radius, self.height
        );
    }

    ctx.fill();
    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AND.prototype.getOutputValue = function () {
    var self = this;
    for (var i = 0; i < self.inputs.length; ++i) {
        if (!self.inputs[i].getValue()) {
            return false;
        }
    }
    return true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AND.prototype.getTitlePos = function () {
    var self = this;
    if (self.flip) {
        return {
            left    : self.width - 3,
            top     : 0,
            baseLine: 'top'
        };
    } else {
        return {
            left    : 2,
            top     : 0,
            baseLine: 'top'
        };
    }

};

module.exports = AND;