'use strict';

var Register = require('../circuit/Register');
var Bus      = require('../conductor/Bus');
var Switch   = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var reg1 = new Register({
        id: 'reg1',
        title: 'REG1',
        top: 200,
        left: 100,
        scale: 0.8
    });
    self.addChild(reg1);
    Switch.createForInput(self, reg1.setPin);
    Switch.createForInput(self, reg1.enablePin);

    var reg2 = new Register({
        id: 'reg2',
        title: 'REG2',
        top: 200,
        left: 600,
        scale: 0.8
    });
    self.addChild(reg2);
    Switch.createForInput(self, reg2.setPin);
    Switch.createForInput(self, reg2.enablePin);

    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, reg1.inputs[i]);
    }

    var bus = new Bus({
        parent: self,
        cnn: [
            reg1.outputs,
            reg2.outputs,
            reg2.inputs
        ],
        segments: [
            [
                reg1.outputs,
                {
                    left: 400,
                    top: 100,
                    align: 'left'
                },
                {
                    left: 900,
                    top: 0, relY: true,
                    align: 'x',
                    flip: true
                },
                'cnn1+'
            ],
            [
                {
                    left: 500,
                    top: 100,
                    solder: true,
                    align: 'right'
                },
                'cnn2+'
            ]
        ]
    });

    self.buses.push(bus);

    return self.initChildren().then(function () {
        bus.init();
    }).then(function () {
        return self.initWires();
    });
};
