'use strict';

var util      = require('util');
var Component = require('./Component');
var Pin       = require('./conductor/Pin');

util.inherits(Switch, Component);

Switch.DEFAULT_SIZE = 20;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Switch(options) {
    var self = this;
    options = options || {};

    options.width  = options.width  !== undefined ? options.width  : Switch.DEFAULT_SIZE;
    options.height = options.height !== undefined ? options.height : Switch.DEFAULT_SIZE;
    options.title  = options.title || 'Switch';

    Switch.super_.call(self, options);

    self.flip = options.flip !== undefined ? !!options.flip : false;

    self.output = self.addPin(self.flip ?  Pin.POS.LEFT : Pin.POS.RIGHT, 0, 1, null, options.value);
    self.output.active = true;
    self.output.debugTitle = 'o';
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.drawSelf = function (ctx) {
    var self = this;

    var radius = self.width / 2;
    ctx.strokeStyle = self.output.getValue() ? '#FF0000' : '#444444';
    ctx.fillStyle   = self.output.getValue()  ? '#ffeeee' :'#F4F4F4';
    ctx.beginPath();
    self.arc(
        ctx,
        self.width / 2,
        self.height / 2,
        radius,
        0,
        Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.getTitlePos = function () {
    var self = this;
    return {
        left    : self.output.getValue() ?  self.width / 2: self.width / 2,
        top     : self.height / 2,
        baseLine: 'middle'
    };
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.getTitleAlign = function () {
    //var self = this;
    return 'center';
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.printTitle = function (ctx) {
    var self = this;
    var title = self.getTitle();
    if (title) {
        self.setFontSize(ctx, 12);
        ctx.fillStyle = self.output.getValue() ? '#FF0000' : '#444444';
        var pos = self.getTitlePos();
        ctx.textBaseline = pos.baseLine;
        ctx.textAlign = self.getTitleAlign();
        self.fillText(
            ctx,
            title,
            pos.left,
            pos.top
        );
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.handleClick = function (globalPoint) {
    var self = this;
    //console.log('Component: Clicked: ' + self.title);
    self.output.setValue(!self.output.value).then(function () {
        window.root._redraw();
    }).catch(function (err) {
        console.log('Switch: Error during setValue:', err.stack);

    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.prototype.getTitle = function () {
    var self = this;
    return self.output.toString();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Switch.createForInput = function (holder, input, value) {
    var inputPoint = input.getParentPoint();
    var inputSwitch = new Switch({
        left: input.position == Pin.POS.RIGHT ? inputPoint.left + 20 : inputPoint.left - 40,
        top : inputPoint.top - Switch.DEFAULT_SIZE / 2,
        flip: input.position == Pin.POS.RIGHT,
        value: value
    });
    holder.addChild(inputSwitch);
    holder.addWire({
        cnn: [
            inputSwitch.output,
            input
        ],
        segments: [
            [
                inputSwitch.output,
                input
            ]
        ]
    })

};

module.exports = Switch;