'use strict';

var DFlipFlop = require('../circuit/DFlipFlop');
var Switch    = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var fdf1 = new DFlipFlop({
        id: 'fdf1',
        title: 'DFlipFlop',
        left: 100,
        top: 60,
        scale: 1
    });
    self.addChild(fdf1);

    Switch.createForInput(self, fdf1.dataPin);
    Switch.createForInput(self, fdf1.setPin);

    return self.initChildren().then(function () {
        return self.initWires();
    });
};

