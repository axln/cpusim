'use strict';

const del = require('del');

module.exports = function () {
    return del([
        'build/css/styles.css',
        'build/js/scripts.js',
        'build/index.html'
    ]);
};