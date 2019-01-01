'use strict';

var CMP        = require('../circuit/CMP');
var Comparator = require('../circuit/Comparator');
var Switch     = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var cmp = new CMP({
        left: 100,
        top: 50
    });
    self.addChild(cmp);

    Switch.createForInput(self, cmp.eqInPin);
    Switch.createForInput(self, cmp.largerInPin);
    Switch.createForInput(self, cmp.inputA);
    Switch.createForInput(self, cmp.inputB);

    var comparator = new Comparator({
        left: 100,
        top: 350
    });
    self.addChild(comparator);

    comparator.inputsA.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    comparator.inputsB.forEach(function (input) {
        Switch.createForInput(self, input);
    });

    return self.initChildren().then(function () {
        return self.initWires();
    });
};
