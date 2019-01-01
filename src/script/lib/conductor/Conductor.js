'use strict';

var Promise = require('aigle');

Promise.each = require('aigle/each');

Conductor.HIGHLIGH_COLOR = '#FF00FF';

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Conductor(options) {
    var self = this;
    options = options || {};

    // conductor's initial value can be true only for active pins
    self.value  = options.value  !== undefined ? !!options.value  : false;

    self.title       = options.title       || null;
    self.debugTitle  = options.debugTitle  || null;
    self.parent      = options.parent      || null;
    self.turnOnDelay = options.turnOnDelay || 0;

    // draw in highlight mode
    self.hl = false;

    // list of peer connections
    self.cnn = options.cnn || [];
    // do we get power from the corresponding peer connection
    self.pwrState = [];
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.handleCnnPwrStateUpdate = function (pwrState, cameFrom) {
    var self = this;

    var cameCnnIndex = self.cnn.indexOf(cameFrom);
    if (cameCnnIndex < 0) {
        throw new Error('Conductor: Update came from an unknown connection: ', cameFrom);
    }
    self.pwrState[cameCnnIndex] = pwrState;

    var newValue = self.detectValue();
    var changed = self.value !== newValue;
    if (changed) {
        self.value = newValue;
        if (window.debugMode === true && self.parent.debugPin === true) {
            var title = self.title || self.debugTitle;
            if (title) {
                console.log('%s %s updated to %d', self.parent.title, title, self.value ? 1 : 0);
            }
        }
    }
    // we need to propagate power state even if the value didn't change,
    // because power state depends on the number of power sources
    if (self.turnOnDelay && changed && newValue) {
        window.root._redraw();
        return Promise.delay(self.turnOnDelay).then(function () {
            return self.propagatePwrState(cameFrom);
        });
    } else {
        return self.propagatePwrState(cameFrom);
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.detectValue = function () {
    var self = this;
    var value = false;
    for (var i = 0; i < self.pwrState.length; ++i) {
        if (self.pwrState[i]) {
            value = true;
            break;
        }
    }
    return value;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.propagatePwrState = function (except) {
    var self = this;
    var propagateTo = [];
    for (var i = 0; i < self.cnn.length; ++i) {
        var cnn = self.cnn[i];
        if (cnn == except || cnn.active) {
            continue;
        }
        var myCurrentPwrState = cnn.getPowerStateOf(self);
        if (self.value && !self.isTheOnlyPowerSource(cnn)) {
            // power state should be true, update it if it isn't
            if (!myCurrentPwrState) {
                propagateTo.push({
                    cnn  : cnn,
                    state: true
                });
            }
        } else {
            // power state should be false, update it if it isn't
            if (myCurrentPwrState) {
                propagateTo.push({
                    cnn  : cnn,
                    state: false
                });
            }
        }
    }
    return Promise.each(propagateTo, function (values) {
        return values.cnn.handleCnnPwrStateUpdate(values.state, self);
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.getPowerStateOf = function (cnn) {
    var self = this;
    var cameCnnIndex = self.cnn.indexOf(cnn);
    if (cameCnnIndex < 0) {
        throw new Error('Conductor: Unknown connection: ', cnn);
    }
    if (self.pwrState[cameCnnIndex] !== undefined) {
        return self.pwrState[cameCnnIndex];
    } else {
        return false;
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.isTheOnlyPowerSource = function (cnn) {
    var self = this;
    var cnnIndex = self.cnn.indexOf(cnn);
    var pwrSourceCount = 0;
    for (var i = 0; i < self.cnn.length; ++i) {
        if (self.pwrState[i]) {
            ++pwrSourceCount;
        }
    }
    return pwrSourceCount == 1 && self.pwrState[cnnIndex];
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.clear = function () {
    var self = this;
    self.cnn      = null;
    self.pwrState = null;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.toString = function () {
    var self = this;
    return self.getValue() ? '1' : '0';
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Conductor.prototype.getValue = function () {
    var self = this;
    return self.value;
};

module.exports = Conductor;