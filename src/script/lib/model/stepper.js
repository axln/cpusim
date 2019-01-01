'use strict';

var $       = require('jquery');
var Clock   = require('../circuit/Clock');
var Stepper = require('../circuit/Stepper');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    var self = this;

    var clock = new Clock({
        left: 50,
        top: 120,
        scale: 0.2
    });
    self.addChild(clock);

    var stepper = new Stepper({
        left     : 150,
        top      : 50,
        stepCount: 7,
        scale    : 0.2
    });
    self.addChild(stepper);

    self.addWire({
        turnOnDelay: 300,
        cnn: [
            stepper.outputs[6],
            stepper.reset
        ],
        segment: [
            stepper.outputs[6],
            {
                left: 80, relX: true,
                top: -140, relY: true
            },
            stepper.reset
        ]
    });

    self.addWire({
        cnn: [
            clock.clk,
            stepper.clk
        ],
        segment: [
            clock.clk,
            {
                left: 20, relX: true,
                top: 0, relY: true
            },
            stepper.clk
        ]
    });

    return self.initChildren().then(function () {
        return self.initWires();
    }).then(function () {
        $('#tick').click(function () {
            clock.doTick().catch(function (err) {
                console.log('tick error:', err.stack);
            });
        });
        //clock.scheduleTick();
    });
};