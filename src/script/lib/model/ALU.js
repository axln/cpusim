'use strict';

var ALU    = require('../circuit/ALU');
var Helper = require('../Helper');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var alu = new ALU({
        left: 50,
        top: 50
    });
    self.addChild(alu);

    alu.inputsA.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    alu.inputsB.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    alu.op.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    Switch.createForInput(self, alu.carryIn);

    return self.initChildren().then(function () {
        return self.initWires();
    });
};