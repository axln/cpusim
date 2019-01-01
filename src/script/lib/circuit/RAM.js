'use strict';


var util     = require('util');
var Promise  = require('aigle');
var Circuit  = require('./Circuit');
var Byte     = require('./Byte');
var Decoder  = require('./Decoder');
var Register = require('./Register');
var BusReg   = require('./BusReg');
var AND      = require('../gate/AND');
var Wire     = require('../conductor/Wire');
var Bus      = require('../conductor/Bus');
var Pin      = require('../conductor/Pin');

Promise.each = require('aigle/each');

util.inherits(RAM, Circuit);

RAM.GRID_STEP   = 200;
RAM.GRID_STEP_V = 80;

RAM.CELL_OFFSET = {
    X: 300,
    Y: 120
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function RAM(options) {
    var self = this;
    options = options || {};

    options.title     = 'RAM256';
    options.width     = 3500;
    options.height    = 1550;
    options.pinMargin = 0.1;

    RAM.super_.call(self, options);

    self.cells    = [];
    self.setAnds  = [];
    self.enblAnds = [];

    self.addr = [];
    self.data = [];

    for (var i = 0; i < 8; ++i) {
        var addrPin = self.addPin(Pin.POS.TOP, i, 8, 'a' + i);
        self.addr.push(addrPin);
    }

    for (var j = 0; j < 8; ++j) {
        var busPin = self.addPin(Pin.POS.BOTTOM, j, 8, 'd' + j);
        self.data.push(busPin);
    }

    self.setAddrPin = self.addPin(Pin.POS.LEFT, 7, 8, 'sa');
    self.setPin     = self.addPin(Pin.POS.LEFT, 6, 8, 's');
    self.enablePin  = self.addPin(Pin.POS.LEFT, 5, 8, 'e');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.init = function () {
    var self = this;
    //console.log('RAM.prototype.init');

    self.addrReg = new Byte({
        id   : 'addrReg',
        left : 50,
        top  : 160,
        title: 'A',
        scale: 0.25
    });
    self.addChild(self.addrReg);

    self.vDec = new Decoder({
        id: 'VDec',
        inputCount: 4,
        top: 80,
        left: 140,
        scale: 0.25
    });
    self.addChild(self.vDec);

    self.hDec = new Decoder({
        id: 'HDec',
        inputCount: 4,
        top: 230,
        left: 140,
        scale: 0.25
    });
    self.addChild(self.hDec);

    // wires: address pins to address register
    self.createAddressWires();

    // wires: address register to decoders
    self.createAddrToDecoderWires();

    // create cell items: cell register, selector and, set and, enable end
    self.createCellGroups();

    // create data bus
    var dataBus = self.createDataBus();

    // wires: from decoders to cell selector's AND
    self.createSelectorWires();

    // wires: from set and enable pins to every set and enable ANDs
    self.createSetEnableWires();

    return dataBus.init().then(function () {
        return RAM.super_.prototype.init.call(self);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createSetEnableWires = function () {
    var self = this;

    var setCnn = [self.setPin];
    for (var si = 0; si < self.setAnds.length; ++si) {
        setCnn.push(self.setAnds[si].inputs[0]);
    }
    var setWireOptions = {
        cnn: setCnn,
        segments: [
            // from the pin to bottom horizontal line
            [
                self.setPin,
                {
                    left: 50,
                    top : RAM.GRID_STEP_V * 16 + RAM.CELL_OFFSET.Y
                },
                {
                    left: RAM.GRID_STEP * 15 + RAM.CELL_OFFSET.X + 30,
                    top : 0, relY: true
                }
            ]
        ]
    };

    var enCnn = [self.enablePin];
    for (var ei = 0; ei < self.enblAnds.length; ++ei) {
        enCnn.push(self.enblAnds[ei].inputs[0]);
    }

    var enableWireOptions = {
        cnn: enCnn,
        segments: [
            // from the pin to bottom horizontal line
            [
                self.enablePin,
                {
                    left: 40,
                    top: RAM.GRID_STEP_V * 16 + RAM.CELL_OFFSET.Y + 10
                },
                {
                    left: 140 + RAM.GRID_STEP * 16,
                    top: 0,
                    relY: true
                }
            ]
        ]
    };

    for (var i = 0; i < 16; ++i) {
        setWireOptions.segments.push(
            [
                {
                    top   : RAM.GRID_STEP_V * 16 + RAM.CELL_OFFSET.Y,
                    left  : RAM.GRID_STEP * i + RAM.CELL_OFFSET.X + 30,
                    solder: i < 15
                },
                {
                    top : RAM.CELL_OFFSET.Y + 20,
                    left: 0,
                    relX: true
                }
            ]
        );
        enableWireOptions.segments.push(
            [
                {
                    left  : 340 + i * RAM.GRID_STEP,
                    top   : RAM.GRID_STEP_V * 16 + RAM.CELL_OFFSET.Y + 10,
                    solder: i < 15
                },
                {
                    top : RAM.CELL_OFFSET.Y + 40,
                    left: 0,
                    relX: true
                }
            ]
        );

        for (var j = 0; j < 16; ++j) {
            var index = i * 16 + j + 1;
            setWireOptions.segments.push([
                'cnn' + index ,
                {
                    left  : -25, relX: true,
                    top   : 0, relY: true,
                    solder: j < 15
                }
            ]);
            enableWireOptions.segments.push([
                'cnn' + index,
                {
                    left  : -15, relX: true,
                    top   : 0, relY: true,
                    solder: j < 15
                }
            ]);
        }
    }

    self.addWire(setWireOptions);
    self.addWire(enableWireOptions);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createEnableWires = function () {
    var self = this;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createSelectorWires = function () {
    var self = this;

    for (var i = 0; i < 16; ++i) {
        var col = i;
        // vertical selector wires
        var verticalWireOptions = {
            cnn: [self.vDec.outputs[i]],
            segments: [
                [
                    self.vDec.outputs[i],
                    {
                        left:  Bus.WIRE_STEP * 16 - Bus.WIRE_STEP * i, relX: true,
                        top :  RAM.CELL_OFFSET.Y - 20 - Bus.WIRE_STEP * i
                    },
                    {
                        left: col * RAM.GRID_STEP + RAM.CELL_OFFSET.X - 10,
                        top : 0, relY: true
                    },
                    {
                        left: 0, relX: true,
                        top : 'cnn1.top'
                    }
                ]
            ]
        };

        for (var j = 0; j < 16; ++j) {
            var vid = 'x' + i.toString(16).toUpperCase() + j.toString(16).toUpperCase();
            var vAndInput = self.children[vid].inputs[0];
            verticalWireOptions.cnn.push(vAndInput);
            verticalWireOptions.segments.push([
                vAndInput,
                {
                    left  : col * RAM.GRID_STEP + RAM.CELL_OFFSET.X - 10,
                    top   : 0, relY: true,
                    solder: j > 0
                }
            ]);
        }
        self.addWire(verticalWireOptions);

        // horizontal selector wires
        var row = 15 - i;
        var horizontalWireOptions = {
            cnn     : [self.hDec.outputs[i]],
            segments: [
                [
                    self.hDec.outputs[i],
                    {
                        left: (row > 2 ? 48 - Bus.WIRE_STEP * row: 55 + Bus.WIRE_STEP * row),
                        relX: true,
                        top : 0, relY: true
                    },
                    {
                        left  : RAM.GRID_STEP * 15 + RAM.CELL_OFFSET.X,
                        top   : row * RAM.GRID_STEP_V + RAM.CELL_OFFSET.Y - 10,
                        yFirst: true
                    }
                ]
            ]
        };

        for (var k = 0; k < 16; ++k) {
            var hid = 'x' + k.toString(16).toUpperCase() + i.toString(16).toUpperCase();
            //console.log('id:', id);
            var hAndInput = self.children[hid].inputs[1];
            horizontalWireOptions.cnn.push(hAndInput);
            horizontalWireOptions.segments.push([
                hAndInput,
                {
                    left  : 0, relX: true,
                    top   : row * RAM.GRID_STEP_V + RAM.CELL_OFFSET.Y - 10,
                    solder: k < 15
                }
            ]);
        }
        self.addWire(horizontalWireOptions);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createAddrToDecoderWires = function () {
    var self = this;
    for (var i = 0; i < 8; ++i) {
        var decInput = i < 4 ? self.hDec.inputs[i] : self.vDec.inputs[i - 4];
        self.addWire({
            cnn: [
                self.addrReg.outputs[i],
                decInput
            ],
            segment: [
                self.addrReg.outputs[i],
                {
                    left: i < 4 ? 10 + 5 * i : 5 + 20 - 5 * (i - 4), relX: true,
                    top: 'cnn1.top'
                },
                decInput
            ]
        });
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createAddressWires = function () {
    var self = this;
    // addr bus to addr byte
    for (var i = 0; i < 8; ++i) {
        self.addWire({
            cnn: [
                self.addr[i],
                self.addrReg.inputs[i]
            ],
            segment: [
                self.addr[i],
                {
                    top: 15 + Bus.WIRE_STEP *i,
                    left: 'cnn0.left',
                    relY: true
                },
                {
                    top: 0,
                    left: 20 + Bus.WIRE_STEP *i,
                    relY: true
                },
                {
                    top: 'cnn1.top',
                    left: 0,
                    relX: true
                },
                self.addrReg.inputs[i]
            ]
        });
    }

    // setAddr to addr byte
    self.addWire({
        cnn: [
            self.setAddrPin,
            self.addrReg.setPin
        ],
        segments: [
            [
                self.setAddrPin,
                {
                    left: 10,
                    top: 'cnn1.top'
                },
                self.addrReg.setPin
            ]
        ]
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createDataBus = function () {
    var self = this;

    var busCnn = self.cells.map(function (cell) {
        return cell.data;
    });
    busCnn.push(self.data);

    var dataBusOptions = {
        parent  : self,
        cnn     : busCnn,
        segments: [
            [
                self.cells[255].data,
                {
                    top  : self.height - 70,
                    left : RAM.GRID_STEP * 15 + RAM.CELL_OFFSET.X + 160,
                    align: 'left',
                    flip : true
                },
                {
                    left : 30,
                    top  : self.height - 70,
                    align: 'left',
                    flip : true
                },
                {
                    top  : self.height - 30,
                    left : 30,
                    align: 'right'
                },
                self.data
            ]
        ]
    };

    for (var i = 0; i < 16; ++i) {
        if (i < 15) {
            var baseCellIndex = i * 16 + 15;
            dataBusOptions.segments.push([
                self.cells[baseCellIndex].data,
                //'cnn' + baseCellIndex,
                {
                    left  : RAM.GRID_STEP * i + RAM.CELL_OFFSET.X + 160,
                    top   : self.height - 70,
                    align : 'left',
                    flip: true,
                    solder: true
                }
            ]);
        }

        for (var j = 0; j < 15; ++j) {
            var cellIndex = i * 16 + j;
            var data = self.cells[cellIndex].data;
            dataBusOptions.segments.push([
                data,
                {
                    left : RAM.GRID_STEP * i + RAM.CELL_OFFSET.X + 160,
                    top  : 0, relY: true,
                    align: 'x',
                    flip: true,
                    solder: true
                }
            ]);
        }
    }

    var dataBus = new Bus(dataBusOptions);
    self.buses.push(dataBus);
    return dataBus;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.createCellGroups = function () {
    var self = this;

    // create cell items: cell register, selector and, set and, enable end
    for (var i = 0; i < 16; ++i) {
        var col = i;
        for (var j = 0; j < 16; ++j) {
            var row = 15 - j;
            var id = col.toString(16).toUpperCase() + j.toString(16).toUpperCase();
            //console.log('cellAddress: ' + id);

            // cell selector and
            var andX = new AND({
                id   : 'x' + id,
                title: 'X' + id,
                left : col * RAM.GRID_STEP   + RAM.CELL_OFFSET.X + 5,
                top  : row * RAM.GRID_STEP_V + RAM.CELL_OFFSET.Y,
                scale: 0.25
            });
            self.addChild(andX);

            // cell memory
            var cellReg = new BusReg({
                id   : 'cell' + id,
                left : col * RAM.GRID_STEP   + RAM.CELL_OFFSET.X + 100,
                top  : row * RAM.GRID_STEP_V + RAM.CELL_OFFSET.Y - 5,
                title: 'C' + id,
                scale: 0.10
            });
            self.addChild(cellReg);
            self.cells.push(cellReg);

            // cell setter and
            var andS = new AND({
                id   : 's' + id,
                title: 'S' + id,
                left : RAM.CELL_OFFSET.X + 60 + col * RAM.GRID_STEP,
                top  : RAM.CELL_OFFSET.Y + 10 + row * RAM.GRID_STEP_V,
                scale: 0.25
            });
            self.setAnds.push(andS);
            self.addChild(andS);

            // cell enabler
            var andE = new AND({
                id   : 'e' + id,
                title: 'E' + id,
                left : RAM.CELL_OFFSET.X + 60 + col * RAM.GRID_STEP,
                top  : RAM.CELL_OFFSET.Y + 30 + row * RAM.GRID_STEP_V,
                scale: 0.25
            });

            self.enblAnds.push(andE);
            self.addChild(andE);

            self.addWire({
                cnn: [
                    andX.output,
                    andS.inputs[1],
                    andE.inputs[1]
                ],
                segments: [
                    [
                        andX.output,
                        andS.inputs[1]
                    ],
                    [
                        andE.inputs[1],
                        {
                            top: 'cnn0.top',
                            left: -5, relX: true,
                            solder: true
                        }
                    ]
                ]
            });

            self.addWire({
                cnn: [
                    andS.output,
                    cellReg.setPin
                ],
                segments: [
                    [
                        andS.output,
                        {
                            top: 40, relY: true,
                            left: 10, relX: true
                        },
                        cellReg.setPin
                    ]
                ]
            });


            self.addWire({
                cnn: [
                    andE.output,
                    cellReg.enablePin
                ],
                segment: [
                    andE.output,
                    {
                        top: 25, relY: true,
                        left: 5, relX: true
                    },
                    cellReg.enablePin
                ]
            });
        }
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.getPinScale = function () {
    var self = this;
    return 1 / self.scale;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.drawSelf = function (ctx) {
    var self = this;
    RAM.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 300 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
RAM.prototype.setContent = function (byteArray) {
    var self = this;
    return Promise.each(byteArray, function (byte, index) {
        return self.cells[index].setByte(byte);
    });
};

module.exports = RAM;