'use strict';

var RS     = require('../circuit/RS');
var BusReg = require('../circuit/BusReg');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var rs = new RS({
        title: 'RS',
        top: 50,
        left: 100
    });
    self.addChild(rs);

    Switch.createForInput(self, rs.inputs[0]);
    Switch.createForInput(self, rs.inputs[1]);

    var busReg = new BusReg({
        title: 'BusReg',
        top: 300,
        left: 50
    });
    self.addChild(busReg);

    Switch.createForInput(self, busReg.setPin);
    Switch.createForInput(self, busReg.enablePin);

    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, busReg.data[i]);
    }

    return self.initChildren().then(function () {
        return self.initWires();

    });
};