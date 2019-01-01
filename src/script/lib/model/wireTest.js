'use strict';

var OR          = require('../gate/OR');
var TestCircuit = require('../circuit/TestCircuit');
var AND         = require('../gate/AND');
var Switch      = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    self.debugPin = true;

    var testCircuit = new TestCircuit({
        title: 'TestCircuit',
        top: 50,
        left: 50,
        debugPin: self.debugPin
    });
    self.addChild(testCircuit);

    var orA = new OR({
        title: 'OR-A',
        left: 100,
        top: 500,
        debugPin: self.debugPin
    });
    self.addChild(orA);

    var orB = new OR({
        title: 'OR-B',
        left: 400,
        top: 500,
        debugPin: self.debugPin
    });
    self.addChild(orB);

    Switch.createForInput(self, orA.inputs[1]);

    self.addWire({
        debugTitle: 'outerWire',
        cnn: [
            testCircuit.data[0],
            orA.output,
            orB.inputs[1]
        ],
        segments: [
            [
                testCircuit.data[0],
                'cnn2+'
            ],
            [
                'cnn0*',
                orA.output
            ]
        ]
    });

    return self.initChildren().then(function () {
        return self.initWires();
    });
};