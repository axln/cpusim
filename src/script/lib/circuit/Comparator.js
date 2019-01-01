'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var CMP     = require('./CMP');
var Pin     = require('../conductor/Pin');

util.inherits(Comparator, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Comparator(options) {
    var self = this;
    options = options || {};
    options.title     = 'CMP';
    options.width     = 300;
    options.height    = Circuit.BYTE_HANDLER_HEIGHT;
    options.minScale  = 0.4;
    options.pinMargin = 0.15;

    Comparator.super_.call(self, options);

    self.inputsA = [];
    self.inputsB = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var inputA = self.addPin(Pin.POS.LEFT, i, pinCount, 'a'+ i);
        self.inputsA.push(inputA);

        var inputB = self.addPin(Pin.POS.TOP, i, pinCount, 'b'+ i);
        self.inputsB.push(inputB);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.RIGHT, j, pinCount, 'c'+ j);
        self.outputs.push(output);
    }

    self.eqPin     = self.addPin(Pin.POS.BOTTOM, 5, 8, 'equal out');
    self.largerPin = self.addPin(Pin.POS.BOTTOM, 2, 8, 'a larger out');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Comparator.prototype.init = function () {
    var self = this;

    var baseTop = 50;
    var scale = 0.2;

    for (var i = 0; i < 8; ++i) {
        var ri = 7 - i;
        var cmp = new CMP({
            id   : 'cmp' + ri,
            title: 'CMP' + ri,
            top  : baseTop + 55 * i,
            left : 95,
            scale: scale,
            equal: i == 0
        });

        if (i == 0) {
            // high bit eqInPin must be always on in comparator
            cmp.eqInPin.value = true;
            cmp.eqInPin.title += ' (always on)';

            cmp.largerInPin.title += ' (always off)';
        }

        self.addChild(cmp);
        self.addWire({
            cnn: [
                self.inputsA[ri],
                cmp.inputA
            ],
            segments: [
                [
                    self.inputsA[ri],
                    {
                        left: 20, relX: true,
                        top: 'cnn0.top'
                    },
                    'cnn1+'
                ]
            ]
        });
        self.addWire({
            cnn: [
                self.inputsB[ri],
                cmp.inputB
            ],
            segments: [
                [
                    self.inputsB[ri],
                    {
                        left  : self.width * self.pinMargin + i * 3,
                        top   : 15 + i * 3,
                        yFirst: true
                    },
                    'cnn1+'
                ]
            ]
        });

        self.addWire({
            cnn: [
                cmp.output,
                self.outputs[ri]
            ],
            segments: [
                [
                    cmp.output,
                    {
                        left: self.width - 20,
                        top: 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });

        if (i > 0) {
            var prevCmp = self.children['cmp' + (ri + 1)];
            self.addWire({
                cnn: [
                    prevCmp.eqOutPin,
                    cmp.eqInPin
                ],
                segment: [
                    prevCmp.eqOutPin,
                    cmp.eqInPin
                ]
            });

            self.addWire({
                cnn: [
                    prevCmp.largerOutPin,
                    cmp.largerInPin
                ],
                segment: [
                    prevCmp.largerOutPin,
                    cmp.largerInPin
                ]
            });
        }

        if (i == 7) {
            self.addWire({
                cnn: [
                    cmp.eqOutPin,
                    self.eqPin
                ],
                segments: [
                    [
                        cmp.eqOutPin,
                        {
                            left: 0, relX: true,
                            top: 7, relY: true
                        },
                        self.eqPin
                    ]
                ]
            });

            self.addWire({
                cnn: [
                    cmp.largerOutPin,
                    self.largerPin
                ],
                segments: [
                    [
                        cmp.largerOutPin,
                        {
                            left: 0, relX: true,
                            top: 7, relY: true
                        },
                        self.largerPin
                    ]
                ]
            });
        }
    }

    return Comparator.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Comparator.prototype.getTitle = function () {
    var self = this;
    var title = Comparator.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Comparator.prototype.drawSelf = function (ctx) {
    var self = this;
    Comparator.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 60 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Comparator;