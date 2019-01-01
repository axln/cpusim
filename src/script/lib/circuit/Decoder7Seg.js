'use strict';

var util      = require('util');
var Circuit   = require('./Circuit');
var AND       = require('../gate/AND');
var OR        = require('../gate/OR');
var NOT       = require('../gate/NOT');
var NOR       = require('../gate/NOR');
var Pin       = require('../conductor/Pin');
var Helper    = require('../Helper');

util.inherits(Decoder7Seg, Circuit);

Decoder7Seg.PADDING        = 20;
Decoder7Seg.AND_SPACE      = 30;
Decoder7Seg.NOT_SPACE      = 40;
Decoder7Seg.NOT_SPACE_VERT = 12;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Decoder7Seg(options) {
    var self = this;
    options = options || {};
    options.width     = 430;
    options.height    = 340;
    options.minScale  = 0.5;
    options.pinMargin = 0.18;

    Decoder7Seg.super_.call(self, options);

    self.seg7 = [
        {
            gateClass: NOR,
            outputs  : [1,4],
            offset   : 10
        },
        {
            gateClass: NOR,
            outputs  : [5,6],
            offset   : 30
        },
        {
            gateClass: NOT,
            outputs  : [2],
            offset   : 50
        },
        {
            gateClass: NOR,
            outputs  : [1, 4, 7],
            offset   : 70
        },
        {
            gateClass: OR,
            outputs  : [0, 2, 6, 8],
            offset   : 90
        },
        {
            gateClass: NOR,
            outputs  : [1, 2, 3, 7],
            offset   : 120
        },
        {
            gateClass: NOR,
            outputs  : [0, 1, 7],
            offset   : 140
        }
    ];

    self.inputs  = [];
    self.outputs = [];

    var inputCount  = 4;
    var outputCount = 7;

    for (var i = 0; i < inputCount; ++i) {
        var input = self.addPin(Pin.POS.LEFT, i, inputCount, 'i' + i);
        self.inputs.push(input);
    }

    for (var j = 0; j < outputCount; ++j) {
        var title = String.fromCharCode(97 + j);
        var output = self.addPin(Pin.POS.RIGHT, outputCount - 1 - j, outputCount, title);
        self.outputs.push(output);
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Decoder7Seg.prototype.init = function () {
    var self = this;
    self.createDecoder();

    for (var index = 0; index < self.seg7.length; ++index) {
        var segInfo = self.seg7[index];
        var gate = new segInfo.gateClass({
            id        : segInfo.gateClass.name.toLowerCase() + '7' + index ,
            title     : segInfo.gateClass.name + index,
            inputCount: segInfo.outputs.length,
            top       : 20 + 45 * index,
            left      : 380,
            scale     : 0.25
        });
        self.addChild(gate);

        // gate out to seg7dec output
        self.addWire({
            cnn: [
                gate.output,
                self.outputs[index]
            ],
            segments: [
                [
                    gate.output,
                    {
                        left: 10, relX: true,
                        top : 0, relY: true
                    },
                    'cnn1+'
                ]
            ]
        });
        segInfo.outputs.forEach(function (outputIndex, index) {
            // from decoder output to gate
            var andGate = self.children['and' + outputIndex];
            // counting output's wires in order to split lines vertically
            if (andGate.wireCount !== undefined) {
                andGate.wireCount++;
            } else {
                andGate.wireCount = 0;
            }
            self.addWire({
                cnn: [
                    andGate.output,
                    gate.inputs[index]
                ],
                segments: [
                    [
                        andGate.output,
                        {
                            left: 0, relX: true,
                            top : andGate.wireCount * 5, relY: true
                        },
                        {
                            left: segInfo.offset + index * 3, relX: true,
                            top : 0, relY: true
                        },
                        'cnn1+'
                    ]
                ]
            });
        });
    }

    return Decoder7Seg.super_.prototype.init.call(self).then(function () {
        // adding soldering points
        for (var i = 0; i < 9; ++i) {
            var andGate = self.children['and' + i];
            var cnnCount = andGate.output.cnn.length;
            andGate.output.cnn.forEach(function (wire, index) {
                if (index < cnnCount - 1) {
                    wire.solders.push(wire.segments[0][1]);
                }
            });
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Decoder7Seg.prototype.createDecoder = function () {
    var self = this;
    var nots     = [];
    var onWires  = [];
    var offWires = [];
    for (var j = 0; j < self.inputs.length; ++j) {
        var rj = self.inputs.length - 1 - j;
        var not = new NOT({
            id   : 'not' + j,
            title: 'NOT' + j,
            left : Decoder7Seg.NOT_SPACE * self.inputs.length - Decoder7Seg.NOT_SPACE * j,
            top  : 8 + Decoder7Seg.NOT_SPACE_VERT * j,
            scale: 0.25
        });
        nots.push(not);
        self.addChild(not);
        onWires.push({
            cnn: [
                self.inputs[rj],
                not.inputs[0]
            ],
            segments: [
                [
                    self.inputs[rj],
                    {left: 5 + j * 3, top: 'cnn0.top', relX: true},
                    {left: 5 + j * 3, top: 'cnn1.top', relX: true},
                    not.inputs[0]
                ]
            ]
        });
        offWires.push({
            cnn: [not.output],
            segments: []
        });
    }

    for (var i = 0; i < 9; ++i) {
        var and = new AND({
            id: 'and' + i,
            title: 'AND' + i,
            left: Decoder7Seg.NOT_SPACE * self.inputs.length + Decoder7Seg.NOT_SPACE,
            inputCount: self.inputs.length,
            top: Decoder7Seg.AND_SPACE + Decoder7Seg.AND_SPACE * i + 12,
            scale: 0.25
        });
        var binary = Helper.number2BinString(i);
        if (binary.length < self.inputs.length) {
            var count = self.inputs.length - binary.length;
            for (var k = 0; k < count; ++k) {
                binary = '0' + binary;
            }
        }
        binary = binary.split('');
        binary.forEach(function (value, j) {
            var lastCnnIndex;
            if (value == '0') {
                //console.log(i, j, ': 0');
                lastCnnIndex = offWires[j].cnn.length;
                offWires[j].cnn.push(and.inputs[3 - j]);
                offWires[j].segments.push([
                    {
                        left  : 'cnn0.left',
                        top   : 'cnn'+ lastCnnIndex + '.top',
                        solder: true
                    },
                    and.inputs[3 - j]
                ]);

            } else {
                //console.log(i, j, ': 1');
                lastCnnIndex = onWires[j].cnn.length;
                onWires[j].cnn.push(and.inputs[3 - j]);
                onWires[j].segments.push([
                    {
                        left  : 'cnn1.left',
                        top   : 'cnn'+ lastCnnIndex + '.top',
                        solder: true
                    },
                    and.inputs[3 - j]
                ]);
            }
        });

        self.addChild(and);
    }

    onWires.forEach(function (wireOptions) {
        var lastSegment = wireOptions.segments[wireOptions.segments.length - 1];
        //console.log('onWires[%d], lastSegment ', index, lastSegment);
        lastSegment[0].solder = false;
        lastSegment.unshift('cnn1*');
        self.addWire(wireOptions);
    });

    offWires.forEach(function (wireOptions) {
        var lastSegment = wireOptions.segments[wireOptions.segments.length - 1];
        //console.log('offWires[%d], lastSegment ', index, lastSegment);
        lastSegment[0].solder = false;
        lastSegment.unshift('cnn0');
        self.addWire(wireOptions);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Decoder7Seg.prototype.drawSelf = function (ctx) {
    var self = this;
    Decoder7Seg.super_.prototype.drawSelf.call(self, ctx);
    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 50 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, 'SEG7DEC', self.width / 2, self.height / 2);
    }
};

module.exports = Decoder7Seg;