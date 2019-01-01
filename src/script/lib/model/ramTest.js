'use strict';

var RAM    = require('../circuit/RAM');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var ram1 = new RAM({
        left: 100,
        top: 50,
        scale: 1
    });
    self.addChild(ram1);

    Switch.createForInput(self, ram1.setAddrPin);
    Switch.createForInput(self, ram1.setPin);
    Switch.createForInput(self, ram1.enablePin);

    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, ram1.addr[i]);
        Switch.createForInput(self, ram1.data[i]);
    }

    return self.initChildren().then(function () {
        return ram1.setContent([1,2,3,4,5,6]);
    }).then(function () {
        return self.initWires();
    });
};

