'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var NAND    = require('../gate/NAND');
var NOT     = require('../gate/NOT');
var Wire    = require('../conductor/Wire');
var Pin     = require('../conductor/Pin');

util.inherits(RS, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RS(options) {
    var self = this;
    options = options || {};

    options.width       = 440;
    options.height      = 210;
    options.inputCount  = 2;
    options.outputCount = 2;

    RS.super_.call(self, options);
    self.wires = [];

    self.inputs  = [];
    self.outputs = [];

    var inputCount  = 2;
    var outputCount = 2;

    for (var i = 0; i < inputCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, inputCount - 1 - i, inputCount);
        self.inputs.push(input);
    }

    for (var j = 0; j < outputCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, inputCount - 1 - j, outputCount);
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RS.prototype.init = function () {
    var self = this;
    var not1 = new NOT({
        title: 'NOT1',
        left: 60,
        top  : 20
    });
    self.addChild(not1);

    var not2 = new NOT({
        title: 'NOT2',
        left: 60,
        top  : 145

    });
    self.addChild(not2);

    var nand1 = new NAND({
        title: 'NAND1',
        left  : 240,
        top   : 20
    });
    self.addChild(nand1);

    var nand2 = new NAND({
        title: 'NAND2',
        left  : 240,
        top   : 145
    });
    self.addChild(nand2);

    self.addWire({
        cnn: [
            self.inputs[0],
            not1.inputs[0]
        ],
        segment: [
            self.inputs[0],
            not1.inputs[0]
        ],
        normalize: false
    });

    self.addWire({
        cnn: [
            self.inputs[1],
            not2.inputs[0]
        ],
        segment: [
            self.inputs[1],
            not2.inputs[0]
        ],
        normalize: false
    });

    self.addWire({
        cnn: [
            not1.output,
            nand1.inputs[0]
        ],
        segment: [
            not1.output,
            nand1.inputs[0]
        ],
        normalize: false
    });

    self.addWire({
        cnn: [
            not2.output,
            nand2.inputs[1]
        ],
        segment: [
            not2.output,
            nand2.inputs[1]
        ],
        normalize: false
    });

    self.addWire({
        cnn: [
            nand1.output,
            self.outputs[0],
            nand2.inputs[0]
        ],
        segments: [
            [
                nand1.output,
                self.outputs[0]
            ],
            [
                nand1.output,
                nand2.inputs[0]
            ]
        ],
        normalize: false
    });

    self.addWire({
        cnn: [
            nand2.output,
            self.outputs[1],
            nand1.inputs[1]
        ],
        segments: [
            [
                nand2.output,
                self.outputs[1]
            ],
            [
                nand2.output,
                nand1.inputs[1]
            ]
        ],
        normalize: false
    });

    return RS.super_.prototype.init.call(self);
};

module.exports = RS;