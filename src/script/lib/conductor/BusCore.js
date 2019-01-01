'use strict';

var util = require('util');
var Wire = require('./Wire');

util.inherits(BusCore, Wire);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BusCore(options) {
    var self = this;
    BusCore.super_.call(self, options);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusCore.prototype.draw = function (ctx) {
    var self = this;

    ctx.beginPath();
    ctx.strokeStyle = '#444444';
    ctx.save();
    ctx.lineWidth = Math.round(10 * self.parent.scale);
    for (var i = 0; i < self.segments.length; ++i) {
        var points = self.segments[i];
        for (var j = 0; j < points.length; ++j) {
            var point = points[j];
            if (j == 0) {
                self.parent.moveTo(ctx, point.left, point.top);
            } else {
                self.parent.lineTo(ctx, point.left, point.top);
            }
        }
    }
    ctx.stroke();
    ctx.restore();

    // solders
    ctx.beginPath();
    ctx.fillStyle = ctx.strokeStyle;
    for (var k = 0; k < self.solders.length; ++k) {
        var solderPoint = self.solders[k];
        self.parent.fillRect(ctx, solderPoint.left - 9, solderPoint.top - 9, 18, 18);
        //self.parent.arc(ctx, point.left, point.top + 1, 12, 0, 2 * Math.PI);
        //self.parent.drawDot(ctx, point.left, point.top, 2, 0, 2 * Math.PI);
    }
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = '#FFFFFF';
    ctx.save();
    ctx.lineWidth = Math.round(6 * self.parent.scale);

    for (var n = 0; n < self.segments.length; ++n) {
        var segPoints = self.segments[n];
        for (var m = 0; m < segPoints.length; ++m) {
            var segPoint = segPoints[m];
            if (m == 0) {
                self.parent.moveTo(ctx, segPoint.left, segPoint.top);
            } else {
                self.parent.lineTo(ctx, segPoint.left, segPoint.top);
            }
        }
    }

    ctx.stroke();
    ctx.restore();
};

module.exports = BusCore;