'use strict';

var util      = require('util');
var Component = require('../Component');
var Pin       = require('../conductor/Pin');

util.inherits(Gate, Component);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Gate(options) {
    var self = this;
    options = options || {};
    self.flip = options.flip !== undefined ? !!options.flip : false;
    Gate.super_.call(self, options);

    self.inputs = [];
    for (var i = 0; i < options.inputCount; ++i) {
        var value = options.values && options.values[i] !== undefined ? options.values[i] : undefined;
        var input = self.addPin(self.flip ? Pin.POS.RIGHT : Pin.POS.LEFT, i, options.inputCount, undefined, value);
        input.onValueChanged = self.handleInputChange.bind(self);
        input.debugTitle = 'i' + i;
        //input.title = 'i' + i;
        self.inputs.push(input);
    }

    if (self.flip) {
        self.output = self.addPin(Pin.POS.LEFT,  0, 1);
    } else {
        self.output = self.addPin(Pin.POS.RIGHT, 0, 1);
    }
    self.output.active = true;
    self.output.debugTitle = 'o';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Gate.prototype.init = function () {
    var self = this;
    return Gate.super_.prototype.init.call(self).then(function () {
        return self.handleInputChange();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Gate.prototype.handleInputChange = function () {
    var self = this;
    return self.output.setValue(self.getOutputValue());
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Gate.prototype.getOutputValue = function () {
    //var self = this;
    return false;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Gate.prototype.getTitleAlign = function () {
    var self = this;
    return self.flip ? 'right' : 'left';
};

module.exports = Gate;