'use strict';

var Decoder7Seg = require('../circuit/Decoder7Seg');
var Seg7        = require('../circuit/Seg7');
var Switch      = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var dec1 = new Decoder7Seg({
        id: "dec1",
        title: "Seg7Dec",
        left: 100,
        top: 50
    });
    self.addChild(dec1);

    for (var i = 0; i < dec1.inputs.length; ++i) {
        Switch.createForInput(self, dec1.inputs[i]);
    }

    var seg7 = new Seg7({
        id   : "seg7",
        title: "Seg7",
        left : 660,
        top  : 20
    });
    self.addChild(seg7);

    for (var j = 0; j < 7; ++j) {
        self.addWire({
            cnn: [
                dec1.outputs[j],
                seg7.inputs[j]

            ],
            segment: [
                dec1.outputs[j],
                {
                    left: 40 + j * 5, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

    }

    return self.initChildren().then(function () {
        return self.initWires();
    });
};

