'use strict';

var util    = require('util');
var Promise = require('aigle');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var OR      = require('../gate/OR');
var Pin     = require('../conductor/Pin');

util.inherits(Clock, Circuit);

Clock.CYCLE = 500;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Clock(options) {
    var self = this;
    options = options || {};
    options.width     = 300;
    options.height    = 300;
    options.minScale  = 0.5;
    options.pinMargin = 0.2;

    options.title = options.title || 'Clock';

    Clock.super_.call(self, options);

    self.timer = null;
    self.cleared = false;

    self.srcClk = new Pin({
        parent  : self,
        title   : 'clk',
        position: Pin.POS.LEFT,
        left    : 100,
        top     : self.height / 2,
        length  : 50,
        //value   : true,
        active  : true
    });
    self.pins.push(self.srcClk);

    self.delayClk = new Pin({
        parent  : self,
        title   : 'clk d',
        position: Pin.POS.LEFT,
        left    : 30,
        top     : self.height /2  + 50,
        length  : 50,
        active  : true
    });
    self.pins.push(self.delayClk);

    self.clkS = self.addPin(Pin.POS.RIGHT, 2, 3, 'clk s');
    self.clk  = self.addPin(Pin.POS.RIGHT, 1, 3, 'clk');
    self.clkE = self.addPin(Pin.POS.RIGHT, 0, 3, 'clk e');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.init = function () {
    var self = this;

    var and = new AND({
        title: 'AND',
        left: 200,
        top : self.clkS.getPoint().top - 25
    });
    self.addChild(and);

    var or = new OR({
        title: 'OR',
        left: 200,
        top : self.clkE.getPoint().top - 25
    });
    self.addChild(or);

    self.addWire({
        cnn: [
            self.srcClk,
            self.clk,
            or.inputs[1],
            and.inputs[0]
        ],
        segments: [
            [
                self.srcClk,
                {
                    left: self.width - 50,
                    top: 'cnn1.top'
                },
                self.clk
            ],
            [
                or.inputs[1],
                {
                    left: 0, relX: true,
                    top: 'cnn0.top',
                    solder: true
                }
            ],
            [
                and.inputs[0],
                {
                    left: 0, relX: true,
                    top: 'cnn0.top',
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.delayClk,
            or.inputs[0],
            and.inputs[1]
        ],
        segments: [
            [
                self.delayClk,
                {
                    top: 'cnn2.top',
                    left: 'cnn0.left'
                },
                and.inputs[1]
            ],
            [

                or.inputs[0],
                'cnn0*'
            ]
        ]
    });

    self.addWire({
        cnn: [
            or.output,
            self.clkE
        ],
        segment: [
            or.output,
            {
                left: self.width - 50,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            and.output,
            self.clkS
        ],
        segment: [
            and.output,
            {
                left: self.width - 50,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });

    return Clock.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.scheduleTick = function () {
    var self = this;
    //console.log('Clock: scheduleTick');
    if (!self.cleared) {
        self.timer = setTimeout(self.onHalfTick.bind(self), Clock.CYCLE / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.doTick = function () {
    var self = this;
    return Promise.try(function () {
        if (self.srcClk.value) {
            if (self.delayClk.value) {
                return self.srcClk.setValue(false);
            } else {
                return self.delayClk.setValue(true);
            }
        } else {
            if (self.delayClk.value) {
                return self.delayClk.setValue(false);
            } else {
                return self.srcClk.setValue(true);
            }
        }
    }).then(function () {
        window.root._redraw();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.onHalfTick = function () {
    var self = this;
    self.timer = null;
    return self.doTick().then(function () {
        self.scheduleTick();
    }).catch(function (err) {
        console.log('Clock: Error during tick:', err.stack);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.clear = function () {
    var self = this;
    //console.log('Clock clear');
    Clock.super_.prototype.clear.call(self);
    if (self.timer) {
        clearTimeout(self.timer);
    }
    self.cleared = true;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Clock.prototype.drawSelf = function (ctx) {
    var self = this;
    Clock.super_.prototype.drawSelf.call(self, ctx);

    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 90 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Clock;