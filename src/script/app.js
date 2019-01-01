'use strict';

var $    = require('jquery');
var Root = require('./lib/Root');

window.debugMode = true;

$(function () {
    var root = new Root({id: 'main'});

    root.init().catch(function (err) {
        console.error('App: Failed to init app:', err.stack);
    });
});