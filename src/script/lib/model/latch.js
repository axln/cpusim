'use strict';

var Latch  = require('../circuit/Latch');
var Switch = require('../Switch');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;
    var latch1 = new Latch({
        id   : 'latch1',
        title: 'Latch',
        left : 100,
        top  : 60,
        debugPin: true
    });
    self.addChild(latch1);

    Switch.createForInput(self, latch1.dataPin);
    Switch.createForInput(self, latch1.setPin);

    return self.initChildren().then(function () {
    }).then(function () {
        return self.initWires();
    }).then(function () {
        //console.log('setting to 1');
        //return latch1.setTo1();
    });
};
