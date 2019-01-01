'use strict';

var SHR      = require('../circuit/SHR');
var SHL      = require('../circuit/SHL');
var Inverter = require('../circuit/Inverter');
var Ander    = require('../circuit/Ander');
var Orer     = require('../circuit/Orer');
var Zero     = require('../circuit/Zero');
var Adder    = require('../circuit/Adder');
var Switch   = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var shr = new SHR({
        top: 50,
        left: 100,
        scale: 0.6
    });
    self.addChild(shr);

    Switch.createForInput(self, shr.shiftInPin);
    shr.inputs.forEach(function (input) {
        Switch.createForInput(self, input);
    });


    var shl = new SHL({
        top: 50,
        left: 400,
        scale: 0.6
    });
    self.addChild(shl);
    Switch.createForInput(self, shl.shiftInPin);
    shl.inputs.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    var inv = new Inverter({
        top: 50,
        left: 700,
        scale: 0.6
    });
    self.addChild(inv);
    inv.inputs.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    var ander = new Ander({
        top: 500,
        left: 100,
        scale: 0.6
    });
    self.addChild(ander);
    ander.inputsA.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    ander.inputsB.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    var orer = new Orer({
        top: 500,
        left: 400,
        scale: 0.6
    });
    self.addChild(orer);

    orer.inputsA.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    orer.inputsB.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    var zero = new Zero({
        top: 500,
        left: 700
    });
    self.addChild(zero);
    zero.inputs.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    var adder = new Adder({
        top: 900,
        left: 100,
        scale: 0.6
    });
    self.addChild(adder);

    adder.inputsA.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    adder.inputsB.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    Switch.createForInput(self, adder.carryIn);

    return self.initChildren().then(function () {
        return self.initWires();
    });
};