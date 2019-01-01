'use strict';

var Bus1   = require('../circuit/Bus1');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var bus1 = new Bus1({
        left: 100,
        top: 100
    });
    self.addChild(bus1);

    Switch.createForInput(self, bus1.bus1);

    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, bus1.inputs[i]);
    }

    return self.initChildren().then(function () {
        return self.initWires();
    });
};