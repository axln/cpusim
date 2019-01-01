'use strict';

var util     = require('util');
var Circuit  = require('./Circuit');
var Register = require('./Register');
var Pin      = require('../conductor/Pin');
var OR       = require('../gate/OR');
var NAND     = require('../gate/NAND');
var Switch   = require('../Switch');

util.inherits(TestCircuit, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TestCircuit(options) {
    var self = this;
    options = options || {};
    options.width     = 400;
    options.height    = 400;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    TestCircuit.super_.call(self, options);

    self.data = [];

    var pinCount = 1;

    for (var j = 0; j < pinCount; ++j) {
        var data = self.addPin(Pin.POS.BOTTOM, j, pinCount, 'd'+ j);
        self.data.push(data);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TestCircuit.prototype.init = function () {
    var self = this;

    /*self.or1 = new OR({
        title: 'OR1',
        top: 50,
        left: 50,
        //values: [false, true],
        debugPin: true
    });
    self.addChild(self.or1);

    self.or2 = new OR({
        title: 'OR2',
        top: 150,
        left: 50,
        debugPin: true
    });
    self.addChild(self.or2);

    self.or3 = new OR({
        title: 'OR3',
        top: 100,
        left: 250,
        debugPin: true
    });
    self.addChild(self.or3);
    self.or3.inputs[1].inverted = true;

    var wire = self.addWire({
        debugTitle: 'mainWire',
        cnn: [
            self.or1.output,
            self.or2.output,
            self.or3.inputs[1]
        ],
        segments: [
            [
                self.or1.output,
                self.or3.inputs[1]
            ],
            [
                self.or2.output,
                {
                    left: 50, relX: true,
                    offsetX: -25,
                    top: 'cnn0.top',
                    solder: true
                }
            ]
        ]
    });



    self.addWire({
        debugTitle: 'pinWire',
        cnn: [
            self.or3.output,
            self.data[0]
        ],
        segment: [
            self.or3.output,
            {
                left: 20, relX: true,
                top: 0, relY: true
            },
            {
                left: 0, relX: true,
                top: self.height - 30
            },
            self.data[0]
        ]
    });
     */

    var or1 = new OR({
        title: 'OR1',
        left: 100,
        top: 50,
        debugPin: self.debugPin
    });
    self.addChild(or1);

    Switch.createForInput(self, or1.inputs[1]);

    self.addWire({
        debugTitle: 'innerWire',
        cnn: [
            or1.output,
            self.data[0]
        ],
        segment: [
            or1.output,
            self.data[0]
        ]
    });

    return TestCircuit.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TestCircuit.prototype.drawSelf = function (ctx) {
    var self = this;
    TestCircuit.super_.prototype.drawSelf.call(self, ctx);

    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = TestCircuit;