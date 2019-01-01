'use strict';

var Register = require('../circuit/Register');
var Switch   = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var register1 = new Register({
        id: "register1",
        title: "R1",
        left: 100,
        top: 50
    });
    self.addChild(register1);
    Switch.createForInput(self, register1.setPin);
    Switch.createForInput(self, register1.enablePin);

    for (var i = 0; i < 8; ++i) {
        Switch.createForInput(self, register1.inputs[i]);
    }

    return self.initChildren().then(function () {
        return self.initWires();
    });
};
