'use strict';

var util = require('util');
var OR   = require('./OR');

util.inherits(NOR, OR);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function NOR(options) {
    var self = this;
    NOR.super_.call(self, options);
    self.output.inverted    = true;
    self.output.invertColor = true;
}

module.exports = NOR;