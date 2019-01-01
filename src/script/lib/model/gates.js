'use strict';

var AND    = require('../gate/AND');
var OR     = require('../gate/OR');
var NOR    = require('../gate/NOR');
var NOT    = require('../gate/NOT');
var XOR    = require('../gate/XOR');
var NAND   = require('../gate/NAND');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var createGate = createGateFunc.bind(self);

    self.debugPin = true;

    var nand1 = createGate({
        gateClass: NAND,
        id: "nand1",
        title: "NAND1",
        debugPin: self.debugPin,
        left: 100,
        top: 50
    });

    var and1 = createGate({
        gateClass: AND,
        id: "and1",
        title: "AND1",
        debugPin: self.debugPin,
        left: 300,
        top: 50
    });
    and1.inputs[1].inverted = true;

    var not1 = createGate({
        gateClass: NOT,
        id: "not1",
        title: "NOT1",
        debugPin: self.debugPin,
        left: 500,
        top: 50
    });

    var xor1 = createGate({
        gateClass: XOR,
        id: 'xor1',
        title: 'XOR1',
        debugPin: self.debugPin,
        left: 100,
        top: 150
    });

    var xor2 = createGate({
        gateClass: XOR,
        id: "xor2",
        title: "XOR2",
        debugPin: self.debugPin,
        left: 250,
        top: 150,
        flip: true,
        inputCount: 3
    });

    var or1 = createGate({
        gateClass: OR,
        id: "or1",
        title: "OR1",
        debugPin: self.debugPin,
        left: 500,
        top: 150,
        inputCount: 3
    });
    or1.inputs[0].inverted = true;

    var nor1 = createGate({
        gateClass: NOR,
        id: "nor1",
        title: "NOR1",
        debugPin: self.debugPin,
        left: 100,
        top: 250
    });

    var not2 = createGate({
        gateClass: NOT,
        id: "not2",
        title: "NOT2",
        left: 250,
        debugPin: self.debugPin,
        top: 250,
        flip: true,
        inputs: [false]
    });
    //self.addChild(not2);

    var and2 = createGate({
        gateClass: AND,
        id: "and2",
        title: "AND2",
        debugPin: self.debugPin,
        left: 450,
        top: 250,
        flip: true
    });

    var or2 = createGate({
        gateClass: OR,
        id: "or2",
        title: "OR2",
        debugPin: self.debugPin,
        left: 650,
        top: 250,
        flip: true
    });

    return self.initChildren().then(function () {
        return self.initWires();
    });
};

function createGateFunc(options) {
    var self = this;

    var gate = new options.gateClass(options);
    self.addChild(gate);

    for (var i = 0; i < gate.inputs.length; ++i) {
        Switch.createForInput(self, gate.inputs[i]);
    }

    return gate;
}