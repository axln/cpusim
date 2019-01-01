'use strict';

var util      = require('util');
var Component = require('./Component');

util.inherits(Label, Component);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Label(options) {
    var self = this;
    options = options || {};
    options.title    = options.title    || 'Label';
    options.outline = false;

    Label.super_.call(self, options);

    self.fontSize = options.fontSize || 20;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Label.prototype.printTitle = function (ctx) {
    var self = this;
    var title = self.getTitle();
    if (title) {
        self.setFontSize(ctx, self.fontSize);
        ctx.fillStyle = '#444';
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

module.exports = Label;