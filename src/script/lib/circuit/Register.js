'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var Byte    = require('./Byte');
var Enabler = require('./Enabler');
var Pin     = require('../conductor/Pin');

util.inherits(Register, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Register(options) {
    var self = this;
    options = options || {};
    options.width     = 300;
    options.height    = 290;
    options.pinMargin = 0.15;
    options.minScale  = 0.4;

    Register.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];
    self.byte    = null;

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, pinCount, 'ri' + i);
        self.inputs.push(input);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'ro' + j);
        self.outputs.push(output);
    }

    self.setPin    = self.addPin(Pin.POS.BOTTOM, 3, 5, 's');
    self.enablePin = self.addPin(Pin.POS.BOTTOM, 1, 5, 'e');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Register.prototype.init = function () {
    var self = this;
    self.byte = new Byte({
        id   : 'byte1',
        title: 'B',
        left : 30,
        top  : 20,
        scale: 0.5
    });
    self.addChild(self.byte);

    var enabler = self.enabler = new Enabler({
        left : 160,
        top  : 20,
        scale: 0.5,
        debugPin: self.debugPin
    });
    self.addChild(enabler);

    for (var i = 0; i < 8; ++i) {
        // input to byte wire
        self.addWire({
            cnn: [
                self.inputs[i],
                self.byte.inputs[i]
            ],
            segments: [
                [
                    self.inputs[i],
                    {
                        left: 10, relX: true,
                        top: 'cnn1.top'
                    },
                    self.byte.inputs[i]
                ]
            ]
        });

        // enabler to output wires
        self.addWire({
            cnn: [
                enabler.outputs[i],
                self.outputs[i]
            ],
            segments: [
                [
                    enabler.outputs[i],
                    {
                        left: 10, relX: true,
                        top: 'cnn1.top'
                    },
                    self.outputs[i]
                ]
            ]
        });

        // byte to enabler wires
        self.addWire({
            cnn: [
                self.byte.outputs[i],
                enabler.inputs[i]
            ],
            segments: [
                [
                    self.byte.outputs[i],
                    enabler.inputs[i]
                ]
            ]
        });
    }

    // input set to byte's set wire
    self.addWire({
        cnn: [
            self.setPin,
            self.byte.setPin
        ],
        segments: [
            [
                self.setPin,
                {
                    left: 0, relX: true,
                    top: 'cnn1.top'
                },
                self.byte.setPin
            ]
        ]
    });

    // input enable to enabler's enable wire
    self.addWire({
        cnn: [
            self.enablePin,
            enabler.enablePin
        ],
        segments: [
            [
                self.enablePin,
                {
                    left: 0, relX: true,
                    top: 'cnn1.top'
                },
                enabler.enablePin
            ]
        ]
    });

    return Register.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Register.prototype.getTitle = function () {
    var self = this;
    var title = Register.super_.prototype.getTitle.call(self);
    return title + ':' + self.byte.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Register.prototype.drawSelf = function (ctx) {
    var self = this;
    Register.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Register;