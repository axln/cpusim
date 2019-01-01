'use strict';

var Decoder = require('../circuit/Decoder');
var Enabler = require('../circuit/Enabler');
var Switch  = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    self.debugPin = true;

    var dec1 = new Decoder({
        id        : 'dec1',
        title     : 'DEC1',
        inputCount: 4,
        top       : 50,
        left      : 100,
        flip      : true,
        reversed  : true
    });
    self.addChild(dec1);

    var dec2 = new Decoder({
        id        : 'dec2',
        title     : 'DEC2',
        inputCount: 4,
        top       : 50,
        left      : 500,
        debugPin: true
    });
    self.addChild(dec2);

    var enabler = new Enabler({
        left: 800,
        top: 50,
        scale: 0.5,
        debugPin: true
    });
    self.addChild(enabler);

    self.addWire({
        title: 'mainWire',
        cnn: [
            dec2.outputs[0],
            enabler.enablePin
        ],
        segment: [
            dec2.outputs[0],
            enabler.enablePin
        ]
    });

    for (var i = 0; i < 4; ++i) {
        Switch.createForInput(self, dec1.inputs[i]);
        Switch.createForInput(self, dec2.inputs[i]);
    }

    return self.initChildren().then(function () {
        return self.initWires();
    });
};