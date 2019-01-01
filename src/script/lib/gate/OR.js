'use strict';

var util = require('util');
var Gate = require('./Gate');

util.inherits(OR, Gate);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function OR(options) {
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
    OR.super_.call(self, options);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
OR.prototype.drawSelf = function (ctx) {
    var self = this;

    ctx.beginPath();
    ctx.strokeStyle = '#444444';
    ctx.fillStyle   = '#F4F4F4';

    if (self.flip) {
        var topPointF = {
            left: self.width,
            top : 0
        };

        var rightPointF = {
            left: 0,
            top : self.height / 2
        };

        var bottomPointF = {
            left: self.width,
            top : self.height
        };

        var point1F = {
            left: topPointF.left - self.width / 3 * 2,
            top : topPointF.top - 1
        };

        var point2F = {
            left: rightPointF.left + 7,
            top : rightPointF.top - 15
        };

        self.moveTo(ctx, topPointF.left, topPointF.top);
        self.bezierCurveTo(
            ctx,
            point1F.left, point1F.top,
            point2F.left, point2F.top,
            rightPointF.left, rightPointF.top
        );

        self.bezierCurveTo(
            ctx,
            rightPointF.left + 7, rightPointF.top + 15,
            bottomPointF.left - self.width / 3 * 2, bottomPointF.top + 1,
            bottomPointF.left, bottomPointF.top
        );

        self.bezierCurveTo(
            ctx,
            bottomPointF.left - 10, bottomPointF.top - 10,
            topPointF.left - 10, topPointF.top + 10,
            topPointF.left, topPointF.top
        );
    } else {
        var topPoint = {
            left: 0,
            top : 0
        };

        var rightPoint = {
            left: self.width,
            top : self.height / 2
        };

        var bottomPoint = {
            left: 0,
            top : self.height
        };

        var point1 = {
            left: topPoint.left + self.width / 3 * 2,
            top : topPoint.top - 1
        };

        var point2 = {
            left: rightPoint.left - 7,
            top : rightPoint.top - 15
        };

        self.moveTo(ctx, topPoint.left, topPoint.top);
        self.bezierCurveTo(
            ctx,
            point1.left, point1.top,
            point2.left, point2.top,
            rightPoint.left, rightPoint.top
        );

        self.bezierCurveTo(
            ctx,
            rightPoint.left - 7, rightPoint.top + 15,
            bottomPoint.left + self.width / 3 * 2, bottomPoint.top + 1,
            bottomPoint.left, bottomPoint.top
        );

        self.bezierCurveTo(
            ctx,
            bottomPoint.left + 10, bottomPoint.top - 10,
            topPoint.left + 10, topPoint.top + 10,
            topPoint.left, topPoint.top
        );
    }

    ctx.fill();
    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
OR.prototype.getOutputValue = function () {
    var self = this;
    for (var i = 0; i < self.inputs.length; ++i) {
        if (self.inputs[i].getValue() === true) {
            return true;
        }
    }
    return false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
OR.prototype.getTitlePos = function () {
    var self = this;
    return {
        left    : self.flip ? self.width - 9 : 7,
        top     : 2,
        baseLine: 'top'
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
OR.prototype.getPinPoint = function (index, position, count) {
    var self = this;
    var point = OR.super_.prototype.getPinPoint.apply(self, arguments);
    if (self.flip) {
        if (position == 'right') {
            point.length += 8;
        }
    } else {
        if (position == 'left') {
            point.length += 8;
        }
    }
    return point;
};

module.exports = OR;