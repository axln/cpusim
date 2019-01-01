'use strict';

var util = require('util');
var AND  = require('./AND');

util.inherits(NAND, AND);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function NAND(options) {
    var self = this;
    NAND.super_.call(self, options);
    self.output.inverted    = true;
    self.output.invertColor = true;

}

module.exports = NAND;