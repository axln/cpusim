'use strict';

const util       = require('util');
const TaskHelper = require('./TaskHelper');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function (debug) {
    if (debug) {
        console.log('Vendor mode: debug');
    } else {
        console.log('Vendor mode: release');
    }

    if (debug) {
        var outputFileName = 'build/js/vendor.js';
        return TaskHelper.mkdirp('build/js').then(function () {
            var params = ['jquery', 'aigle', 'aigle/each'].map(function (mod) {
                return '-r ' + mod;
            }).join(' ');

            var cmd = util.format(
                'browserify -d %s > %s',
                params,
                outputFileName
            );
            return TaskHelper.exec(cmd);
        });
    } else {
        console.log('Vendor script is not needed. It is included in main scripts module.');
        return Promise.resolve();
    }
};