'use strict';

var util    = require('util');
var Promise = require('aigle');

var Conductor = require('./Conductor');
var Pin       = require('./Pin');
var Helper    = require('../Helper');

util.inherits(Wire, Conductor);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Wire(options) {
    var self = this;
    options = options || {};
    Wire.super_.call(self, options);

    self.segments = options.segments || [];
    // if wire is normalized, it will be drawn only using right angle
    self.normalize = options.normalize !== undefined ? options.normalize : true;

    if (options.segment) {
        self.segments.push(options.segment);
    }
    self.segments = self.decodeSegments(self.segments);
    self.solders  = self.getSolders(self.segments);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.init = function () {
    var self = this;
    //console.log('Wire.prototype.init:', self.title || self.debugTitle || self);

    var currentValue = false;
    for (var i = 0; i < self.cnn.length; ++i) {
        var cnn = self.cnn[i];
        var cnnValue = cnn.active ? cnn.getValue() : cnn.value;
        self.pwrState.push(cnnValue);
        cnn.cnn.push(self);
        if (cnnValue) {
            currentValue = true;
        }
    }

    self.value = currentValue;
    if (currentValue) {
        return self.propagatePwrState();
    } else {
        return Promise.resolve();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.decodeSegments = function (segments) {
    var self = this;
    var decodedSegments = [];
    for (var i = 0; i < segments.length; ++i) {
        var points = segments[i];
        var segmentPoints = [];
        for (var j = 0; j < points.length; ++j) {
            var point = points[j];
            var decodedPoint = self.decodePoint(point);
            var resultPoint = {
                left: decodedPoint.left,
                top : decodedPoint.top
            };
            if (decodedPoint.solder) {
                resultPoint.solder = true;
            }
            if (decodedPoint.skew) {
                resultPoint.skew = true;
            }
            if (decodedPoint.yFirst) {
                resultPoint.yFirst = true;
            }
            if (decodedPoint.flip) {
                resultPoint.flip = true;
            }
            if (decodedPoint.tag) {
                resultPoint.tag = decodedPoint.tag;
            }
            if (decodedPoint.align !== undefined) {
                resultPoint.align = decodedPoint.align;
            }

            if (decodedPoint.offsetX) {
                resultPoint.left += decodedPoint.offsetX;
            }

            if (decodedPoint.offsetY) {
                resultPoint.top += decodedPoint.offsetY;
            }

            if (j > 0) {
                var prevPoint = segmentPoints[segmentPoints.length - 1];
                if (decodedPoint.relX) {
                    resultPoint.left += prevPoint.left;
                }
                if (decodedPoint.relY) {
                    resultPoint.top += prevPoint.top;
                }
                if (decodedPoint.skew || self.normalize === false) {
                    segmentPoints.push(resultPoint);
                } else {
                    segmentPoints.push.apply(segmentPoints, Helper.getNormalPath(prevPoint, resultPoint, decodedPoint.yFirst));
                }
            } else {
                segmentPoints.push(resultPoint);
            }
        }
        decodedSegments.push(segmentPoints);
    }

    return decodedSegments;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.getSolders = function (segments) {
    var solders = [];
    for (var i = 0; i < segments.length; ++i) {
        var points = segments[i];
        for (var j = 0; j < points.length; ++j) {
            var point = points[j];
            if (point.solder) {
                solders.push({
                    left: point.left,
                    top : point.top
                });
            }
        }
    }
    return solders;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.decodePoint = function (point) {
    var self = this;
    if (typeof point === 'string') {
        var regex = /^cnn(\d+)(\.(left|top))?(\*)?(\+)?$/;
        var matches = point.match(regex);
        if (matches) {
            var cnnIndex = parseInt(matches[1]);
            if (cnnIndex < 0 || cnnIndex >= self.cnn.length) {
                throw new Error('Wire: Cnn ' + cnnIndex + ' not exists.');
            }
            var cnnPoint = self.getPinPos(self.cnn[cnnIndex]);
            if (matches[3] == 'left') {
                return cnnPoint.left;
            } else if (matches[3] == 'top') {
                return cnnPoint.top;
            } else {
                var resultPnt = {
                    left  : cnnPoint.left,
                    top   : cnnPoint.top
                };
                if (matches[4]) {
                    resultPnt.solder = true;
                }
                if (matches[5]) {
                    resultPnt.yFirst = true;
                }
                return resultPnt;
            }
        } else {
            throw new Error('Wire: Invalid wire format: ' + point);
        }
    } else if (point instanceof Pin) {
        return self.getPinPos(point);
    } else {
        if (typeof point.left === 'string') {
            point.left = self.decodePoint(point.left);
        }

        if (typeof point.top === 'string') {
            point.top = self.decodePoint(point.top);
        }
        return point;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.getPinPos = function (pin) {
    var self = this;
    var sameParent = self.parent == pin.parent;
    var point = pin.getPoint(sameParent);
    if (sameParent) {
        return point;
    } else {
        return pin.parent.toParentPoint(point);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Wire.prototype.draw = function (ctx) {
    var self = this;
    ctx.beginPath();
    if (self.hl) {
        ctx.strokeStyle = Conductor.HIGHLIGH_COLOR;
    } else {
        ctx.strokeStyle = self.value ? '#FF0000' :'#444444';
    }

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

    // solders
    ctx.fillStyle = ctx.strokeStyle;
    for (var k = 0; k < self.solders.length; ++k) {
        var solderPoint = self.solders[k];
        ctx.beginPath();
        //self.parent.arc(ctx, point.left, point.top, 2, 0, 2 * Math.PI);
        self.parent.drawDot(ctx, solderPoint.left, solderPoint.top, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
};

module.exports = Wire;