'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var Latch   = require('./Latch');
var Pin     = require('../conductor/Pin');
var Bus     = require('../conductor/Bus');
var Helper  = require('../Helper');

util.inherits(BusReg, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function BusReg(options) {
    var self = this;
    options = options || {};
    options.width     = 350;
    options.height    = 560;
    options.pinMargin = 0.08;
    options.minScale  = 0.4;

    BusReg.super_.call(self, options);
    self.data    = [];
    self.latches = [];

    var pinCount = 8;
    for (var j = 0; j < pinCount; ++j) {
        var dataPin = self.addPin(Pin.POS.RIGHT, j, pinCount, 'd'+ j);
        self.data.push(dataPin);
    }

    self.setPin    = self.addPin(Pin.POS.BOTTOM, 4, 6, 's');
    self.enablePin = self.addPin(Pin.POS.BOTTOM, 1, 6, 'e');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusReg.prototype.init = function () {
    var self = this;
    var setWireOptions = {
        cnn     : [self.setPin],
        segments: []
    };

    var enableWireOptions = {
        cnn     : [self.enablePin],
        segments: []
    };

    var latchInputs  = [];
    var andOutputs = [];

    for (var i = 0; i < 8; ++i) {
        var ri = 7 - i;
        var latch = new Latch({
            id   : 'latch' + i,
            title: 'Latch' + i,
            left : 65,
            top  : 60 + 60 * ri,
            scale: 0.25
        });
        self.addChild(latch);
        self.latches.push(latch);

        var and = new AND({
            id   : 'and' + i,
            title: 'AND' + i,
            left : 220,
            top  : 70 + 60 * ri,
            scale: 0.5
        });
        self.addChild(and);

        latchInputs.push(latch.dataPin);
        andOutputs.push(and.output);

        // latch's output to and and input
        self.addWire({
            cnn: [
                latch.output,
                and.inputs[1]
            ],
            segments: [
                [
                    latch.output,
                    {
                        left: 5, relX: true,
                        top: 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });

        setWireOptions.cnn.push(latch.setPin);
        enableWireOptions.cnn.push(and.inputs[0]);

        var setLeft = 50;
        var enableLeft = 200;

        if (i == 7) {
            setWireOptions.segments.push([
                latch.setPin,
                {
                    left: setLeft,
                    top : self.height - 15
                },
                self.setPin
            ]);
            enableWireOptions.segments.push([
                and.inputs[0],
                {
                    left: enableLeft,
                    top : self.height - 15
                },
                self.enablePin
            ]);
        } else {
            setWireOptions.segments.push([
                latch.setPin,
                {
                    left: setLeft,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
            enableWireOptions.segments.push([
                and.inputs[0],
                {
                    left: enableLeft,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }
    }

    self.addWire(setWireOptions);
    self.addWire(enableWireOptions);

    var dataBus = new Bus({
        parent: self,
        cnn: [
            self.data,
            latchInputs,
            andOutputs
        ],
        segments: [
            [
                self.data,
                {
                    left : self.width - 25,
                    top  : 30,
                    align: 'right'
                },
                {
                    left: 30,
                    top: 30,
                    align: 'left'
                },
                'cnn1+'
            ],
            [
                andOutputs,
                {
                    top: 30,
                    left: 25, relX: true,
                    solder: true,
                    align: 'left'
                }
            ]
        ]
    });

    self.buses.push(dataBus);

    return dataBus.init().then(function () {
        return BusReg.super_.prototype.init.call(self);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusReg.prototype.getTitle = function () {
    var self = this;
    var title = BusReg.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusReg.prototype.getHexValue = function () {
    var self = this;
    var value = 0;
    var weight = 1;
    for (var i = 0; i < 8; ++i) {
        if (self.latches[i].output.value) {
            value += weight;
        }
        weight = weight << 1;
    }
    var strVal = value.toString(16).toUpperCase();
    if (value <= 0xF) {
        strVal = '0' + strVal;
    }
    return strVal;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusReg.prototype.drawSelf = function (ctx) {
    var self = this;
    BusReg.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 90 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
BusReg.prototype.setByte = function (byte) {
    var self = this;
    var binaryString = Helper.number2BinString(byte);
    var bitsToSet = [];
    for (var i =  0; i < binaryString.length; ++i) {
        var ri = binaryString.length - 1 - i;
        if (binaryString[ri] === '1') {
            bitsToSet.push(i);
        }
    }
    return Promise.all(bitsToSet.map(function (latchIndex) {
        return self.latches[latchIndex].setTo1();
    }));
};

module.exports = BusReg;