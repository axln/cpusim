'use strict';

var NAND   = require('../gate/NAND');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    self.debugPin = true;

    var nor1 = new NAND({
        title: 'NAND1',
        left: 200,
        top: 100,
        debugPin: self.debugPin
    });
    self.addChild(nor1);

    Switch.createForInput(self, nor1.inputs[1], true);

    var nor2 = new NAND({
        title: 'NAND2',
        left: 200,
        top: 200,
        debugPin: self.debugPin

    });
    self.addChild(nor2);
    Switch.createForInput(self, nor2.inputs[0], true);

    self.addWire({
        cnn: [
            nor1.output,
            nor2.inputs[1]
        ],
        segment: [
            nor1.output,
            {
                left: 0, relX: true,
                top: 35, relY: true
            },
            {
                left: 'cnn1.left',
                top: 25, relY: true,
                skew: true
            },
            nor2.inputs[1]
        ]
    });

    self.addWire({
        cnn: [
            nor2.output,
            nor1.inputs[0]
        ],
        segment: [
            nor2.output,
            {
                left: 0, relX: true,
                top: -40, relY: true
            },
            {
                left: 'cnn1.left',
                top: -25, relY: true,
                skew: true
            },
            nor1.inputs[0]
        ]
    });

    return self.initChildren().then(function () {
        return self.initWires();
    });
};
