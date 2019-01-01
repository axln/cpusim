'use strict';

var Promise    = require('aigle');
var util       = require('util');
var Circuit    = require('./Circuit');
var Decoder    = require('./Decoder');
var Comparator = require('./Comparator');
var Adder      = require('./Adder');
var Orer       = require('./Orer');
var Zero       = require('./Zero');
var Ander      = require('./Ander');
var SHL        = require('./SHL');
var SHR        = require('./SHR');
var Inverter   = require('./Inverter');
var Enabler    = require('./Enabler');
var Pin        = require('../conductor/Pin');
var Bus        = require('../conductor/Bus');
var AND        = require('../gate/AND');

util.inherits(ALU, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ALU(options) {
    var self = this;
    options = options || {};

    options.title     = 'ALU';
    options.width     = 600;
    options.height    = 1250;
    options.minScale  = 0.4;
    options.pinMargin = 0.25;

    ALU.super_.call(self, options);

    self.inputsA = [];
    self.inputsB = [];
    self.outputs = [];
    self.op      = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var inputA = self.addPin(Pin.POS.LEFT, i, pinCount, 'a'+ i);
        self.inputsA.push(inputA);
    }

    for (var j = 0; j < pinCount; ++j) {
        var inputB = self.addPin(Pin.POS.TOP, j, pinCount, 'b'+ j);
        self.inputsB.push(inputB);
    }

    for (var k = 0; k < pinCount; ++k) {
        var output = self.addPin(Pin.POS.BOTTOM, k, pinCount, 'c'+ k);
        self.outputs.push(output);
    }

    for (var n = 0; n < 3; ++n) {
        var op = self.addPin(Pin.POS.RIGHT, n, 8, 'op ' + n);
        self.op.push(op);
    }
    self.carryIn = self.addPin(Pin.POS.RIGHT, 3, 8, 'carry in');

    self.carryOuPin = self.addPin(Pin.POS.RIGHT, 4, 8, 'carry out');
    self.zeroPin    = self.addPin(Pin.POS.RIGHT, 5, 8, 'zero');
    self.equalPin   = self.addPin(Pin.POS.RIGHT, 6, 8, 'equal');
    self.largerPin  = self.addPin(Pin.POS.RIGHT, 7, 8, 'a larger');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ALU.prototype.init = function () {
    var self = this;
    var scale = 0.2;
    var baseTop = 80;
    var baseLeft = 150;
    var step =  150;

    var cmp = new Comparator({
        left : baseLeft,
        top  : baseTop,
        scale: scale
    });
    self.addChild(cmp);

    var orer = new Orer({
        left: baseLeft,
        top: baseTop + step,
        scale: scale
    });
    self.addChild(orer);

    var ander = new Ander({
        left: baseLeft,
        top: baseTop + step * 2,
        scale: scale
    });

    self.addChild(ander);

    var adder = new Adder({
        left: baseLeft,
        top: baseTop + step * 3,
        scale: scale
    });
    self.addChild(adder);

    var adderCarryAnd = new AND({
        title: 'CARRY+',
        left: baseLeft + 210,
        top: adder.top + adder.height * scale + 10,
        scale: 0.3
    });
    self.addChild(adderCarryAnd);

    var not = new Inverter({
        left: baseLeft,
        top: baseTop + step * 4,
        scale: scale
    });
    self.addChild(not);

    var shl = new SHL({
        left: baseLeft,
        top: baseTop + step * 5,
        scale: scale
    });
    self.addChild(shl);

    var shlCarryAnd = new AND({
        title: 'CARRY<<',
        left: baseLeft + 210,
        //top: shl.top - 20,
        top: shl.top + shl.height * scale + 10,
        scale: 0.3
    });
    self.addChild(shlCarryAnd);

    var shr = new SHR({
        left: baseLeft,
        top: baseTop + step * 6,
        scale: scale
    });
    self.addChild(shr);

    var shrCarryAnd = new AND({
        title: 'CARRY>>',
        left: baseLeft + 210,
        top: shr.top + shl.height * scale + 10,
        scale: 0.3
    });
    self.addChild(shrCarryAnd);

    var zero = new Zero({
        left : self.width - 60,
        top  : self.zeroPin.getPoint(true).top,
        scale: scale
    });
    self.addChild(zero);

    self.addWire({
        cnn: [
            zero.output,
            self.zeroPin
        ],
        segment: [
            zero.output,
            {
                left: self.width - 20,
                top : 0, relY: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            self.carryIn,
            adder.carryIn,
            shl.shiftInPin,
            shr.shiftInPin
        ],
        segments: [
            [
                self.carryIn,
                {
                    left: self.width - 70,
                    top: adder.top + 130
                },
                adder.carryIn
            ],
            [
                {
                    left: baseLeft + 80,
                    top: adder.top + 130,
                    solder: true
                },
                {
                    top: shl.top + 110,
                    left: 0, relX: true
                },
                shl.shiftInPin
            ],
            [
                {
                    top: shl.top + 110,
                    left: baseLeft + 80,
                    solder: true
                },
                {
                    top: shr.top - 15,
                    left: 0, relX: true
                },
                shr.shiftInPin
            ]
        ]
    });

    self.addWire({
        cnn: [
            adder.carryOut,
            adderCarryAnd.inputs[0]
        ],
        segment: [
             adder.carryOut,
             'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            cmp.eqPin,
            self.equalPin
        ],
        segment: [
            cmp.eqPin,
            {
                left: self.width - 65,
                top : 10, relY: true,
                yFirst: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            cmp.largerPin,
            self.largerPin
        ],
        segment: [
            cmp.largerPin,
            {
                left: self.width - 60,
                top: 5, relY: true,
                yFirst: true
            },
            'cnn1+'
        ]
    });

    var busAOptions = {
        parent: self,
        cnn: [
            self.inputsA,
            cmp.inputsA,
            orer.inputsA,
            ander.inputsA,
            adder.inputsA,
            not.inputs,
            shl.inputs,
            shr.inputs
        ],
        segments: [
            [
                self.inputsA,
                {
                    left: 25,
                    top: self.height - 160,
                    align: 'right'
                },
                {
                    left: 65,
                    top: 0, relY: true,
                    align: 'x'
                },
                'cnn1+'
            ]
        ]
    };
    [orer.inputsA, ander.inputsA, adder.inputsA, not.inputs, shl.inputs, shr.inputs].forEach(function (inputs) {
        busAOptions.segments.push([
            inputs,
            {
                left: 65,
                top: 0, relY: true,
                solder: true,
                align: 'x'
            }
        ]);
    });

    var busA = new Bus(busAOptions);
    self.buses.push(busA);

    var busBOptions = {
        parent : self,
        cnn: [self.inputsB, cmp.inputsB, orer.inputsB, ander.inputsB, adder.inputsB],
        segments: [
            [
                self.inputsB,
                {
                    left: 110,
                    top: 25,
                    yFirst: true,
                    align: 'left'
                },
                {
                    left: 0, relX: true,
                    top: adder.top - 45, relY: true,
                    align: 'y',
                    yFirst: true,
                    flip: true,
                    dbl: true
                },
                adder.inputsB
            ]
        ]
    };

    [cmp, orer, ander].forEach(function (circuit) {
        busBOptions.segments.push([
            {
                left  : 110,
                top   : circuit.top - 20,
                solder: true,
                flip: true,
                align : 'right'
            },
            circuit.inputsB
        ]);
    });

    var busB = new Bus(busBOptions);
    self.buses.push(busB);

    var opDecoder = new Decoder({
        id: 'opDecoder',
        title: 'OP',
        left : baseLeft + 80,
        top  : self.height - 120,
        scale: scale,
        inputCount: 3
    });
    var opOutputTitles = ['ADD', 'SHR', 'SHL', 'NOT', 'AND', 'OR', 'XOR', 'CMP'];
    for (var n = 0; n < opDecoder.outputs.length; ++n) {
        opDecoder.outputs[n].title = opOutputTitles[n];
    }

    self.addChild(opDecoder);
    for (var i = 0; i < 3; ++i) {
        self.addWire({
            cnn: [
                self.op[i],
                opDecoder.inputs[i]
            ],
            segment: [
                self.op[i],
                {
                    left: -30 - i * 3, relX: true,
                    top: opDecoder.top + 75 - 3 * i
                },
                {
                    top: 0, relY: true,
                    left: opDecoder.left - 13 + i * 3
                },
                'cnn1+'
            ]
        });
    }

    var operators = [adder, shr, shl, not, ander, orer, cmp];
    operators.forEach(function (operator, opCode) {
        var enabler = new Enabler({
            left: baseLeft + 200,
            top  : operator.top,
            scale: scale
        });
        operator.enabler = enabler;
        self.addChild(enabler);
        for (var i = 0; i < 8; ++i) {
            self.addWire({
                cnn: [
                    operator.outputs[i],
                    enabler.inputs[i]
                ],
                segment: [
                    operator.outputs[i],
                    enabler.inputs[i]
                ]
            });
        }
        self.addWire({
            cnn: [
                opDecoder.outputs[opCode],
                enabler.enablePin
            ],
            segments: [
                [
                    opDecoder.outputs[opCode],
                    {
                        left: 25 - opCode * 3, relX: true,
                        top: 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });
    });

    self.addWire({
        cnn: [
            opDecoder.outputs[0],
            adderCarryAnd.inputs[1]
        ],
        segment: [
            {
                left: 'cnn1.left',
                top: adder.enabler.enablePin.getParentPoint().top,
                solder: true
            },
            adderCarryAnd.inputs[1]
        ]
    });

    self.addWire({
        cnn: [
            opDecoder.outputs[1],
            shrCarryAnd.inputs[1]
        ],
        segment: [
            {
                left: 'cnn1.left',
                top: shr.enabler.enablePin.getParentPoint().top,
                solder: true
            },
            shrCarryAnd.inputs[1]
        ]
    });

    self.addWire({
        cnn: [
            opDecoder.outputs[2],
            shlCarryAnd.inputs[1]
        ],
        segment: [
            {
                left: 'cnn1.left',
                top: shl.enabler.enablePin.getParentPoint().top,
                solder: true
            },
            shlCarryAnd.inputs[1]
        ]
    });

    self.addWire({
        cnn: [
            shr.shiftOutPin,
            shrCarryAnd.inputs[0]
        ],
        segment: [
            shr.shiftOutPin,
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            shl.shiftOutPin,
            shlCarryAnd.inputs[0]
        ],
        segment: [
            shl.shiftOutPin,
            {
                top: -10, relY: true,
                left: baseLeft + 100,
                yFirst: true
            },
            {
                left: 0, relX: true,
                top: 'cnn1.top'
            },
            shlCarryAnd.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            shrCarryAnd.output,
            shlCarryAnd.output,
            adderCarryAnd.output,
            self.carryOuPin
        ],
        segments: [
            [
                shrCarryAnd.output,
                {
                    left: self.width - 100,
                    top: 'cnn1.top'
                },
                'cnn3+'
            ],
            [
                shlCarryAnd.output,
                {
                    left: self.width - 100,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                adderCarryAnd.output,
                {
                    left: self.width - 100,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    var busCOptions = {
        parent: self,
        cnn: [
            cmp.enabler.outputs,
            adder.enabler.outputs,
            shr.enabler.outputs,
            shl.enabler.outputs,
            not.enabler.outputs,
            ander.enabler.outputs,
            orer.enabler.outputs,
            zero.inputs,
            self.outputs
        ],
        segments: [
            [
                cmp.enabler.outputs,
                {
                    left: self.width - 130,
                    top: self.height - 25,
                    align: 'left',
                    flip: true
                },
                self.outputs
            ]
        ]
    };

    [
        adder.enabler.outputs,
        shr.enabler.outputs,
        shl.enabler.outputs,
        not.enabler.outputs,
        ander.enabler.outputs,
        orer.enabler.outputs,
        zero.inputs
    ].forEach(function (outputs) {
        busCOptions.segments.push([
            outputs,
            {
                left: self.width - 130,
                top: 0, relY: true,
                align: 'x',
                flip: true,
                solder: true
            }
        ]);
    });

    var busC = new Bus(busCOptions);
    self.buses.push(busC);

    return busA.init().then(function () {
        return busB.init();
    }).then(function () {
        return busC.init();
    }).then(function () {
        return ALU.super_.prototype.init.call(self);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ALU.prototype.drawSelf = function (ctx) {
    var self = this;
    ALU.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 120 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ALU.prototype.getTitle = function () {
    var self = this;
    var title = Adder.super_.prototype.getTitle.call(self);
    return title + ':' + self.getHexValue();
};


module.exports = ALU;