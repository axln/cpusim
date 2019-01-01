'use strict';

var Promise   = require('aigle');
var util      = require('util');
var Conductor = require('./Conductor');

Promise.each = require('aigle/each');

util.inherits(Pin, Conductor);

Pin.LENGTH = 20;

Pin.POS = {
    LEFT  : 'left',
    TOP   : 'top',
    RIGHT : 'right',
    BOTTOM: 'bottom'
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Pin(options) {
    var self = this;
    options = options || {};
    Pin.super_.call(self, options);

    self.active      = options.active      !== undefined ? !!options.active      : false;
    self.inverted    = options.inverted    !== undefined ? !!options.inverted    : false;
    self.invertColor = options.invertColor !== undefined ? !!options.invertColor : false;

    self.onValueChanged = options.onValueChanged || null; // used only for gate's inactive pins

    // draw properties
    self.position    = options.position    !== undefined ? options.position    : Pin.POS.LEFT;
    self.left        = options.left        !== undefined ? options.left        : 0;
    self.top         = options.top         !== undefined ? options.top         : 0;
    self.length      = options.length      !== undefined ? options.length      : Pin.LENGTH;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.setValue = function (newValue) {
    var self = this;
    if (!self.active) {
        throw new Error('Pin: setValue is only for active pins.');
    }

    if (self.value !== newValue) {
        self.value = newValue;
        if (window.debugMode === true && self.parent.debugPin === true) {
            var title = self.title || self.debugTitle;
            if (title) {
                console.log('%s %s set to %d', self.parent.title, title, (self.active ? self.getValue() : self.value) ? 1 : 0);
            }
        }
        // propagate to all connections
        return self.propagatePwrState();
        // active pins don'need to call onValueChanged
    } else {
        return Promise.resolve();
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.propagatePwrState = function (except) {
    var self = this;
    if (self.active) {
        // for active pins this method can be called only from setValue
        // just propagate power state to all connections
        var propagateTo = [];
        var currentValue = self.getValue();
        for (var i = 0; i < self.cnn.length; ++i) {
            var cnn = self.cnn[i];
            if (cnn.getPowerStateOf(self) !== currentValue) {
                propagateTo.push({
                    cnn  : cnn,
                    state: currentValue
                });
            }
        }
        return Promise.each(propagateTo, function (values) {
            return values.cnn.handleCnnPwrStateUpdate(values.state, self);
        });
    } else {
        return Pin.super_.prototype.propagatePwrState.call(self, except);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.handleCnnPwrStateUpdate = function (pwrState, cameFrom) {
    var self = this;
    if (self.active) {
        console.warn('Pin: handleCnnPwrStateUpdate called for active pin.');
        // do nothing if active pin gets updated by wire
        return Promise.resolve();
    } else {
        var prevValue = self.value;
        return Pin.super_.prototype.handleCnnPwrStateUpdate.call(self, pwrState, cameFrom).then(function () {
            if (prevValue != self.value && self.onValueChanged) {
                return self.onValueChanged(self, self.getValue());
            }
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.getValue = function () {
    var self = this;
    if (self.inverted) {
        return !self.value;
    } else {
        return self.value;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.getParentPoint = function (internal) {
    var self = this;
    return self.parent.toParentPoint(self.getPoint(internal));
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.getPoint = function (internal) {
    var self = this;
    var point = {
        left: self.left,
        top : self.top
    };
    if (internal === true) {
        switch (self.position) {
            case Pin.POS.LEFT:
                point.left += self.length;
                break;
            case Pin.POS.RIGHT:
                point.left -= self.length;
                break;
            case Pin.POS.TOP:
                point.top += self.length;
                break;
            case Pin.POS.BOTTOM:
                point.top -= self.length;
                break;
        }
    }
    return point;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.draw = function (ctx) {
    var self = this;

    var internalPoint = self.getPoint(true);
    ctx.beginPath();
    self.parent.moveTo(ctx, self.left, self.top);
    self.parent.lineTo(ctx, internalPoint.left, internalPoint.top);

    if (self.hl) {
        ctx.strokeStyle = Conductor.HIGHLIGH_COLOR;
    } else {
        if (self.inverted && self.invertColor) {
            ctx.strokeStyle = (!self.value) ? '#FF0000' :'#444444';
        } else {
            ctx.strokeStyle = self.value ? '#FF0000' :'#444444';
        }
    }

    ctx.stroke();

    // circle must be drawn separately
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Pin.prototype.drawCircle = function (ctx) {
    var self = this;
    var radius = 4;
    var internalPoint = self.getPoint(true);
    ctx.strokeStyle = '#444444';
    ctx.fillStyle   = '#F4F4F4';
    ctx.beginPath();
    self.parent.moveTo(
        ctx,
        internalPoint.left + (self.position == Pin.POS.LEFT ? 0 : radius * 2),
        internalPoint.top
    );
    self.parent.arc(
        ctx,
        internalPoint.left + (self.position == Pin.POS.LEFT ? - radius : radius),
        internalPoint.top,
        radius,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();
};

module.exports = Pin;