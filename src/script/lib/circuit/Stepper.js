'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var OR      = require('../gate/OR');
var Latch   = require('./Latch');
var NOT     = require('../gate/NOT');
var Pin     = require('../conductor/Pin');

util.inherits(Stepper, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Stepper(options) {
    var self = this;
    options = options || {};

    options.stepCount = options.stepCount || 2;
    options.width     = options.stepCount * 450;
    options.height    = 500;
    options.minScale  = 0.2;
    options.pinMargin = 0.1;

    options.title = options.title || 'Stepper';

    Stepper.super_.call(self, options);

    self.outputs = [];

    self.reset = self.addPin(Pin.POS.LEFT, 7, 8, 'reset');
    self.clk   = self.addPin(Pin.POS.LEFT, 5, 8, 'clk');

    var outPos = [200, 600, 1000, 1400, 2200, self.width -200, self.width -100];
    for (var i = 0; i < options.stepCount; ++i) {
        var output = self.addPin(Pin.POS.BOTTOM, options.stepCount - 1 - i, options.stepCount, 's' + (i + 1));
        output.left = outPos[i];
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Stepper.prototype.init = function () {
    var self = this;

    var gateLatch = new Latch({
        left: 270,
        top: 20,
        scale: 0.1,
        dataValue: true
    });
    self.addChild(gateLatch);

    var gateAnd = new AND({
        left: 300,
        top: 50,
        scale: 0.3
    });
    self.addChild(gateAnd);

    var not = new NOT({
        title: 'NOT',
        left : 60,
        top  : self.clk.getPoint().top - 25
    });
    self.addChild(not);

    var resetNot = new NOT({
        title: 'NOT',
        left : 180,
        top  : self.reset.getPoint().top - 25
    });
    self.addChild(resetNot);

    var point = not.output.getParentPoint();
    //console.log('not output point:', point);

    var notClkOr = new OR({
        title: 'OR1',
        left : 180,
        top  : 0 // to calc
    });
    notClkOr.top = point.top - notClkOr.inputs[0].getPoint().top;
    self.addChild(notClkOr);

    var clkOr = new OR({
        title: 'OR2',
        left : 180,
        top  : 220
    });
    self.addChild(clkOr);

    var baseLeft = 330;
    var step     = 400;
    var scale    = 0.3;

    // clk to not, clkOr.inputs[0]
    self.addWire({
        cnn: [
            self.clk,
            not.inputs[0],
            clkOr.inputs[0]
        ],
        segments: [
            [
                self.clk,
                not.inputs[0]
            ],
            [
                {
                    top: 'cnn0.top',
                    left: 30,
                    solder: true
                },
                'cnn2+'
            ]
        ]
    });

    // not ot notClkOr.inputs[0]
    self.addWire({
        cnn: [
            not.output,
            notClkOr.inputs[0]
        ],
        segment: [
            not.output,
            'cnn1+'
        ]
    });

    var notClkWireOptions = {
        cnn: [notClkOr.output],
        segments: []
    };

    var clkWireOptions = {
        cnn: [clkOr.output],
        segments: []
    };

    for (var i = 1; i < self.outputs.length; ++i) {
        var cellLeft = baseLeft + step * (i - 1);

        var latch1 = new Latch({
            title: 'L1-' + (i-1),
            id   : 'l1-' + (i-1),
            left : cellLeft,
            top  : 0, // to calc
            scale: scale
        });
        latch1.top = resetNot.output.getParentPoint().top - latch1.dataPin.getPoint().top * scale;

        self.addChild(latch1);

        var latch2 = new Latch({
            title: 'L2-' + (i-1),
            id   : 'l2-' + (i-1),
            left : cellLeft + 200,
            top  : latch1.top,
            scale: scale
        });
        self.addChild(latch2);

        var outputPoint= {left: i * 420};
        /*var latchNot = new NOT({
            title: 'NOT' + (i - 1),
            id: 'outNot' + (i - 1),
            left: outputPoint.left - 20,
            top: self.height - 120,
            debugPin: true
        });
        self.addChild(latchNot);*/

        var outputGate;

        if (i == 1) {
            outputGate = new OR({
                title: 'OR' + (i - 1),
                id  : 'outGate' + (i - 1),
                left: outputPoint.left + 70,
                top : self.height - 120 // to calc,
            });
        } else {
            outputGate = new AND({
                title: 'AND'+ (i - 1),
                id  : 'outGate' + (i - 1),
                left: outputPoint.left + 70,
                top : self.height - 120 // to calc
            });
        }
        outputGate.inputs[1].inverted = true;
        self.addChild(outputGate);

        // latch1.output to latch2.data
        self.addWire({
            cnn: [
                latch1.output,
                latch2.dataPin
            ],
            segment: [
                latch2.dataPin,
                {
                    left: -10, relX: true,
                    top: 'cnn0.top'
                },
                latch1.output
            ]
        });

        if (i > 1) {
            var prevLatch2 = self.children['l2-' + (i - 2)];
            // from previous latch2 output to latch1 data, gate.inputs[0]
            var prevOutNot = self.children['outGate' + (i - 2)];

            self.addWire({
                cnn: [
                    prevLatch2.output,
                    prevOutNot.inputs[1],
                    latch1.dataPin,
                    outputGate.inputs[0]
                ],
                segments: [
                    [
                        latch1.dataPin,
                        {
                            left: -10, relX: true,
                            top: 'cnn0.top'
                        },
                        prevLatch2.output
                    ],
                    [
                        prevLatch2.output,
                        {
                            left: cellLeft - 45,
                            top: 0, relY: true,
                            solder: true
                        },
                        {
                            left: 0, relX: true,
                            top: self.height - 150
                        },
                        'cnn3+'
                    ],
                    [
                        prevOutNot.inputs[1],
                        {
                            left: cellLeft - 45,
                            top: self.height - 150,
                            yFirst: true,
                            solder: true
                        }
                    ]
                ]
            });

            if (i == self.outputs.length - 1) {
                self.addWire({
                    cnn: [
                        latch2.output,
                        outputGate.inputs[1], self.outputs[i]
                    ],
                    segments: [
                        [
                            latch2.output,
                            {
                                left: cellLeft + 350,
                                top: self.height - 150
                            },
                            outputGate.inputs[1]
                        ],
                        [
                            self.outputs[i],
                            {
                                left: cellLeft + 350,
                                top: self.height - 150,
                                yFirst: true,
                                solder: true
                            }
                        ]
                    ]
                });
            }
        }

        notClkWireOptions.cnn.push(latch1.setPin);
        clkWireOptions.cnn.push(latch2.setPin);

        if (i == self.outputs.length - 1) {
            notClkWireOptions.segments.push([
                latch1.setPin,
                {
                    top: 'cnn0.top',
                    left: -10, relX: true
                },
                notClkOr.output
            ]);
            clkWireOptions.segments.push([
                latch2.setPin,
                {
                    top: 'cnn0.top',
                    left: -10, relX: true
                },
                clkOr.output
            ]);
        } else {
            notClkWireOptions.segments.push([
                latch1.setPin,
                {
                    top: 'cnn0.top',
                    left: -10, relX: true,
                    solder: true
                }
            ]);

            clkWireOptions.segments.push([
                latch2.setPin,
                {
                    top: 'cnn0.top',
                    left: -10, relX: true,
                    solder: true
                }
            ]);
        }

        // outGate to self.output
        self.addWire({
            cnn: [
                outputGate.output,
                self.outputs[i - 1]
            ],
            segment: [
                outputGate.output,
                {
                    left: 5, relX: true,
                    top: self.height - 50 + 5 * i
                },
                self.outputs[i - 1]
            ]
        });
    }

    // reset to reset not, notClkOr. clkOr
    var orOutGate = self.children['outGate0'];
    self.addWire({
        cnn: [
            self.reset,
            resetNot.inputs[0],
            notClkOr.inputs[1],
            clkOr.inputs[1],
            orOutGate.inputs[0]
        ],
        segments: [
            [
                self.reset,
                resetNot.inputs[0]
            ],
            [
                {
                    left: 140,
                    top: 'cnn0.top',
                    solder: true
                },
                'cnn4+'
            ],
            [
                notClkOr.inputs[1],
                {
                    left: 140,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                clkOr.inputs[1],
                {
                    left: 140,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            resetNot.output,
            gateAnd.inputs[0]
        ],
        segment: [
            resetNot.output,
            gateAnd.inputs[0]
        ]
    });


    self.addWire({
        cnn: [
            gateAnd.output,
            self.children['l1-0'].dataPin
        ],
        segment: [
            gateAnd.output,
            self.children['l1-0'].dataPin
        ]
    });


    self.addWire({
        cnn: [
            gateLatch.output,
            gateAnd.inputs[1]
        ],
        segment: [
            gateLatch.output,
            gateAnd.inputs[1]
        ]
    });

    // notClk.output to all latch1 set
    clkWireOptions.cnn.push(gateLatch.setPin);
    clkWireOptions.segments.push([
        'cnn0*',
        'cnn' + (clkWireOptions.cnn.length - 1) + '+'
    ]);
    self.addWire(notClkWireOptions);
    // clk.output to all latch1 set
    self.addWire(clkWireOptions);


    return Stepper.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Stepper.prototype.drawSelf = function (ctx) {
    var self = this;
    Stepper.super_.prototype.drawSelf.call(self, ctx);

    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 200 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Stepper;