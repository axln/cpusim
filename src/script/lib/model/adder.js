'use strict';

var ADD    = require('../circuit/ADD');
var Adder  = require('../circuit/Adder');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var add = new ADD({
        left: 100,
        top: 50
    });
    self.addChild(add);

    Switch.createForInput(self, add.inputA);
    Switch.createForInput(self, add.inputB);
    Switch.createForInput(self, add.carryIn);

    var adder = new Adder({
        left: 100,
        top: 400,
        scale: 2
    });
    self.addChild(adder);

    Switch.createForInput(self, adder.carryIn);
    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, adder.inputsA[i]);
        Switch.createForInput(self, adder.inputsB[i]);
    }

    return self.initChildren().then(function () {
        return self.initWires();
    });
};