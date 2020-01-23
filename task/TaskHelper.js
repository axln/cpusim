'use strict';

module.exports = TaskHelper;

const child_process = require('child_process');
const Promise       = require('aigle');
const mkdirp        = require('mkdirp');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TaskHelper() {}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TaskHelper.mkdirp = Promise.promisify(mkdirp);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TaskHelper.exec = function (cmd, options) {
    return new Promise(function (resolve, reject) {
        console.log('Exec command:', cmd);
        child_process.exec(cmd, options, function (err, stdout, stderr) {
            if (stdout) {
                console.log('stdout:', stdout);
            }
            if (stderr) {
                console.error('stderr:', stderr);
            }
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
TaskHelper.randomStr = function () {
    return Math.random().toString(16).substring(2, 15);
};