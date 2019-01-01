'use strict';

var util    = require('util');
var Circuit = require('./Circuit');
var AND     = require('../gate/AND');
var NOT     = require('../gate/NOT');
var OR      = require('../gate/OR');
var Pin     = require('../conductor/Pin');

util.inherits(Bus1, Circuit);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bus1(options) {
    var self = this;
    options = options || {};
    options.width     = 600;
    options.height    = 160;
    options.minScale  = 0.4;
    options.pinMargin = 0.1;

    options.title = options.title || 'Bus1';

    Bus1.super_.call(self, options);

    self.inputs  = [];
    self.outputs = [];

    var pinCount = 8;

    for (var i = 0; i < pinCount; ++i) {
        var input = self.addPin(Pin.POS.TOP, i, pinCount, 'i'+ i);
        self.inputs.push(input);
    }

    for (var j = 0; j < pinCount; ++j) {
        var output = self.addPin(Pin.POS.BOTTOM, j, pinCount, 'o'+ j);
        self.outputs.push(output);
    }

    self.bus1 = self.addPin(Pin.POS.RIGHT, 5, 8, 'bus1');
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus1.prototype.init = function () {
    var self = this;
    var scale = 0.4;
    var baseTop = 90;
    var not = new NOT({
        left : 15,
        top  : 60,
        scale: scale
    });
    self.addChild(not);

    self.addWire({
        cnn: [
            self.bus1,
            not.inputs[0]
        ],
        segment: [
            not.inputs[0],
            {
                top: 20,
                left: self.width - 10,
                yFirst: true
            },
            {
                left: 0, relX: true,
                top: 'cnn0.top',
                solder: true
            }
        ]
    });

    var notOutputWire = {
        cnn: [not.output],
        segments: []
    };

    for (var i = 0; i < 8; ++i) {
        var gate;
        var pointLeft = self.inputs[i].getPoint(true).left + self.inputs[i].length * scale;
        if (i == 0) {
            gate = new OR({
                left: pointLeft,
                top: baseTop,
                scale: scale
            });

            self.addWire({
                cnn: [
                    self.bus1,
                    gate.inputs[0]
                ],
                segment: [
                    self.bus1,
                    {
                        left: self.width - 75,
                        top: 0, relY: true
                    },
                    'cnn1+'
                ]
            });

        } else {
            gate = new AND({
                left: pointLeft,
                top: baseTop,
                scale: scale
            });

            notOutputWire.cnn.push(gate.inputs[0]);
            if (i == 1) {
                notOutputWire.segments.push([
                    not.output,
                    {
                        left: self.width - 145,
                        top: 0, relY: true
                    },
                    'cnn' + i + '+'
                ]);
            } else {
                notOutputWire.segments.push([
                    gate.inputs[0],
                    {
                        top: 'cnn0.top',
                        left: -10, relX: true,
                        solder: true
                    }
                ]);
            }
        }
        self.addChild(gate);
        self.addWire({
            cnn: [
                self.inputs[i],
                gate.inputs[1]
            ],
            segment: [
                gate.inputs[1],
                self.inputs[i]
            ]
        });
        self.addWire({
            cnn: [
                gate.output,
                self.outputs[i]
            ],
            segment: [
                gate.output,
                {
                    left: 0, relX: true,
                    top: self.height - 20
                },
                self.outputs[i]
            ]
        });
    }

    self.addWire(notOutputWire);

    return Bus1.super_.prototype.init.call(self);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus1.prototype.getTitle = function () {
    var self = this;
    var title = Bus1.super_.prototype.getTitle.call(self);
    return title + ':' + self.bus1;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Bus1.prototype.drawSelf = function (ctx) {
    var self = this;
    Bus1.super_.prototype.drawSelf.call(self, ctx);

    if (!self.detailDraw) {
        self.parent.setFontSize(ctx, 100 * self.scale);
        ctx.textBaseline = 'middle';
        ctx.textAlign    = 'center';
        ctx.fillStyle    = '#444444';
        self.fillText(ctx, self.getTitle(), self.width / 2, self.height / 2);
    }
};

module.exports = Bus1;