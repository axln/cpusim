'use strict';

var $        = require('jquery');
var CPU      = require('../circuit/CPU');
var RAM      = require('../circuit/RAM');
var Bus      = require('../conductor/Bus');
var Assembly = require('../Assembly');

module.exports = function () {
    var self = this;

    var cpu = new CPU({
        id: 'cpu',
        left: 50,
        top: 50
    });
    self.addChild(cpu);

    var ram = new RAM({
        id: 'ram',
        left: 1200,
        top: 100,
        scale: 0.4
    });
    self.addChild(ram);

    self.addWire({
        cnn: [
            cpu.sAddrPin,
            ram.setAddrPin
        ],
        segment: [
            cpu.sAddrPin,
            ram.setAddrPin
        ]
    });

    self.addWire({
        cnn: [
            cpu.sRamPin,
            ram.setPin
        ],
        segment: [
            cpu.sRamPin,
            ram.setPin
        ]
    });

    self.addWire({
        cnn: [
            cpu.eRamPin,
            ram.enablePin
        ],
        segment: [
            cpu.eRamPin,
            ram.enablePin
        ]
    });

    return self.initChildren().then(function () {
        var program = 'data r0, 0x10\ndata r1, 0x15\n add r0, r1';
        var binary = Assembly.translate(program);
        return ram.setContent(binary);
    }).then(function () {
        var bus = new Bus({
            parent: self,
            cnn: [
                cpu.data,
                ram.addr,
                ram.data
            ],
            segments: [
                [
                    cpu.data,
                    {
                        left: 1150,
                        top: cpu.top + cpu.height + 40,
                        yFirst: true,
                        align: 'left',
                        flip: true
                    },
                    {
                        left: 1150,
                        top: 50,
                        align: 'left',
                        flip: true
                    },
                    ram.addr
                ],
                [
                    {
                        left: 1150,
                        top: 750,
                        yFirst: true,
                        align: 'right',
                        solder: true
                    },
                    ram.data
                ]
            ]
        });
        self.buses.push(bus);
        return bus.init();
    }).then(function () {
        return self.initWires();
    }).then(function () {
        $('#tick').click(function () {
            cpu.clock.doTick().catch(function (err) {
                console.log('tick error:', err.stack);
            });
        });
        //cpu.clock.scheduleTick();
    });
};