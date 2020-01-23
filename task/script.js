'use strict';

const util       = require('util');
const TaskHelper = require('./TaskHelper');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function (debug) {
    if (debug) {
        console.log('Scripts mode: debug');
    } else {

        console.log('Scripts mode: release');
    }
    return TaskHelper.mkdirp('build/js').then(function () {
        var params;
        if (debug) {
            params = ['jquery', 'aigle', 'aigle/each'].map(function (item) {
                return '-x ' + item;
            }).join(' ');
        } else {
            params = '';
        }

        var cmd;
        if (debug) {
            cmd = util.format(
                'browserify %s -d %s > %s',
                params,
                'src/script/_dev.js src/script/app.js',
                'build/js/scripts.js'
            );
        } else {
            cmd = util.format(
                'browserify  %s %s | uglifyjs -m > %s',
                params,
                'src/script/app.js',
                'build/js/scripts.js'
            );
        }
        return TaskHelper.exec(cmd);
    });
};