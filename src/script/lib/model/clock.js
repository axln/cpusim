'use strict';

var $     = require('jquery');
var Clock = require('../circuit/Clock');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var clock = new Clock({
        left: 50,
        top : 50
    });
    self.addChild(clock);

    return self.initChildren().then(function () {
        $('#tick').click(function () {
            clock.doTick().catch(function (err) {
                console.log('tick error:', err.stack);
            });
        });
        //clock.scheduleTick();
    });
};