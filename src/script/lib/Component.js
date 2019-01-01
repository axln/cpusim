'use strict';

var Promise = require('aigle');
var Pin     = require('./conductor/Pin');
var Helper  = require('./Helper');

Component.PIN_MARGIN     = 0.2;
Component.MIN_FONT_SIZE  = 4;
Component.MIN_DRAW_SCALE = 0.2;

Component.selectedItem = null;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Component(options) {
    var self = this;
    options = options || {};

    self.parent = options.parent || null;
    self.title  = options.title  || null;
    self.scale  = options.scale  || 1;

    self.id      = options.id      !== undefined ? options.id      : null;
    self.left    = options.left    !== undefined ? options.left    : 0;
    self.top     = options.top     !== undefined ? options.top     : 0;
    self.width   = options.width   !== undefined ? options.width   : 50;
    self.height  = options.width   !== undefined ? options.height  : 50;
    self.outline = options.outline !== undefined ? options.outline : true;

    self.debugPin  = options.debugPin  !== undefined ? options.debugPin  : false;
    self.pinMargin = options.pinMargin !== undefined ? options.pinMargin : Component.PIN_MARGIN;
    self.minScale  = options.minScale  !== undefined ? options.minScale  : Component.MIN_DRAW_SCALE;

    self.detailDraw = true;
    self.pins       = [];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.init = function () {
    var self = this;
    //console.log('Component: ' + self.getTitle() + ' init');
    self.globalRect    = self.calcGlobalRect(true);
    self.boxGlobalRect = self.calcGlobalRect(false);
    return Promise.resolve();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.addPin = function (position, index, totalCount, title, value) {
    var self = this;
    var point = self.getPinPoint(index, position, totalCount);
    var pin = new Pin({
        parent  : self,
        title   : title,
        position: position,
        left    : point.left,
        top     : point.top,
        length  : point.length,
        value   : value
    });
    // pin has no init method
    self.pins.push(pin);
    return pin;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.drawSelf = function (ctx) {
    var self = this;
    if (self.detailDraw) {
        if (self.outline) {
            self.drawOutline(ctx);
        }
    } else {
        self.drawOutline(ctx);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.drawOutline = function (ctx) {
    var self = this;
    if (!self.detailDraw) {
        ctx.fillStyle = '#E8E8E8';
        self.fillRect(ctx, 0, 0, self.width, self.height);
    }
    ctx.beginPath();
    ctx.strokeStyle = '#0000FF';
    self.moveTo(ctx, 0, 0);
    self.lineTo(ctx, self.width, 0);
    self.lineTo(ctx, self.width, self.height);
    self.lineTo(ctx, 0, self.height);
    self.lineTo(ctx, 0, 0);
    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.moveTo = function (ctx, left, top) {
    var self = this;
    if (self.parent) {
        self.parent.moveTo(
            ctx,
            self.left + left  * self.scale,
            self.top  + top   * self.scale
        );
    } else {
        ctx.moveTo(
            Component.round(left * self.scale),
            Component.round(top  * self.scale)
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.lineTo = function (ctx, left, top) {
    var self = this;
    if (self.parent) {
        self.parent.lineTo(
            ctx,
            self.left + left * self.scale,
            self.top  + top  * self.scale
        );
    } else {
        ctx.lineTo(
            Component.round(left * self.scale),
            Component.round(top  * self.scale)
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.fillRect = function (ctx, left, top, width, height) {
    var self = this;
    if (self.parent) {
        self.parent.fillRect(
            ctx,
            self.left + left * self.scale,
            self.top  + top  * self.scale,
            width  * self.scale,
            height * self.scale
        );
    } else {
        ctx.fillRect(
            Component.round(left   * self.scale),
            Component.round(top    * self.scale),
            Component.round(width  * self.scale),
            Component.round(height * self.scale)
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.calcGlobalRect = function (includePins) {
    var self = this;
    var rect = includePins ? {
        left  : self.left - Pin.LENGTH * self.scale,
        top   : self.top  - Pin.LENGTH * self.scale,
        width : (self.width  + Pin.LENGTH * 2) * self.scale,
        height: (self.height + Pin.LENGTH * 2) * self.scale
    } : {
        left  : self.left,
        top   : self.top,
        width : self.width  * self.scale,
        height: self.height * self.scale
    };

    var parent = self.parent;
    while (parent) {
        rect.left *= parent.scale;
        rect.top  *= parent.scale;

        rect.left += parent.left;
        rect.top  += parent.top;

        rect.width  *= parent.scale;
        rect.height *= parent.scale;
        parent = parent.parent;
    }

    rect.right = rect.left + rect.width;
    rect.bottom = rect.top + rect.height;
    return rect;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.isViewable = function () {
    var self = this;
    return Helper.rectOverlap(self.globalRect, window.root.visibleArea);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.bezierCurveTo = function (ctx, cx1, cy1, cx2, cy2, x, y) {
    var self = this;
    if (self.parent) {
        self.parent.bezierCurveTo(
            ctx,
            self.left + cx1 * self.scale,
            self.top  + cy1 * self.scale,
            self.left + cx2 * self.scale,
            self.top  + cy2 * self.scale,
            self.left + x   * self.scale,
            self.top  + y   * self.scale
        );
    } else {
        ctx.bezierCurveTo(
            Component.round(cx1 * self.scale),
            Component.round(cy1 * self.scale),
            Component.round(cx2 * self.scale),
            Component.round(cy2 * self.scale),
            Component.round(x   * self.scale),
            Component.round(y   * self.scale)
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.arc = function (ctx, x, y, r, startAngle, endAngle) {
    var self = this;
    if (self.parent) {
        self.parent.arc(
            ctx,
            self.left + x * self.scale,
            self.top  + y * self.scale,
            r * self.scale,
            startAngle,
            endAngle
        );
    } else {
        self.ctx.arc(
            Component.round(x * self.scale),
            Component.round(y * self.scale),
            Component.round(r * self.scale),
            startAngle,
            endAngle
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.drawDot = function (ctx, x, y, r, startAngle, endAngle) {
    var self = this;
    if (self.parent) {
        self.parent.drawDot(
            ctx,
            self.left + x * self.scale,
            self.top  + y * self.scale,
            r * self.scale,
            startAngle,
            endAngle
        );
    } else {
        var dotR = Math.min(r * self.scale, 2);
        dotR = Math.max(dotR, 1.5);
        self.ctx.arc(
            Component.round(x * self.scale),
            Component.round(y * self.scale),
            //Component.round(dotR),
            dotR,
            startAngle,
            endAngle
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.setFontSize = function (ctx, size) {
    var self = this;
    if (self.parent) {
        self.parent.setFontSize(ctx, size * self.scale);
    } else {
        ctx.csFontSize = size * self.scale;
        ctx.font = ctx.csFontSize.toFixed(0) + 'px sans-serif';
        //console.log(ctx.font);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.fillText = function (ctx, text, x, y) {
    var self = this;
    if (self.parent) {
        self.parent.fillText(
            ctx,
            text,
            self.left + x * self.scale,
            self.top  + y * self.scale
        );
    } else {
        if (ctx.csFontSize > Component.MIN_FONT_SIZE) {
            ctx.fillText(
                text,
                Component.round(x * self.scale),
                Component.round(y * self.scale)
            );
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.drawPins = function (ctx) {
    var self = this;
    //console.log('Component.prototype.drawPins');
    for (var i = 0; i < self.pins.length; ++i) {
        self.pins[i].draw(ctx);
    }
    self.printPinTitles(ctx);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.drawPinsCircles = function (ctx) {
    var self = this;
    for (var i = 0; i < self.pins.length; ++i) {
        var pin = self.pins[i];
        if (pin.inverted) {
            pin.drawCircle(ctx);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.draw = function (ctx) {
    var self = this;
    if (self.isViewable()) {
        var effectiveScale = self.getEffectiveScale();
        //console.log('Component: %s effective scale: %s', self.getTitle(), effectiveScale);
        self.detailDraw = effectiveScale > self.minScale || self.parent === null;
        ctx.save();
        try {
            // draw pins first
            self.drawPins(ctx);
            self.drawSelf(ctx);
            self.printTitle(ctx);
            // need to draw pin invert circles after self
            self.drawPinsCircles(ctx);
        } catch (err) {
            console.error('Component: Error during draw:', err.stack);
        } finally {
            ctx.restore();
        }
    /*} else {
        console.log('Component ' + self.getTitle() + ' is not viewable');*/
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getTitlePos = function () {
    //var self = this;
    return {
        left    : 2,
        top     : 0,
        baseLine: 'top'
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getTitleAlign = function () {
    //var self = this;
    return 'left';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.printTitle = function (ctx) {
    var self = this;
    var title = self.getTitle();
    if (title) {
        self.setFontSize(ctx, 9);
        ctx.fillStyle = '#AAA';
        var pos = self.getTitlePos();
        ctx.textBaseline = pos.baseLine;
        ctx.textAlign = self.getTitleAlign();
        self.fillText(
            ctx,
            title,
            pos.left,
            pos.top
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.clear = function () {
    var self = this;
    self.title = '';
    for (var i = 0; i < self.pins.length; ++i) {
        self.pins[i].clear();
    }

    /*for (var i = 0; i < self.inputs.length; ++i) {
        self.inputs[i].clear();
    }
    for (var j = 0; j < self.outputs.length; ++j) {
        self.outputs[j].clear();
    }*/
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getTitle = function () {
    var self = this;
    return self.title || self.id;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.toString = function () {
    var self = this;
    return self.getTitle();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.toParentPoint = function (point) {
    var self = this;
    point.left *= self.scale;
    point.top  *= self.scale;

    point.left += self.left;
    point.top  += self.top;
    return point;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getBusPoint = function (position) {
    var self = this;
    var point = {
        left: 0,
        top : 0
    };
    switch (position) {
        case 'left':
            point.top  += self.height / 2;
            break;
        case 'right':
            point.left += self.width;
            point.top  += self.height / 2;
            break;
        case 'top':
            point.left += self.width / 2;
            break;
        case 'bottom':
        default:
            point.left += self.width / 2;
            point.top  += self.height + 5;
    }
    return point;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getPinScale = function () {
    return 1;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getPinPoint = function (index, position, count) {
    var self = this;
    var margin;
    if (typeof self.pinMargin == 'object') {
        if (self.pinMargin[position]) {
            margin = self.pinMargin[position];
        } else {
            margin = Component.PIN_MARGIN;
        }
    } else {
        margin = self.pinMargin;
    }

    var point = {
        length: Pin.LENGTH * self.getPinScale()
    };

    switch (position) {
        case 'left':
            point.left = -point.length;
            point.top  = Component.getMiddlePosR(index, count, self.height, margin);
            break;
        case 'right':
            point.left = self.width + point.length;
            point.top  = Component.getMiddlePosR(index, count, self.height, margin);
            break;
        case 'top':
            point.left = Component.getMiddlePosR(index, count, self.width, margin);
            point.top  = -point.length;
            break;
        case 'bottom':
        default:
            point.left = Component.getMiddlePosR(index, count, self.width, margin);
            point.top  = self.height + point.length;
    }

    return point;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.printPinTitles = function (ctx) {
    var self = this;
    var pinScale = self.getPinScale();
    self.setFontSize(ctx, 11 * pinScale);
    //ctx.textBaseline = 'bottom';
    ctx.fillStyle = '#444444';

    for (var i = 0; i < self.pins.length; ++i) {
        var pin = self.pins[i];
        if (pin.title) {
            var pinPos = pin.getPoint(true);
            if (pin.position == 'bottom') {
                ctx.textBaseline = 'top';
            } else {
                ctx.textBaseline = 'bottom';
            }
            var crr = {top: -4, left: 0};
            if (pin.position == Pin.POS.RIGHT) {
                ctx.textAlign = 'left';
                crr.left = 5;
            } else if (pin.position == Pin.POS.LEFT) {
                ctx.textAlign = 'right';
                crr.left = -5;
            } else if (pin.position == Pin.POS.BOTTOM) {
                ctx.textAlign = 'left';
                crr.left = 3;
                crr.top  = 0;
            } else {
                ctx.textAlign = 'left';
                crr.left = 3;
                crr.top  = -4;
            }
            self.fillText(ctx, pin.title, pinPos.left + crr.left * pinScale, pinPos.top + crr.top * pinScale);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.handleClick = function (globalPoint) {
    var self = this;
    // must be overridden
    //console.log('Component: Clicked: ' + self.title);
    Component.setSelectedItem(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.prototype.getEffectiveScale = function () {
    var self = this;
    if (self.parent) {
        return self.scale * self.parent.getEffectiveScale();
    } else {
        return self.scale;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.getMiddlePosR = function (index, count, length, margin) {
    if (count == 1) {
        return length / 2;
    } else {
        return length - (length * margin + index * length * (1 - margin * 2) / (count - 1));
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.setSelectedItem = function (component) {
    if (component !== Component.selectedItem) {
        if (Component.selectedItem) {
            console.log('Component: Deselect:', Component.selectedItem.getTitle());
            Component.setHLState(Component.selectedItem, false);
            Component.selectedItem = null;
        }
        if (component) {
            Component.selectedItem = component;
            Component.setHLState(Component.selectedItem, true);
            console.log('Component: Selected:', component.getTitle());
            console.log(component);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.setHLState = function (component, hlState) {
    component.pins.forEach(function (pin) {
        pin.hl = hlState;
        pin.cnn.forEach(function (cnn) {
            cnn.hl = hlState;
            cnn.cnn.forEach(function (cnn) {
                cnn.hl = hlState;
            });
        });
    });
    root._redraw();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Component.round = function (value) {
    return Math.round(value);
};

module.exports = Component;