'use strict';

var util     = require('util');
var Circuit  = require('./Circuit');
var Pin      = require('../conductor/Pin');
var AND      = require('../gate/AND');
var NOT      = require('../gate/NOT');
var OR       = require('../gate/OR');
var Clock    = require('./Clock');
var Stepper  = require('./Stepper');
var BusReg   = require('./BusReg');
var Register = require('./Register');
var Byte     = require('./Byte');
var ALU      = require('./ALU');
var Bus1     = require('./Bus1');
var Bus      = require('../conductor/Bus');
var Decoder  = require('./Decoder');
var Label    = require('../Label');

util.inherits(CPU, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CPU(options) {
    var self = this;
    options = options || {};

    options.title     = 'CPU';
    options.width     = 1000;
    options.height    = 1000;
    options.minScale  = 0.2;
    options.pinMargin = 0.15;

    CPU.super_.call(self, options);

    var pinCount = 8;
    self.data = [];
    for (var i = 0; i < pinCount; ++i) {
        var data = self.addPin(Pin.POS.BOTTOM, i, pinCount, 'd'+ i);
        self.data.push(data);
    }

    // RAM control pins
    self.sAddrPin = self.addPin(Pin.POS.RIGHT, 7, 8, 'sAddr');
    self.sRamPin  = self.addPin(Pin.POS.RIGHT, 6, 8, 'sRam');
    self.eRamPin  = self.addPin(Pin.POS.RIGHT, 5, 8, 'eRam');

    // I/O control pins
    self.sIOPin        = self.addPin(Pin.POS.RIGHT, 4, 8, 'sIO');
    self.eIOPin        = self.addPin(Pin.POS.RIGHT, 3, 8, 'eIO');
    self.ioPin         = self.addPin(Pin.POS.RIGHT, 2, 8, 'I/O');
    self.ioDataAddrPin = self.addPin(Pin.POS.RIGHT, 1, 8, 'Data/Addr');

    //self.debugPin = true;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.init = function () {
    var self = this;

    // circuits
    self.createRegisters();
    self.createALU();
    self.createControlSection();

    self.createEnableGates();
    self.createSetGates();
    self.createIRGates();
    self.createAluInstrGates();
    self.createLoadInstrGates();
    self.createStoreInstrGates();
    self.createDataInstrGates();
    self.createJmpRInstrGates();
    self.createJmpInstrGates();
    self.createJmpIfInstrGates();
    self.createClfInstrGates();
    self.createIOInstrGates();


    // base wires
    self.createStepperWires();
    self.createIRWires();

    // specific instruction wires
    self.createFetchInstrWires();
    self.createAluInstrWires();
    self.createLoadInstrWires();
    self.createStoreInstrWires();
    self.createDataInstrWires();
    self.createJmpRInstrWires();
    self.createJmpInstrWires();
    self.createJmpIfInstrWires();
    self.createClfInstrWires();
    self.createIOInstrWires();

    self.createEnableWires();
    self.createSetWires();
    self.createAluWires();


    // labels
    self.createLabels();

    // add stepper wires
    for (var i = 1; i <= 6; ++i) {
        self.addWire(self['stepWire' + i]);
    }

    // add IR wires
    for (var j = 0; j < self.ir.outputs.length; ++j) {
        self.addWire(self['irWire' + j]);
    }

    for (var k = 0; k < self.irDec.outputs.length; ++k) {
        self.addWire(self['andIRDecEWire' + k]);
    }

    var bus = self.createBus();

    return CPU.super_.prototype.init.call(self).then(function () {
        return bus.init();
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createIRWires = function () {
    var self = this;

    for (var i = 0; i < self.ir.outputs.length; ++i) {
        self['irWire' + i] = {
            cnn     : [self.ir.outputs[i]],
            segments: []
        };
    }

    self['irWire7'].cnn.push(self.notIR7.inputs[0]);
    self['irWire7'].segments.push([
        self.notIR7.inputs[0],
        {
            left: 527,
            top: 0, relY: true,
            solder: true
        }
    ]);

    var notWire = {
        cnn: [self.notIR7.output],
        segments: []
    };
    for (var k = 0; k < self.irDec.outputs.length; ++k) {
        self.addWire({
            cnn: [
                self.irDec.outputs[k],
                self.children['andIRDecE' + k].inputs[0]
            ],
            segments: [
                [
                    self.irDec.outputs[k],
                    self.children['andIRDecE' + k].inputs[0]
                ]
            ]
        });
        notWire.cnn.push(self.children['andIRDecE' + k].inputs[1]);
        if (k == 7) {
            notWire.segments.push([
                self.children['andIRDecE' + k].inputs[1],
                {
                    left: -3, relX: true,
                    top: 0, relY: true
                },
                'cnn0+'
            ]);
        } else {
            notWire.segments.push([
                self.children['andIRDecE' + k].inputs[1],
                {
                    left: -3, relX: true,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

        self['andIRDecEWire' + k] = {
            cnn     : [self.children['andIRDecE' + k].output],
            segments: []
        };
    }
    self.addWire(notWire);

    // IR 0 - 3 to register decoders
    for (var j = 0; j < 3; ++j) {
        var irWireX = self['irWire' + (6 - (2 - j))];
        irWireX.cnn.push(self.irDec.inputs[j]);
        irWireX.segments.push([
            'cnn0',
            {
                left: 527 + Bus.WIRE_STEP * ((2 - j) + 1),
                top: 0, relY: true
            },
            'cnn' + (irWireX.cnn.length - 1) + '+'
        ]);
    }

    var irWire3 = self['irWire3'];
    var irWire2 = self['irWire2'];
    var irWire1 = self['irWire1'];
    var irWire0 = self['irWire0'];

    irWire3.cnn.push(self.decERegA.inputs[1]);
    irWire3.segments.push([
        self.decERegA.inputs[1],
        {
            left: 527 + Bus.WIRE_STEP * 4,
            top: 0, relY: true,
            solder: true
        }
    ]);

    irWire2.cnn.push(self.decERegA.inputs[0]);
    irWire2.segments.push([
        self.decERegA.inputs[0],
        {
            left: 527 + Bus.WIRE_STEP * 5,
            top: 0, relY: true
        },
        'cnn0+'
    ]);

    irWire1.cnn.push(self.decERegB.inputs[1]);
    irWire1.cnn.push(self.decSRegB.inputs[1]);
    irWire1.segments.push([
        self.decERegB.inputs[1],
        self.decSRegB.inputs[1]
    ]);
    irWire1.segments.push([
        'cnn0',
        {
            left: 527 + Bus.WIRE_STEP * 6,
            top: 'cnn' + (irWire1.cnn.length - 1) + '.top',
            solder: true
        }
    ]);

    irWire0.cnn.push(self.decERegB.inputs[0]);
    irWire0.cnn.push(self.decSRegB.inputs[0]);
    irWire0.segments.push([
        self.decERegB.inputs[0],
        self.decSRegB.inputs[0]
    ]);
    irWire0.segments.push([
        'cnn0',
        {
            left: 527 + Bus.WIRE_STEP * 7,
            top: 'cnn' + (irWire0.cnn.length - 1) + '.top',
            solder: true
        }
    ]);

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpIfInstrWires = function () {
    var self = this;

    var jmpIfEWire = self['andIRDecEWire5'];
    jmpIfEWire.cnn.push(self.andJMPIFS4.inputs[0]);
    jmpIfEWire.cnn.push(self.andJMPIFS5.inputs[0]);
    jmpIfEWire.cnn.push(self.andJMPIFS6.inputs[1]);

    jmpIfEWire.segments.push([
        'cnn0',
        self.andJMPIFS6.inputs[1]
    ]);

    jmpIfEWire.segments.push([
        self.andJMPIFS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    jmpIfEWire.segments.push([
        self.andJMPIFS5.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.flags.outputs[0],
            self.andZ.inputs[0]
        ],
        segments: [
            [
                self.flags.outputs[0],
                {
                    left: 590,
                    top: self.height - 190,
                    yFirst: true
                },
                'cnn1+'
            ]
        ]
    });

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andJMPIFS4.inputs[1]);
    step4Wire.segments.push([
        self.andJMPIFS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andJMPIFS5.inputs[1]);
    step5Wire.segments.push([
        self.andJMPIFS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step6Wire = self['stepWire6'];
    step6Wire.cnn.push(self.andJMPIFS6.inputs[2]);
    step6Wire.segments.push([
        self.andJMPIFS6.inputs[2],
        'cnn0'
    ]);

    self.addWire({
        cnn: [
            self.andJMPIFS4.output,
            self.orEBus1.inputs[1],
            self.orEIar.inputs[0],
            self.orSMar.inputs[0],
            self.orSAcc.inputs[0]
        ],
        segments: [
            [
                self.andJMPIFS4.output,
                {
                    left: 18, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orEIar.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 18,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.orSMar.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 18,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.orSAcc.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 18,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andJMPIFS5.output,
            self.orSIar.inputs[1],
            self.orEAcc.inputs[0]
        ],
        segments: [
            [
                self.andJMPIFS5.output,
                {
                    left: 15, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orEAcc.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 15,
                    top: 0, relY: true,
                    solder: true
                }
            ]

        ]
    });

    self.addWire({
        cnn: [
            self.andJMPIFS6.output,
            self.orERam.inputs[0],
            self.orSIar.inputs[0]
        ],
        segments: [
            [
                self.andJMPIFS6.output,
                {
                    left: 6, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSIar.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 6,
                    top: 0, relY: true,
                    solder: true
                }
            ]

        ]
    });

    // flags to flag gates
    self.addWire({
        cnn: [
            self.flags.outputs[1],
            self.andE.inputs[0]
        ],
        segments: [
            [
                self.flags.outputs[1],
                {
                    left: 3, relX: true,
                    top: 0, relY: true
                },
                {
                    left: 587,
                    top: self.height - 193,
                    yFirst: true
                },
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.flags.outputs[2],
            self.andA.inputs[0]
        ],
        segments: [
            [
                self.flags.outputs[2],
                {
                    left: 6, relX: true,
                    top: 0, relY: true
                },
                {
                    left: 584,
                    top: self.height - 196,
                    yFirst: true
                },
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.flags.outputs[3],
            self.andC.inputs[0],
            self.alu.carryIn
        ],
        segments: [
            [
                self.flags.outputs[3],
                {
                    left: 9, relX: true,
                    top: 0, relY: true
                },
                {
                    left: 581,
                    top: self.height - 199,
                    yFirst: true
                },
                'cnn1+'
            ],
            [
                self.alu.carryIn,
                'cnn0*'
            ]
        ]
    });

    // flags to andFlag

    var irWire3 = self['irWire3'];
    var irWire2 = self['irWire2'];
    var irWire1 = self['irWire1'];
    var irWire0 = self['irWire0'];

    irWire3.cnn.push(self.andC.inputs[1]);
    irWire3.segments.push([
        self.andC.inputs[1],
        {
            left: 527 + Bus.WIRE_STEP * 4,
            top: 0, relY: true,
            solder: true
        }
    ]);



    irWire2.cnn.push(self.andA.inputs[1]);
    irWire2.segments.push([
        self.andA.inputs[1],
        {
            left: 527 + Bus.WIRE_STEP * 5,
            top: 0, relY: true,
            solder: true
        }
    ]);


    irWire1.cnn.push(self.andE.inputs[1]);
    irWire1.segments.push([
        self.andE.inputs[1],
        {
            left: 527 + Bus.WIRE_STEP * 6,
            top: 0, relY: true,
            solder: true
        }
    ]);

    irWire0.cnn.push(self.andZ.inputs[1]);
    irWire0.segments.push([
        self.andZ.inputs[1],
        {
            left: 527 + Bus.WIRE_STEP * 7,
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andC.output,
            self.orJmpIf.inputs[3]
        ],
        segments: [
            [
                self.andC.output,
                {
                    left: 5, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andA.output,
            self.orJmpIf.inputs[2]
        ],
        segments: [
            [
                self.andA.output,
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andE.output,
            self.orJmpIf.inputs[1]
        ],
        segments: [
            [
                self.andE.output,
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andZ.output,
            self.orJmpIf.inputs[0]
        ],
        segments: [
            [
                self.andZ.output,
                {
                    left: 5, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createAluWires = function () {
    var self = this;

    for (var i = 0; i < 8; ++i) {
        // tmp to bus1
        self.addWire({
            cnn: [
                self.tmp.outputs[i],
                self.bus1.inputs[i]
            ],
            segment: [
                self.tmp.outputs[i],
                self.bus1.inputs[i]
            ]
        });

        // bus1 to alu inputs b
        self.addWire({
            cnn: [
                self.bus1.outputs[i],
                self.alu.inputsB[i]
            ],
            segment: [
                self.bus1.outputs[i],

                {
                    left: 0, relX: true,
                    top: 25 - i * Bus.WIRE_STEP, relY: true

                },
                self.alu.inputsB[i]
            ]
        });

        // alu outputs to acc inputs
        var basePoint = self.alu.outputs[7].getParentPoint();
        self.addWire({
            cnn: [
                self.alu.outputs[i],
                self.acc.inputs[i]
            ],
            segment: [
                self.alu.outputs[i],
                {
                    left: basePoint.left - 30 + Bus.WIRE_STEP * i,
                    top: self.height - 150 + Bus.WIRE_STEP * i,
                    yFirst: true
                },
                'cnn1+'
            ]
        });
    }

    // alu to flags register
    self.addWire({
        cnn: [
            self.alu.carryOuPin,
            self.flags.inputs[3]
        ],
        segments: [
            [
                self.alu.carryOuPin,
                {
                    left: 280,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.alu.largerPin,
            self.flags.inputs[2]
        ],
        segments: [
            [
                self.alu.largerPin,
                {
                    left: 283,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });
    self.addWire({
        cnn: [
            self.alu.equalPin,
            self.flags.inputs[1]
        ],
        segments: [
            [
                self.alu.equalPin,
                {
                    left: 286,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.alu.zeroPin,
            self.flags.inputs[0]
        ],
        segments: [
            [
                self.alu.zeroPin,
                {
                    left: 289,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createLoadInstrGates = function () {
    var self = this;
    var scale = 0.25;

    self.andLDS4 = new AND({
        id   : 'andLDS4',
        title: 'LDS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : self.children['andIRDecE0'].top - 10,
        scale: scale
    });
    self.addChild(self.andLDS4);

    self.andLDS5 = new AND({
        id   : 'andLDS5',
        title: 'LDS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : self.children['andIRDecE0'].top - 10,
        scale: scale
    });
    self.addChild(self.andLDS5);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createStoreInstrGates = function () {
    var self = this;
    var scale = 0.25;

    self.andSTS4 = new AND({
        id   : 'andSTS4',
        title: 'STS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : self.children['andIRDecE1'].top - 10,
        scale: scale
    });
    self.addChild(self.andSTS4);

    self.andSTS5 = new AND({
        id   : 'andSTS5',
        title: 'STS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : self.children['andIRDecE1'].top - 10,
        scale: scale
    });
    self.addChild(self.andSTS5);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createDataInstrGates = function () {
    var self = this;

    var scale = 0.25;
    var dataEnable = self.children['andIRDecE2'];

    self.andDATAS4 = new AND({
        id   : 'andDATAS4',
        title: 'DATAS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : dataEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andDATAS4);

    self.andDATAS5 = new AND({
        id   : 'andDATAS5',
        title: 'DATAS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : dataEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andDATAS5);

    self.andDATAS6 = new AND({
        id   : 'andDATAS6',
        title: 'DATAS6',
        left : self.stepper.outputs[5].getParentPoint().left + 10,
        top  : 0, // to calc
        scale: scale
    });
    self.andDATAS6.top = dataEnable.output.getParentPoint().top - self.andDATAS6.inputs[0].getPoint().top * scale;
    self.addChild(self.andDATAS6);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpRInstrGates = function () {
    var self = this;
    var scale = 0.25;
    var jmpREnable = self.children['andIRDecE3'];

    self.andJMPRS4 = new AND({
        id   : 'andJMPRS4',
        title: 'JMPRS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : jmpREnable.top - 10,
        scale: scale
    });
    self.addChild(self.andJMPRS4);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createClfInstrGates = function () {
    var self = this;
    var scale = 0.25;
    var clfEnable = self.children['andIRDecE6'];

    self.andCLFS4 = new AND({
        id   : 'andCLFS4',
        title: 'CLFS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : clfEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andCLFS4);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpInstrGates = function () {
    var self = this;
    var scale = 0.25;
    var jmpEnable = self.children['andIRDecE4'];

    self.andJMPS4 = new AND({
        id   : 'andJMPS4',
        title: 'JMPS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : jmpEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andJMPS4);

    self.andJMPS5 = new AND({
        id   : 'andJMPS5',
        title: 'JMPS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : jmpEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andJMPS5);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createLoadInstrWires = function () {
    var self = this;

    var loadEWire = self['andIRDecEWire0'];
    loadEWire.cnn.push(self.andLDS4.inputs[0]);
    loadEWire.cnn.push(self.andLDS5.inputs[0]);

    loadEWire.segments.push([
        'cnn0',
        self.andLDS5.inputs[0]
    ]);

    loadEWire.segments.push([
        self.andLDS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andLDS4.inputs[1]);
    step4Wire.segments.push([
        self.andLDS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andLDS5.inputs[1]);
    step5Wire.segments.push([
        self.andLDS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andLDS4.output,
            self.orERegA.inputs[1],
            self.orSMar.inputs[4]
        ],
        segments: [
            [
                self.andLDS4.output,
                {
                    left: 3, relX: true,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                self.orERegA.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 3,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andLDS5.output,
            self.orERam.inputs[3],
            self.orSRegB.inputs[2]
        ],
        segments: [
            [
                self.andLDS5.output,
                {
                    left: 3, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSRegB.inputs[2],
                {
                    left: 'cnn0.left', offsetX: 3,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createStoreInstrWires = function () {
    var self = this;

    var storeEWire = self['andIRDecEWire1'];
    storeEWire.cnn.push(self.andSTS4.inputs[0]);
    storeEWire.cnn.push(self.andSTS5.inputs[0]);

    storeEWire.segments.push([
        'cnn0',
        self.andSTS5.inputs[0]
    ]);

    storeEWire.segments.push([
        self.andSTS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andSTS4.inputs[1]);
    step4Wire.segments.push([
        self.andSTS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andSTS5.inputs[1]);
    step5Wire.segments.push([
        self.andSTS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andSTS4.output,
            self.orERegA.inputs[0],
            self.orSMar.inputs[3]
        ],
        segments: [
            [
                self.andSTS4.output,
                {
                    left: 6, relX: true,
                    top: 0, relY: true
                },
                'cnn2+'
            ],
            [
                self.orERegA.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 6,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andSTS5.output,
            self.andSRam.inputs[0],
            self.orERegB.inputs[2]
        ],
        segments: [
            [
                self.andSTS5.output,
                {
                    left: 6, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orERegB.inputs[2],
                {
                    left: 'cnn0.left', offsetX: 6,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpInstrWires = function () {
    var self = this;

    var jmpEWire = self['andIRDecEWire4'];

    jmpEWire.cnn.push(self.andJMPS4.inputs[0]);
    jmpEWire.cnn.push(self.andJMPS5.inputs[0]);

    jmpEWire.segments.push([
        'cnn0',
        self.andJMPS5.inputs[0]
    ]);

    jmpEWire.segments.push([
        self.andJMPS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andJMPS4.inputs[1]);
    step4Wire.segments.push([
        self.andJMPS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andJMPS5.inputs[1]);
    step5Wire.segments.push([
        self.andJMPS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andJMPS4.output,
            self.orSMar.inputs[1],
            self.orEIar.inputs[1]
        ],
        segments: [
            [
                self.andJMPS4.output,
                {
                    left: 15, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orEIar.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 15,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andJMPS5.output,
            self.orERam.inputs[1],
            self.orSIar.inputs[2]
        ],
        segments: [
            [
                self.andJMPS5.output,
                {
                    left: 12, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSIar.inputs[2],
                {
                    left: 'cnn0.left', offsetX: 12,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createDataInstrWires = function () {
    var self = this;

    var dataEWire = self['andIRDecEWire2'];
    dataEWire.cnn.push(self.andDATAS4.inputs[0]);
    dataEWire.cnn.push(self.andDATAS5.inputs[0]);
    dataEWire.cnn.push(self.andDATAS6.inputs[0]);

    dataEWire.segments.push([
        'cnn0',
        self.andDATAS6.inputs[0]
    ]);

    dataEWire.segments.push([
        self.andDATAS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    dataEWire.segments.push([
        self.andDATAS5.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andDATAS4.inputs[1]);
    step4Wire.segments.push([
        self.andDATAS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andDATAS5.inputs[1]);
    step5Wire.segments.push([
        self.andDATAS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var step6Wire = self['stepWire6'];
    step6Wire.cnn.push(self.andDATAS6.inputs[1]);
    step6Wire.segments.push([
        self.andDATAS6.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andDATAS4.output,
            self.orEBus1.inputs[2],
            self.orEIar.inputs[2],
            self.orSMar.inputs[2],
            self.orSAcc.inputs[1]
        ],
        segments: [
            [
                self.andDATAS4.output,
                {
                    left: 9, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orEIar.inputs[2],
                {
                    left: 'cnn0.left', offsetX: 9,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.orSMar.inputs[2],
                {
                    left: 'cnn0.left', offsetX: 9,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.orSAcc.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 9,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andDATAS5.output,
            self.orERam.inputs[2],
            self.orSRegB.inputs[1]
        ],
        segments: [
            [
                self.andDATAS5.output,
                {
                    left: 9, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSRegB.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 9,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andDATAS6.output,
            self.orSIar.inputs[4],
            self.orEAcc.inputs[1]
        ],
        segments: [
            [
                self.andDATAS6.output,
                {
                    left: 3, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orEAcc.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 3,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpRInstrWires = function () {
    var self = this;
    var jmpREWire = self['andIRDecEWire3'];
    jmpREWire.cnn.push(self.andJMPRS4.inputs[0]);
    jmpREWire.segments.push([
        'cnn0',
        self.andJMPRS4.inputs[0]
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andJMPRS4.inputs[1]);
    step4Wire.segments.push([
        self.andJMPRS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andJMPRS4.output,
            self.orSIar.inputs[3],
            self.orERegB.inputs[1]
        ],
        segments: [
            [
                self.andJMPRS4.output,
                {
                    left: 12, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orERegB.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 12,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createIOInstrWires = function () {
    var self = this;
    var ioEWire = self['andIRDecEWire7'];

    ioEWire.cnn.push(self.andIOS4.inputs[1]);
    ioEWire.cnn.push(self.andIOS5.inputs[1]);
    ioEWire.segments.push([
        'cnn0',
        self.andIOS5.inputs[1]
    ]);
    ioEWire.segments.push([
        self.andIOS4.inputs[1],
        {
            left: -5, relX: true,
            top: 'cnn0.top',
            solder: true
        }
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andIOS4.inputs[2]);
    step4Wire.segments.push([
        self.andIOS4.inputs[2],
        'cnn0'
    ]);

    var step5Wire = self['stepWire5'];
    step5Wire.cnn.push(self.andIOS5.inputs[2]);
    step5Wire.segments.push([
        self.andIOS5.inputs[2],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.notIR3.output,
            self.andIOS5.inputs[0]
        ],
        segments: [
            [
                self.notIR3.output,
                'cnn1+'
            ]
        ]
    });

    var irWire3 = self['irWire3'];
    irWire3.cnn.push(self.notIR3.inputs[0]);
    irWire3.segments.push([
        'cnn0',
        {
            left: 527 + Bus.WIRE_STEP * 4,
            top: 'cnn' + (irWire3.cnn.length - 1) +'.top'
        },
        self.notIR3.inputs[0]
    ]);
    irWire3.cnn.push(self.andIOS4.inputs[0]);
    irWire3.segments.push([
        self.andIOS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn' + (irWire3.cnn.length - 2) +'.top',
            solder: true
        }
    ]);

    irWire3.cnn.push(self.ioPin);
    irWire3.segments.push([
        {
            left: 527 + Bus.WIRE_STEP * 4,
            top: self.height - 300,
            solder: true
        },
        {
            left: self.width - 6,
            top: 0, relY: true
        },
        'cnn' + (irWire3.cnn.length - 1) + '+'
    ]);

    var irWire2 = self['irWire2'];
    irWire2.cnn.push(self.ioDataAddrPin);
    irWire2.segments.push([
        {
            left: 527 + Bus.WIRE_STEP * 5,
            top: self.height - 130,
            solder: true
        },
        {
            left: self.width - 6,
            top: 0, relY: true
        },
        'cnn' + (irWire2.cnn.length - 1) + '+'
    ]);

    self.addWire({
        cnn: [
            self.andIOS4.output,
            self.orERegB.inputs[0],
            self.andSIO.inputs[0]
        ],
        segments: [
            [
                self.andIOS4.output,
                {
                    left: 24, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.andSIO.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 24,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andIOS5.output,
            self.andEIOClkE.inputs[0],
            self.orSRegB.inputs[0]
        ],
        segments: [
            [
                self.andIOS5.output,
                {
                    left: 18, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSRegB.inputs[0],
                {
                    left: 'cnn0.left', offsetX: 18,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andSIO.output,
            self.sIOPin
        ],
        segments: [
            [
                self.andSIO.output,
                {
                    left: self.width - 6,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    });


    self.addWire({
        cnn: [
            self.andEIOClkE.output,
            self.eIOPin
        ],
        segments: [
            [
                self.andEIOClkE.output,
                {
                    left: 363,
                    top: self.height - 142
                },
                {
                    left: self.width - 9,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        ]
    })
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createClfInstrWires = function () {
    var self = this;
    var clfEWire = self['andIRDecEWire6'];
    clfEWire.cnn.push(self.andCLFS4.inputs[0]);
    clfEWire.segments.push([
        'cnn0',
        self.andCLFS4.inputs[0]
    ]);

    var step4Wire = self['stepWire4'];
    step4Wire.cnn.push(self.andCLFS4.inputs[1]);
    step4Wire.segments.push([
        self.andCLFS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    self.addWire({
        cnn: [
            self.andCLFS4.output,
            self.orEBus1.inputs[0],
            self.orSFlags.inputs[1]
        ],
        segments: [
            [
                self.andCLFS4.output,
                {
                    left: 21, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ],
            [
                self.orSFlags.inputs[1],
                {
                    left: 'cnn0.left', offsetX: 21,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createAluInstrGates = function () {
    var self = this;

    var scale = 0.25;
    var stepGatesTop = 405;

    self.andALS4 = new AND({
        id   : 'andALS4',
        title: 'ALS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : stepGatesTop,
        scale: scale
    });
    self.addChild(self.andALS4);

    self.andALS5 = new AND({
        id   : 'andALS5',
        title: 'ALS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : stepGatesTop,
        scale: scale
    });
    self.addChild(self.andALS5);

    self.andALS6 = new AND({
        id        : 'andALS6',
        title     : 'ALS6',
        left      : self.stepper.outputs[5].getParentPoint().left + 10,
        top       : stepGatesTop + 10,
        inputCount: 3,
        scale     : scale
    });
    self.addChild(self.andALS6);


    var baseTop = self.height - 157;
    var baseLeft = 485;
    var step = 15;
    for (var i = 0; i < 3; ++i) {
        var andOp = new AND({
            id        : 'andOp' + i,
            left      : baseLeft,
            title     : 'OP' + i,
            top       : baseTop - step * i,
            flip      : true,
            inputCount: 3,
            scale     : scale
        });
        self.addChild(andOp);
    }

    self.andOpCMP = new AND({
        id        : 'andOpCMP',
        title     : 'CMP',
        left      : 570,
        top       : self.children['andOp1'].inputs[0].getParentPoint().top - 25 * scale,
        inputCount: 3,
        scale     : scale
    });
    self.addChild(self.andOpCMP);

    self.notOpCMP = new NOT({
        id   : 'notOpCMP',
        title: 'NCMP',
        left : self.andOpCMP.left + 30,
        top  : self.andOpCMP.top,
        scale: scale
    });
    self.addChild(self.notOpCMP);

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createJmpIfInstrGates = function () {
    var self = this;

    var scale    = 0.25;
    var jmpIfEnable = self.children['andIRDecE5'];

    self.andJMPIFS4 = new AND({
        id   : 'andJMPIFS4',
        title: 'JMPIFS4',
        left : self.stepper.outputs[3].getParentPoint().left + 10,
        top  : jmpIfEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andJMPIFS4);

    self.andJMPIFS5 = new AND({
        id   : 'andJMPIFS5',
        title: 'JMPIFS5',
        left : self.stepper.outputs[4].getParentPoint().left + 10,
        top  : jmpIfEnable.top - 10,
        scale: scale
    });
    self.addChild(self.andJMPIFS5);

    self.andJMPIFS6 = new AND({
        id   : 'andJMPIFS6',
        title: 'JMPIFS6',
        left : self.stepper.outputs[5].getParentPoint().left + 10,
        top  : jmpIfEnable.top, // to calc
        scale: scale,
        inputCount: 3
    });
    self.addChild(self.andJMPIFS6);

    var flagTop  = self.height - 260;
    var flagStep = 17;

    self.andC = new AND({
        id   :'andC',
        title: 'C',
        left : 600,
        top  : flagTop,
        scale: scale
    });
    self.addChild(self.andC);

    self.andA = new AND({
        id   :'andA',
        title: 'A',
        left : 600,
        top  : flagTop + flagStep,
        scale: scale
    });
    self.addChild(self.andA);

    self.andE = new AND({
        id   :'andE',
        title: 'E',
        left : 600,
        top  : flagTop + flagStep * 2,
        scale: scale
    });
    self.addChild(self.andE);

    self.andZ = new AND({
        id   :'andZ',
        title: 'Z',
        left : 600,
        top  : flagTop + flagStep * 3,
        scale: scale
    });
    self.addChild(self.andZ);

    self.orJmpIf = new OR({
        id: 'orJmpIf',
        title: 'JMPIF',
        left: 650,
        top: flagTop + (flagStep * 3  + 50 * scale) / 2 - 25 * scale,
        scale: scale,
        inputCount: 4
    });
    self.addChild(self.orJmpIf);

    self.addWire({
        cnn: [
            self.orJmpIf.output,
            self.andJMPIFS6.inputs[0]
        ],
        segments: [
            [
                self.orJmpIf.output,
                {
                    left: 'cnn1.left', offsetX: -5,
                    top: 'cnn1.top'
                },
                self.andJMPIFS6.inputs[0]
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createIOInstrGates = function () {
    var self = this;

    var scale = 0.25;
    var ioEnable = self.children['andIRDecE7'];

    self.andIOS4 = new AND({
        id: 'andIOS4',
        title: 'IOS4',
        left: self.stepper.outputs[3].getParentPoint().left + 10,
        top: ioEnable.top - 10,
        scale: scale,
        inputCount: 3
    });
    self.addChild(self.andIOS4);

    self.andIOS5 = new AND({
        id: 'andIOS5',
        title: 'IOS5',
        left: self.stepper.outputs[4].getParentPoint().left + 10,
        top: ioEnable.top,
        scale: scale,
        inputCount: 3
    });
    self.addChild(self.andIOS5);

    self.notIR3 = new NOT({
        id   : 'notIR3',
        title: 'IR3',
        left : self.andIOS4.left + 20,
        top  : self.andIOS4.top + 32,
        scale: scale
    });
    self.addChild(self.notIR3);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createIRGates = function () {
    var self = this;

    var scale = 0.25;

    self.irDec = new Decoder({
        id        : 'irDec',
        title     : 'IRDec',
        inputCount: 3,
        left      : 545,
        top       : 443,
        height    : 700,
        pinMargin : {
            left: 0.44,
            right: 0.08
        },
        scale     : scale,
        reversed : true
    });
    self.addChild(self.irDec);
    var outPins     = ['LD', 'ST', 'DATA', 'JMPR', 'JMP', 'JMPIF', 'CLF', 'I/O'];
    var enableGates = ['ELD', 'EST', 'EDATA', 'EJMPR', 'EJMP', 'EJMPIF', 'ECLF', 'EIO'];

    for (var j = 0; j < self.irDec.outputs.length; ++j) {
        self.irDec.outputs[j].title = outPins[j];
        var andIRDecE = new AND({
            id: 'andIRDecE' + j,
            title: enableGates[j],
            left: self.irDec.left + 70,
            top: 0, // to calc
            scale: scale
        });
        andIRDecE.top = self.irDec.outputs[j].getParentPoint().top - andIRDecE.inputs[0].getPoint().top * scale;
        self.addChild(andIRDecE);
    }

    self.notIR7 = new NOT({
        id   : 'notIR7',
        title: 'IR7',
        left : self.irDec.left,
        top  : self.irDec.top - 18,
        scale: scale
    });
    self.addChild(self.notIR7);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createLabels = function () {
    var self = this;

    var enableLabelLeft = 400;

    var orEBus1Label = new Label({
        left    : enableLabelLeft,
        top     : self.orEBus1.top - 7,
        title   : 'Bus 1',
        fontSize: 10
    });
    self.addChild(orEBus1Label);

    var andERamLabel = new Label({
        left    : enableLabelLeft,
        top     : self.andERam.top - 7,
        title   : 'RAM',
        fontSize: 10
    });
    self.addChild(andERamLabel);

    var andEAccLabel = new Label({
        left    : enableLabelLeft,
        top     : self.andEAcc.top - 7,
        title   : 'ACC',
        fontSize: 10
    });
    self.addChild(andEAccLabel);

    var orERegBLabel = new Label({
        left    : self.orERegB.left - 30,
        top     : self.orERegB.top - 9,
        title   : 'Reg B',
        fontSize: 10
    });
    self.addChild(orERegBLabel);

    var orERegALabel = new Label({
        left    : self.orERegA.left - 30,
        top     : self.orERegA.top - 9,
        title   : 'Reg A',
        fontSize: 10
    });
    self.addChild(orERegALabel);

    var andEIarLabel = new Label({
        left    : enableLabelLeft,
        top     : self.andEIar.top - 7,
        title   : 'IAR',
        fontSize: 10
    });
    self.addChild(andEIarLabel);

    var andEIOClkELabel = new Label({
        left    : enableLabelLeft,
        top     : self.andEIOClkE.top - 7,
        title   : 'I/O',
        fontSize: 10
    });
    self.addChild(andEIOClkELabel);

    var orSRegBLabel = new Label({
        left    : self.orSRegB.left + 12,
        top     : self.orSRegB.top - 9,
        title   : 'Reg B',
        fontSize: 10
    });
    self.addChild(orSRegBLabel);

    var andSIrLabel = new Label({
        left    : self.andSIr.left + 20,
        top     : self.andSIr.top - 9,
        title   : 'IR',
        fontSize: 10
    });
    self.addChild(andSIrLabel);

    var andSMarLabel = new Label({
        left    : self.andSMar.left + 20,
        top     : self.andSMar.top - 9,
        title   : 'MAR',
        fontSize: 10
    });
    self.addChild(andSMarLabel);

    var andSIarLabel = new Label({
        left    : self.andSIar.left + 20,
        top     : self.andSIar.top - 9,
        title   : 'IAR',
        fontSize: 10
    });
    self.addChild(andSIarLabel);

    var andSAccLabel = new Label({
        left    : self.andSAcc.left + 20,
        top     : self.andSAcc.top - 9,
        title   : 'ACC',
        fontSize: 10
    });
    self.addChild(andSAccLabel);

    var andSRamLabel = new Label({
        left    : self.andSRam.left + 20,
        top     : self.andSRam.top - 9,
        title   : 'RAM',
        fontSize: 10
    });
    self.addChild(andSRamLabel);

    var andSTmpLabel = new Label({
        left    : self.andSTmp.left + 20,
        top     : self.andSTmp.top - 9,
        title   : 'TMP',
        fontSize: 10
    });
    self.addChild(andSTmpLabel);

    var andSFlagsLabel = new Label({
        left    : self.andSFlags.left + 20,
        top     : self.andSFlags.top - 9,
        title   : 'Flags',
        fontSize: 10
    });
    self.addChild(andSFlagsLabel);

    var andSIOLabel = new Label({
        left    : self.andSIO.left + 20,
        top     : self.andSIO.top - 9,
        title   : 'I/O',
        fontSize: 10
    });
    self.addChild(andSIOLabel);

};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createSetGates = function () {
    var self = this;

    var baseTop   = 197;
    var baseLeft  = self.width - 110;
    var step      = 25;
    var scale     = 0.25;
    var regOffset = 160;

    // IR
    self.andSIr = new AND({
        id   : 'andSIr',
        title: 'sIR',
        left : baseLeft,
        top  : baseTop,
        scale: scale
    });
    self.addChild(self.andSIr);

    // MAR
    self.andSMar = new AND({
        id   : 'andSMar',
        title: 'sMAR',
        left : baseLeft,
        top  : baseTop + step,
        scale: scale
    });
    self.addChild(self.andSMar);

    self.orSMar = new OR({
        id        : 'orSMar',
        title     : 'MAR',
        left      : baseLeft - 55,
        top       : self.andSMar.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        inputCount: 6,
        pinMargin : 0.1
    });
    self.addChild(self.orSMar);

    // IAR
    self.andSIar = new AND({
        id   : 'andSIar',
        title: 'sIAR',
        left : baseLeft,
        top  : baseTop + step * 2,
        scale: scale
    });
    self.addChild(self.andSIar);

    self.orSIar = new OR({
        id        : 'orSIar',
        title     : 'IAR',
        left      : baseLeft - 55,
        top       : self.andSIar.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        pinMargin : 0.1,
        inputCount: 6
    });
    self.addChild(self.orSIar);

    // ACC
    self.andSAcc = new AND({
        id   : 'andSAcc',
        title: 'sACC',
        left : baseLeft,
        top  : baseTop + step * 3,
        scale: scale
    });
    self.addChild(self.andSAcc);

    self.orSAcc = new OR({
        id        : 'orSAcc',
        title     : 'ACC',
        left      : baseLeft - 55,
        top       : self.andSAcc.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        inputCount: 4
    });
    self.addChild(self.orSAcc);

    // RAM
    self.andSRam = new AND({
        id   : 'andSRam',
        title: 'sRAM',
        left : baseLeft,
        top  : baseTop + step * 4,
        scale: scale
    });
    self.addChild(self.andSRam);

    // TMP
    self.andSTmp = new AND({
        id   : 'andSTmp',
        title: 'sTMP',
        left : baseLeft,
        top  : baseTop + step * 5,
        scale: scale
    });
    self.addChild(self.andSTmp);

    // Flags
    self.andSFlags = new AND({
        id   : 'andSFlags',
        title: 'sFlags',
        left :  baseLeft,
        top  :  baseTop + step * 6,
        scale:  scale
    });
    self.addChild(self.andSFlags);

    self.orSFlags = new OR({
        id   : 'orSFlags',
        title: 'Flags',
        left : baseLeft - 55,
        top  : self.andSFlags.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale: scale
    });
    self.addChild(self.orSFlags);


    // andSIO
    self.andSIO = new AND({
        id   : 'andSIO',
        title: 'sIO',
        left :  baseLeft,
        top  :  baseTop + step * 7,
        scale:  scale
    });
    self.addChild(self.andSIO);

    self.orSRegB = new OR({
        id        : 'orSRegB',
        title     : 'RegB',
        left      : baseLeft - 55,
        top       : self.orSFlags.top + step * 2,
        scale     : scale,
        inputCount: 4
    });
    self.addChild(self.orSRegB);

    for (var i = 0; i < 4; ++i) {
        var ri = 3 - i;
        var andSRB = new AND({
            id        : 'andSRB' + i,
            title     : 'sRB' + i,
            left      : baseLeft,
            top       : 445 + step * (3 + ri) + 70,
            scale     : scale,
            inputCount: 3
        });
        self.addChild(andSRB);
    }

    // dec set RegB
    self.decSRegB = new Decoder({
        id        : 'decSRegB',
        title     : 'SRegB',
        left      : baseLeft - 68,
        top       : self.children['andSRB2'].top + 2,
        inputCount: 2,
        scale     : 0.2,
        pinMargin : {
            right: 0.25,
            left: 0.4
        }
    });
    self.addChild(self.decSRegB);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createFetchInstrWires = function () {
    var self = this;

    // step 1 - step3 are the same for all instruction types

    // step 1:
    //   MAR = IAR
    //   ACC = Bus1 (1) + IAR

    var stepWire1 = self['stepWire1'];

    stepWire1.cnn.push(self.orEBus1.inputs[3]);
    stepWire1.cnn.push(self.orEIar.inputs[3]);
    stepWire1.cnn.push(self.orSMar.inputs[5]);
    stepWire1.cnn.push(self.orSAcc.inputs[3]);

    // enable bus 1
    stepWire1.segments.push([
        self.orEBus1.inputs[3],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    // and enable IAR (last Step1 connection)
    stepWire1.segments.push([
        self.orEIar.inputs[3],
        {
            left: 'cnn0.left',
            top: 0, relY: true
        },
        'cnn0'
    ]);

    // set the current value of IAR to MAR
    stepWire1.segments.push([
        self.orSMar.inputs[5],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    // save the ALU result to ACC = IAR + Bus1
    stepWire1.segments.push([
        self.orSAcc.inputs[3],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    // step 2: IR = RAM

    var stepWire2 = self['stepWire2'];

    stepWire2.cnn.push(self.andSIr.inputs[0]);
    stepWire2.cnn.push(self.orERam.inputs[4]);

    // enable RAM to bus
    // last step2 cnn: orERam
    stepWire2.segments.push([
        self.orERam.inputs[4],
        {
            left: 'cnn0.left',
            top: 0, relY: true
        },
        'cnn0'
    ]);

    // save the value from RAM to IR
    stepWire2.segments.push([
        self.andSIr.inputs[0],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    // step 3: IAR = ACC

    var stepWire3 = self['stepWire3'];

    stepWire3.cnn.push(self.orEAcc.inputs[3]);
    stepWire3.cnn.push(self.orSIar.inputs[5]);

    // set IAR from ACC
    stepWire3.segments.push([
        self.orSIar.inputs[5],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    // enable ACC to bus
    stepWire3.segments.push([
        self.orEAcc.inputs[3],
        {
            left: 'cnn0.left',
            top: 0, relY: true
        },
        'cnn0'
    ]);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createAluInstrWires = function () {
    var self = this;

    var stepWire4 = self['stepWire4'];
    var stepWire5 = self['stepWire5'];
    var stepWire6 = self['stepWire6'];

    // step 4
    stepWire4.cnn.push(self.andALS4.inputs[1]);

    // andALS4
    stepWire4.segments.push([
        self.andALS4.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
        //'cnn0'
    ]);

    // step 5
    stepWire5.cnn.push(self.andALS5.inputs[1]);

    // andALS5
    stepWire5.segments.push([
        self.andALS5.inputs[1],
        {
            left: 'cnn0.left',
            top: 0, relY: true,
            solder: true
        }
    ]);

    var baseCnnIndex = stepWire5.cnn.length;
    for (var i = 0; i < 3; ++i) {

        stepWire5.cnn.push(self.children['andOp' + i].inputs[2]);
        if (i == 0) {
            stepWire5.segments.push([
                self.children['andOp' + i].inputs[2],
                {
                    left: 5, relX: true,
                    top : 'cnn' + (baseCnnIndex + 2) + '.top'
                },
                {
                    left: 'cnn0.left',
                    top: 0, relY: true
                },
                'cnn0'
            ]);

        } else {
            stepWire5.segments.push([
                self.children['andOp' + i].inputs[2],
                {
                    left: 5, relX: true,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }
    }

    // step 6
    stepWire6.cnn.push(self.andALS6.inputs[2]);

    // andALS6
    stepWire6.segments.push([
        self.andALS6.inputs[2],
        {
            left  : 'cnn0.left',
            top   : 0, relY: true,
            solder: true
        }
    ]);

    var irWire7 = self['irWire7'];

    // step 7
    irWire7.cnn.push(self.andALS6.inputs[1]);
    irWire7.segments.push([
        self.ir.outputs[7],
        {
            left: 527,
            top: 0, relY: true
        },
        'cnn' + (irWire7.cnn.length - 1) + '+'
    ]);

    irWire7.cnn.push(self.andALS4.inputs[0]);
    irWire7.segments.push([
        self.andALS4.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn' + (irWire7.cnn.length - 2) + '.top',
            solder: true
        }
    ]);

    irWire7.cnn.push(self.andALS5.inputs[0]);
    irWire7.segments.push([
        self.andALS5.inputs[0],
        {
            left: 0, relX: true,
            top: 'cnn' + (irWire7.cnn.length - 3) + '.top',
            solder: true
        }
    ]);



    for (var j = 0; j < 3; ++j) {
        // step 7
        irWire7.cnn.push(self.children['andOp' + j].inputs[1]);
        irWire7.segments.push([
            self.children['andOp' + j].inputs[1],
            {
                left: 527,
                top: 0, relY: true,
                solder: true
            }
        ]);

        var irWireX = self['irWire' + (6 - (2 - j))];
        irWireX.cnn.push(self.children['andOp' + j].inputs[0]);
        irWireX.cnn.push(self.andOpCMP.inputs[j]);
        irWireX.segments.push([
            self.children['andOp' + j].inputs[0],
            self.andOpCMP.inputs[j]
        ]);
        irWireX.segments.push([
            self.children['andOp' + j].inputs[0],
            {
                left: 527 + (3 - j) * Bus.WIRE_STEP,
                top: 0, relY: true,
                solder: true
            }
        ]);

        // andOp to alu op
        self.addWire({
            cnn: [
                self.children['andOp' + j].output,
                self.alu.op[j]
            ],
            segments: [
                [
                    self.children['andOp' + j].output,
                    {
                        left: 260 + Bus.WIRE_STEP * j,
                        top : 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });
    }
    self.addWire({
        cnn: [
            self.andOpCMP.output,
            self.notOpCMP.inputs[0]
        ],
        segments: [
            [
                self.andOpCMP.output,
                self.notOpCMP.inputs[0]
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.notOpCMP.output,
            self.andALS6.inputs[0]
        ],
        segments: [
            [
                self.notOpCMP.output,
                {
                    left: 'cnn1.left', offsetX: -8,
                    top: 'cnn1.top'
                },
                self.andALS6.inputs[0]
            ]
        ]
    });



    // RegA to ACC
    self.addWire({
        cnn: [
            self.andALS5.output,
            self.orSAcc.inputs[2],
            self.orERegA.inputs[2],
            self.orSFlags.inputs[0]
        ],
        segments: [
            [
                self.andALS5.output,
                'cnn1+'
            ],
            [
                self.orERegA.inputs[2],
                {
                    left: 'cnn0.left',
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.orSFlags.inputs[0],
                {
                    left: 'cnn0.left',
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    });

    self.addWire({
        cnn: [
            self.orEAcc.inputs[2],
            self.orSRegB.inputs[3],
            self.andALS6.output
        ],
        segments: [
            [
                self.orEAcc.inputs[2],
                self.andALS6.output
            ],
            [
                self.orSRegB.inputs[3],
                {
                    left  : 'cnn2.left',
                    top   : 0, relY: true,
                    solder: true
                }

            ]
        ]
    });

    self.addWire({
        cnn: [
            self.andALS4.output,
            self.orERegB.inputs[3],
            self.andSTmp.inputs[0]
        ],
        segments: [
            [
                self.andALS4.output,
                'cnn2+'
            ],
            [
                self.orERegB.inputs[3],
                {
                    left: 'cnn0.left',
                    top: 0, relY: true,
                    solder: true
                }

            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createEnableGates = function () {
    var self = this;

    var baseTop  = 232;
    var baseLeft = 430;
    var step     = 25;
    var scale    = 0.25;

    // bus1
    self.orEBus1 = new OR({
        id        :'orEBus1',
        title     :'Bus1',
        left      : baseLeft + 60,
        top       : baseTop - step + 3,
        scale     : scale,
        inputCount: 4,
        flip      : true
    });
    self.addChild(self.orEBus1);

    // ram
    self.andERam = new AND({
        id   : 'andERam',
        title: 'eRAM',
        left : baseLeft,
        top  : baseTop,
        scale: scale,
        flip : true
    });
    self.addChild(self.andERam);

    self.orERam = new OR({
        id        : 'orERam',
        title     : 'RAM',
        left      : baseLeft + 60,
        top       : self.andERam.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        inputCount: 5,
        pinMargin : 0.1,
        flip      : true
    });
    self.addChild(self.orERam);

    // acc
    self.andEAcc = new AND({
        id   : 'andEAcc',
        title: 'eACC',
        left : baseLeft,
        top  : baseTop + step,
        scale: scale,
        flip : true
    });
    self.addChild(self.andEAcc);

    self.orEAcc = new OR({
        id        : 'orEAcc',
        title     : 'ACC',
        left      : baseLeft + 60,
        top       : self.andEAcc.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        inputCount: 4,
        flip      : true
    });
    self.addChild(self.orEAcc);

    // iar
    self.andEIar = new AND({
        id   : 'andEIar',
        title: 'eIAR',
        left : baseLeft,
        top  : baseTop + step * 2,
        scale: scale,
        flip : true
    });
    self.addChild(self.andEIar);

    self.orEIar = new OR({
        id        : 'orEIar',
        title     :'IAR',
        left      : baseLeft + 60,
        top       : self.andEIar.inputs[0].getParentPoint().top - 50 / 2 * scale,
        scale     : scale,
        inputCount: 4,
        flip      : true
    });
    self.addChild(self.orEIar);

    // I/O Clk E
    self.andEIOClkE = new AND({
        id   : 'andEIOClkE',
        title: 'eIO',
        left : baseLeft,
        top  : baseTop + step * 3,
        scale: scale,
        flip : true
    });
    self.addChild(self.andEIOClkE);

    // regB
    self.orERegB = new OR({
        id        : 'orERegB',
        title     : 'RegB',
        left      : baseLeft + 60,
        top       : self.orEIar.top + step * 2,
        scale     : scale,
        inputCount: 4,
        flip      : true
    });
    self.addChild(self.orERegB);

    // regA
    self.orERegA = new OR({
        id        :'orERegA',
        title     :'RegA',
        left      : baseLeft + 60,
        top       : self.orERegB.top + step,
        scale     : scale,
        inputCount: 3,
        flip      : true
    });
    self.addChild(self.orERegA);

    for (var i = 0; i < 4; ++i) {
        var ri = 3 - i;

        var andERB = new AND({
            id        : 'andERB' + i,
            title     : 'eRB' + i,
            left      : baseLeft,
            top       : 445 + step * (3 + ri) + 70,
            scale     : scale,
            flip      : true,
            inputCount: 3
        });
        self.addChild(andERB);

        var andERA = new AND({
            id        : 'andERA' + i,
            title     : 'eRA' + i,
            left      : baseLeft,
            top       : 445 + step * (7 + ri) + 70,
            scale     : scale,
            flip      : true,
            inputCount: 3
        });
        self.addChild(andERA);

        var orER = new OR({
            id   : 'orER' + i,
            title: 'eR' + i,
            left : baseLeft - 40,
            top  : andERB.top,
            scale: scale,
            flip : true
        });
        orER.top = andERB.output.getParentPoint().top - orER.inputs[1].getPoint().top * scale;
        self.addChild(orER);
    }

    // dec RegB
    self.decERegB = new Decoder({
        id        : 'decERegB',
        title     : 'ERegB',
        left      : baseLeft + 55,
        top       : self.children['andERB2'].top + 2,
        inputCount: 2,
        scale     : 0.2,
        flip      : true,
        pinMargin : {
            left: 0.25,
            right: 0.4
        }
    });
    self.addChild(self.decERegB);

    // dec RegB
    self.decERegA = new Decoder({
        id        : 'decERegA',
        title     : 'ERegA',
        left      : baseLeft + 55,
        //top       : baseTop + step * 8 + 73 ,
        top       : self.children['andERA2'].top + 2,
        inputCount: 2,
        scale     : 0.2,
        flip      : true,
        pinMargin : {
            left: 0.25,
            right: 0.4
        }
    });
    self.addChild(self.decERegA);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createBus = function () {
    var self = this;
    var busOptions = {
        parent: self,
        title: 'cpuBus',
        cnn: [
            self.data,        // 0
            self.alu.inputsA, // 1
            self.tmp.inputs,  // 2
            self.acc.outputs, // 3
            self.iar.data,    // 4
            self.ir.inputs,   // 5
            self.children['r0'].data,     // 6
            self.children['r1'].data,     // 7
            self.children['r2'].data,     // 8
            self.children['r3'].data      // 9
        ],
        segments: [
            [
                self.data,
                {
                    left: self.width - 20,
                    top: self.height - 20,
                    yFirst: true,
                    align: 'left',
                    flip: true
                },
                {
                    top: self.height - 50,
                    left: self.width - 20,
                    align: 'right'
                },
                {
                    top: self.height - 50,
                    left: 20,
                    align: 'right'
                },
                {
                    top: 25,
                    left: 20,
                    align: 'left',
                    flip: true
                },
                {
                    top: 25,
                    left: self.width - 200,
                    align: 'right',
                    flip: true
                },
                'cnn9+' // self.children['r3'].data
            ],
            [
                self.alu.inputsA,
                {
                    left : 20,
                    top  : 0, relY: true,
                    align: 'x',
                    flip: true,
                    solder: true
                }
            ],
            [
                self.tmp.inputs,
                {
                    left: 20,
                    top: 0, relY: true,
                    align: 'x',
                    flip: true,
                    solder: true
                }
            ],
            [
                self.acc.outputs,
                {
                    left  : 200,
                    top   : self.height - 50,
                    align : 'right',
                    solder: true
                }
            ],
            [
                self.iar.data,
                {
                    left  : 430,
                    top   : self.height - 50,
                    align : 'right',
                    solder: true
                }
            ],
            [
                self.ir.inputs,
                {
                    left  : 470,
                    top   : self.height - 50,
                    align : 'left',
                    solder: true
                }
            ],
            [
                self.children['r0'].data,
                {
                    left: self.children['r0'].left + 55,
                    top: 25,
                    align: 'right',
                    flip: true,
                    solder: true
                }

            ],
            [
                self.children['r1'].data,
                {
                    left: self.children['r1'].left + 55,
                    top: 25,
                    align: 'right',
                    flip: true,
                    solder: true
                }

            ],
            [
                self.children['r2'].data,
                {
                    left: self.children['r2'].left + 55,
                    top: 25,
                    align: 'right',
                    flip: true,
                    solder: true
                }

            ]
        ]
    };

    var bus = new Bus(busOptions);
    self.buses.push(bus);
    return bus
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createALU = function () {
    var self = this;
    var alu = self.alu = new ALU({
        id   : 'alu',
        left : 60,
        top  : 285,
        scale: 0.3
    });
    self.addChild(alu);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createRegisters = function () {
    var self = this;
    var scale = 0.1;

    // GPR r0-r3
    for (var i = 0; i < 4; ++i) {
        var reg = new BusReg({
            id   : 'r' + i,
            title: 'R' + i,
            left : 400 + 80 * i,
            top  : 45,
            scale: scale
        });
        self.addChild(reg);
    }

    // tmp
    self.tmp = new Byte({
        id   : 'tmp',
        title: 'TMP',
        left : 80,
        top  : 45,
        scale: scale,
        width: 250
    });
    self.addChild(self.tmp);

    // bus1
    self.bus1 = new Bus1({
        id   : 'bus1',
        left : 160,
        top  : 200,
        scale: 0.1
    });
    self.addChild(self.bus1);

    // ACC accumulator
    self.acc = new Register({
        id   : 'acc',
        title: 'ACC',
        left : 150,
        top  : self.height - 110,
        scale: scale
    });
    self.addChild(self.acc);

    // IAR instruction address register
    self.iar = new BusReg({
        id   : 'iar',
        title: 'IAR',
        left : 375,
        top  : self.height - 140,
        scale: scale
    });
    self.addChild(self.iar);

    // IR instruction register
    self.ir = new Byte({
        id   : 'ir',
        title: 'IR',
        left : 490,
        top  : self.height - 135,
        scale: scale,
        width: 250
    });
    self.addChild(self.ir);

    // flags register
    self.flags = new Byte({
        id       :'flags',
        title    : 'F',
        left     : 300,
        top      : 500,
        scale    : 0.2,
        cellCount: 4,
        height   : 400
    });
    var flagTitles = ['Z', 'E', 'A', 'C'];
    flagTitles.forEach(function (char, index) {
        self.flags.inputs[index].title  = char;
        self.flags.outputs[index].title = char;
    });
    self.addChild(self.flags);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createSetWires = function () {
    var self = this;

    var baseLeft  = self.andSIr.left;

    var clkSWire = {
        cnn: [
            self.clock.clkS,
            self.andSIr.inputs[1],
            self.andSMar.inputs[1],
            self.andSIar.inputs[1],
            self.andSAcc.inputs[1],
            self.andSRam.inputs[1],
            self.andSTmp.inputs[1],
            self.andSFlags.inputs[1],
            self.andSIO.inputs[1]
        ],
        segments: []
    };

    for (var k = 0; k < 8; ++k) {
        clkSWire.segments.push([
            'cnn' + (k + 1),
            {
                left  : baseLeft - 10,
                top   : 0, relY: true,
                solder: true
            }
        ]);
    }

    var orSRegBWire = {
        cnn     : [self.orSRegB.output],
        segments: []
    };

    for (var i = 0; i < 4; ++i) {
        clkSWire.cnn.push(self.children['andSRB' + i].inputs[2]);
        orSRegBWire.cnn.push(self.children['andSRB' + i].inputs[1]);

        if (i == 0) {
            clkSWire.segments.push([
                self.clock.clkS,
                {
                    left: 10, relX: true,
                    top: self.stepper.top - 10
                },
                {
                    left: baseLeft - 10,
                    top: 0, relY: true
                },
                'cnn' + (clkSWire.cnn.length - 1) + '+'
            ]);

            orSRegBWire.segments.push([
                self.children['andSRB' + i].inputs[1],
                {
                    left: baseLeft - 15,
                    top: 0, relY: true
                },
                'cnn0+'
            ]);
        } else {
            clkSWire.segments.push([
                'cnn' + (clkSWire.cnn.length - 1) + '+',
                {
                    left: baseLeft - 10,
                    top: 0, relY: true,
                    solder: true
                }
            ]);

            orSRegBWire.segments.push([
                'cnn' + (orSRegBWire.cnn.length - 1),
                {
                    left: baseLeft - 15,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

        var regSetPin = self.children['r' + i].setPin;
        var offset = Bus.WIRE_STEP * (3 - i);
        self.addWire({
            cnn: [
                self.children['andSRB' + i].output,
                regSetPin
            ],
            segment: [
                self.children['andSRB' + i].output,
                {
                    left: self.width - 30 + offset,
                    top: 120 - offset
                },
                regSetPin
            ]
        });

        self.addWire({
            cnn: [
                self.decSRegB.outputs[i],
                self.children['andSRB' + i].inputs[0]
            ],
            segment: [
                self.decSRegB.outputs[i],
                {
                    left: baseLeft - 20 - (i == 0 || i == 3 ? 5 : 0),
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });
    }

    self.addWire(clkSWire);
    self.addWire(orSRegBWire);

    self.addWire({
        cnn: [
            self.orSMar.output,
            self.andSMar.inputs[0]
        ],
        segment: [
            self.orSMar.output,
            self.andSMar.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orSIar.output,
            self.andSIar.inputs[0]
        ],
        segment: [
            self.orSIar.output,
            self.andSIar.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orSAcc.output,
            self.andSAcc.inputs[0]
        ],
        segment: [
            self.orSAcc.output,
            self.andSAcc.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orSFlags.output,
            self.andSFlags.inputs[0]
        ],
        segment: [
            self.orSFlags.output,
            self.andSFlags.inputs[0]
        ]
    });


    self.addWire({
        cnn: [
            self.andSIr.output,
            self.ir.setPin
        ],
        segment: [
            self.andSIr.output,
            {
                left: self.width - 49,
                top: self.height - 80
            },
            self.ir.setPin
        ]
    });

    self.addWire({
        cnn: [
            self.andSMar.output,
            self.sAddrPin
        ],
        segment: [
            self.andSMar.output,
            {
                left: self.width - 8,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            self.andSIar.output,
            self.iar.setPin
        ],
        segment: [
            self.andSIar.output,
            {
                left: self.width - 46,
                top: self.height - 77
            },
            self.iar.setPin
        ]
    });

    self.addWire({
        cnn: [
            self.andSAcc.output,
            self.acc.setPin
        ],
        segment: [
            self.andSAcc.output,
            {
                left: self.width - 43,
                top: self.height - 74
            },
            self.acc.setPin
        ]
    });

    self.addWire({
        cnn: [
            self.andSRam.output,
            self.sRamPin
        ],
        segment: [
            self.andSRam.output,
            {
                left: self.width - 5,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            self.andSTmp.output,
            self.tmp.setPin
        ],
        segment: [
            self.andSTmp.output,
            {
                left: self.width - 40,
                top: 107
            },
            self.tmp.setPin
        ]
    });

    self.addWire({
        cnn: [
            self.andSFlags.output,
            self.flags.setPin
        ],
        segment: [
            self.andSFlags.output,
            {
                left: self.width - 40,
                top: self.height - 71
            },
            self.flags.setPin
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createEnableWires = function () {
    var self = this;

    var baseLeft = self.andERam.left;

    var clkEWireOptions = {
        cnn     : [
            self.clock.clkE,
            self.andERam.inputs[1],
            self.andEAcc.inputs[1],
            self.andEIar.inputs[1],
            self.andEIOClkE.inputs[1]
        ],
        segments: [
            [
                self.andERam.inputs[1],
                {
                    left: self.andERam.left + 25,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.andEAcc.inputs[1],
                {
                    left: self.andEAcc.left + 25,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.andEIar.inputs[1],
                {
                    left: self.andEIar.left + 25,
                    top: 0, relY: true,
                    solder: true
                }
            ],
            [
                self.andEIOClkE.inputs[1],
                {
                    left: self.andEIOClkE.left + 25,
                    top: 0, relY: true,
                    solder: true
                }
            ]
        ]
    };

    var orERegBWire = {
        cnn     : [self.orERegB.output],
        segments: []
    };

    var orERegAWire = {
        cnn     : [self.orERegA.output],
        segments: []
    };

    for (var i = 0; i < 4; ++i) {
        orERegBWire.cnn.push(self.children['andERB' + i].inputs[1]);
        if (i == 0) {
            orERegBWire.segments.push([
                self.orERegB.output,
                {
                    left: 460,
                    top: 0, relY: true
                },
                'cnn' + (i + 1) + '+'
            ]);
        } else {
            orERegBWire.segments.push([
                self.children['andERB' + i].inputs[1],
                {
                    left: 460,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

        // decB to andRegB
        self.addWire({
            cnn: [
                self.decERegB.outputs[i],
                self.children['andERB' + i].inputs[0]
            ],
            segment: [
                self.decERegB.outputs[i],
                {
                    left: baseLeft + 40 + (i == 0 || i == 3 ? 5 : 0),
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        clkEWireOptions.cnn.push(self.children['andERB' + i].inputs[2]);
        clkEWireOptions.segments.push([
            self.children['andERB' + i].inputs[2],
            {
                left: baseLeft + 25,
                top: 0, relY: true,
                solder: true
            }
        ]);

        var offset = Bus.WIRE_STEP * i;
        self.addWire({
            cnn: [
                self.children['orER' + i].output,
                self.children['r' + i].enablePin
            ],
            segment: [
                self.children['orER' + i].output,
                {
                    left: baseLeft - 55 + offset,
                    top: 0, relY: true
                },
                {
                    top: 130 + offset,
                    left: 0, relX: true
                },
                self.children['r' + i].enablePin
            ]
        });

        self.addWire({
            cnn: [
                self.children['andERB' + i].output,
                self.children['orER' + i].inputs[1]
            ],
            segment: [
                self.children['andERB' + i].output,
                self.children['orER' + i].inputs[1]
            ]
        });

        self.addWire({
            cnn: [
                self.children['andERA' + i].output,
                self.children['orER' + i].inputs[0]
            ],
            segment: [
                self.children['andERA' + i].output,
                {
                    left: -12 + 3 * i, relX: true,
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        self.addWire({
            cnn: [
                self.decERegA.outputs[i],
                self.children['andERA' + i].inputs[0]
            ],
            segment: [
                self.decERegA.outputs[i],
                {
                    left: baseLeft + 40 + (i == 0 || i == 3 ? 5 : 0),
                    top: 0, relY: true
                },
                'cnn1+'
            ]
        });

        clkEWireOptions.cnn.push(self.children['andERA' + i].inputs[2]);
        if (i == 0) {
            clkEWireOptions.segments.push([
                self.clock.clkE,
                {
                    left: baseLeft + 25,
                    top: 0, relY: true,
                    yFirst: true
                },
                'cnn' + (clkEWireOptions.cnn.length - 1) + '+'
            ]);
        } else {
            clkEWireOptions.segments.push([
                self.children['andERA' + i].inputs[2],
                {
                    left: baseLeft + 25,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

        orERegAWire.cnn.push(self.children['andERA' + i].inputs[1]);
        if (i == 0) {
            orERegAWire.segments.push([
                self.orERegA.output,
                {
                    left: 465,
                    top: 0, relY: true
                },
                'cnn' + (i + 1) + '+'
            ]);
        } else {
            orERegAWire.segments.push([
                self.children['andERA' + i].inputs[1],
                {
                    left: 465,
                    top: 0, relY: true,
                    solder: true
                }
            ]);
        }

    }

    self.addWire(orERegBWire);
    self.addWire(orERegAWire);
    self.addWire(clkEWireOptions);

    // enableAcc to acc enable
    self.addWire({
        cnn: [
            self.andEAcc.output,
            self.acc.enablePin
        ],
        segment: [
            self.andEAcc.output,
            {
                left: 357,
                top: self.height - 68
            },
            self.acc.enablePin
        ]
    });

    // enable IAR to iar enable
    self.addWire({
        cnn: [
            self.andEIar.output,
            self.iar.enablePin
        ],
        segment: [
            self.andEIar.output,
            {
                left: 360,
                top: self.height - 68
            },
            self.iar.enablePin
        ]
    });

    self.addWire({
        cnn: [
            self.andERam.output,
            self.eRamPin
        ],
        segment: [
            self.andERam.output,
            {
                top: 145,
                left: 387
            },
            {
                left: self.width - 11,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });

    self.addWire({
        cnn: [
            self.orERam.output,
            self.andERam.inputs[0]
        ],
        segment: [
            self.orERam.output,
            self.andERam.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orEAcc.output,
            self.andEAcc.inputs[0]
        ],
        segment: [
            self.orEAcc.output,
            self.andEAcc.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orEIar.output,
            self.andEIar.inputs[0]
        ],
        segment: [
            self.orEIar.output,
            self.andEIar.inputs[0]
        ]
    });

    self.addWire({
        cnn: [
            self.orEBus1.output,
            self.bus1.bus1
        ],
        segment: [
            self.orEBus1.output,
            {
                left: 358,
                top: 0, relY: true
            },
            'cnn1+'
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createStepperWires = function () {
    var self = this;

    for (var i = 1; i <= 6; ++i) {
        self['stepWire' + i] = {
            cnn: [self.stepper.outputs[i - 1]],
            segments: []
        };
        /*if (i > 3) {
            self['stepWire' + i].segments.push([
                self.stepper.outputs[i - 1],
                {
                    left: 0, relX: true,
                    top: self.height - 250
                }
            ]);
        }*/
    }

    // stepper step 7 to reset
    self.addWire({
        turnOnDelay: 300,
        cnn: [
            self.stepper.outputs[6],
            self.stepper.reset
        ],
        segment: [
            self.stepper.outputs[6],
            {
                top   : 2, relX: true,
                left  : 12, relY: true,
                yFirst: true
            },
            {
                left  : self.stepper.left - 3,
                top   : self.stepper.top - 4,
                yFirst: true
            },
            'cnn1+'
        ]
    });

    // clock to stepper
    self.addWire({
        cnn: [
            self.clock.clk,
            self.stepper.clk
        ],
        segment: [
            self.clock.clk,
            {
                left: 10, relX: true,
                top : 0,  relY: true
            },
            'cnn1+'
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.createControlSection = function () {
    var self = this;

    // clock
    self.clock = new Clock({
        id   : 'clock',
        title: 'Clock',
        left : 420,
        top  : 160,
        scale: 0.1
    });
    self.addChild(self.clock);

    // stepper
    self.stepper = new Stepper({
        id       :'stepper',
        title    : 'Stepper',
        left     : self.width - 460,
        top      : self.clock.top,
        stepCount: 7,
        scale    : 0.08
    });
    self.addChild(self.stepper);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
CPU.prototype.drawSelf = function (ctx) {
    var self = this;
    CPU.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 160 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = CPU;