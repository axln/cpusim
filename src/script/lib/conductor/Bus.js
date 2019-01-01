'use strict';

var Promise = require('aigle');
var Wire    = require('./Wire');
var Helper  = require('../Helper');

Promise.each = require('aigle/each');

Bus.WIRE_STEP = 3;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bus(options) {
    var self = this;
    self.wires = [];

    for (var i = 0; i < 8; ++i) {
        var wireOptions = {
            parent  : options.parent,
            cnn     : [],
            segments: []
        };
        if (options.title) {
            wireOptions.title = options.title + ' w' + i;
        }

        for (var j = 0; j < options.cnn.length; ++j) {
            wireOptions.cnn.push(options.cnn[j][i]);
        }

        var offset = Bus.WIRE_STEP * (i - 4) + Bus.WIRE_STEP / 2;

        for (var n = 0; n < options.segments.length; ++n) {
            var points = options.segments[n];
            var wireSegment = [];
            for (var m = 0; m < points.length; ++m) {
                var point = points[m];
                if (typeof point === 'string') {
                    wireSegment.push(point);
                } else if (Array.isArray(point)) {
                    wireSegment.push(point[i]);
                } else {
                    var newPoint = Helper.clone(point);
                    var useOffset = offset;
                    if (point.dbl) {
                        useOffset = offset * 2
                    }
                    switch (point.align) {
                        case 'x':
                            newPoint.offsetX = point.flip ? useOffset : -useOffset;
                            break;
                        case 'y':
                            newPoint.offsetY = point.flip ? useOffset : -useOffset;
                            break;
                        case 'right':
                            newPoint.offsetX = point.flip ? -useOffset :  useOffset;
                            newPoint.offsetY = point.flip ?  useOffset : -useOffset;
                            break;
                        case 'left':
                            newPoint.offsetX = point.flip ? useOffset : -useOffset;
                            newPoint.offsetY = point.flip ? useOffset : -useOffset;
                            break;
                        default:
                            // no offset
                    }
                    wireSegment.push(newPoint);
                }
            }
            wireOptions.segments.push(wireSegment);
        }

        var busWire = new Wire(wireOptions);
        self.wires.push(busWire);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus.prototype.init = function () {
    var self = this;

    return Promise.each(self.wires, function (wire) {
        return wire.init();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus.prototype.draw = function (ctx) {
    var self = this;
    for (var i = 0; i < self.wires.length; ++i) {
        self.wires[i].draw(ctx);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus.prototype.clear = function () {
    var self = this;
    self.wires.forEach(function (wire) {
        wire.clear();
    });
    self.wires    = null;
};

module.exports = Bus;