'use strict';

var util      = require('util');
var Promise   = require('aigle');
var Component = require('../Component');
var Wire      = require('../conductor/Wire');
var Helper    = require('../Helper');
var Label     = require('../Label');

Promise.each = require('aigle/each');

util.inherits(Circuit, Component);

Circuit.BYTE_HANDLER_HEIGHT = 500;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Circuit(options) {
    var self = this;
    Circuit.super_.call(self, options);
    self.children     = {};
    self.wires        = [];
    self.buses        = [];
    self.childCounter = 0;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.init = function () {
    var self = this;
    //console.log('Circuit.prototype.init');
    return Circuit.super_.prototype.init.call(self).then(function () {
        return self.initChildren();
    }).then(function () {
        return self.initWires();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.addChild = function (child) {
    var self = this;
    var id = child.id !== null ? child.id : self.createID();
    if (self.children[id]) {
        throw new Error('Component: Child with the same id is already exists.');
    } else {
        self.children[id] = child;
        child.parent = self;
        if (child.id === null) {
            child.id = id;
        }
        return id;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.clear = function () {
    var self = this;
    Circuit.super_.prototype.clear.call(self);
    for (var id in self.children) {
        self.children[id].clear();
    }
    self.wires.forEach(function (wire) {
        wire.clear();
    });

    self.buses.forEach(function (bus) {
        bus.clear();
    });

    self.children     = {};
    self.wires        = [];
    self.buses        = [];
    self.childCounter = 0;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.drawSelf = function (ctx) {
    var self = this;
    Circuit.super_.prototype.drawSelf.call(self, ctx);
    if (self.detailDraw) {
        for (var n = 0; n < self.buses.length; ++n) {
            self.buses[n].draw(ctx);
        }

        for (var k = 0; k < self.wires.length; ++k) {
            self.wires[k].draw(ctx);
        }

        for (var uid in self.children) {
            self.children[uid].draw(ctx);
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.initChildren = function () {
    var self = this;
    //console.log('Component.prototype.initChildren: ' + self.id);
    return Promise.each(Object.keys(self.children), function (id) {
        return self.children[id].init();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.initWires = function () {
    var self = this;
    //console.log('Component.prototype.initWires:', self.wires.length, self.id);
    return Promise.each(self.wires, function (wire) {
        return wire.init();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.addWire = function (options) {
    var self = this;
    //console.log('Component.prototype.addWire');
    options.parent = self;
    var wire = new Wire(options);
    self.wires.push(wire);
    return wire;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.handleClick = function (globalPoint) {
    var self = this;
    //console.log('Circuit: Component click:', globalPoint);
    if (self.detailDraw) {
        var found = false;
        for (var id in self.children) {
            var child = self.children[id];
            if (child instanceof Label) {
                continue;
            }

            //console.log('Circuit: Child ' + id +' rect:', child.boxGlobalRect);
            if (Helper.pointInRect(globalPoint, child.boxGlobalRect)) {
                found = true;
                //console.log('Circuit: Child clicked: ' + child.title);
                // need to convert point to child point
                child.handleClick(globalPoint);
            }
        }
        if (!found) {
            //console.log('Circuit: Clicked on empty place.');
            Component.setSelectedItem(null);
        }
    } else {
        Circuit.super_.prototype.handleClick.call(self, globalPoint);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.createID = function () {
    var self = this;
    return '#' + self.childCounter++;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Circuit.prototype.getHexValue = function () {
    var self = this;
    if (self.outputs) {
        var value = 0;
        var weight = 1;
        for (var i = 0; i < self.outputs.length; ++i) {
            if (self.outputs[i].value) {
                value += weight;
            }
            weight = weight << 1;
        }
        var strVal = value.toString(16).toUpperCase();
        if (value <= 0xF) {
            strVal = '0' + strVal;
        }
        return '0x' + strVal;
    } else {
        return '0x';
    }
};

module.exports = Circuit;