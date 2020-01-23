'use strict';

const gulp       = require('gulp-param')(require('gulp'), process.argv, 'cb');
const pug        = require('gulp-pug');
const TaskHelper = require('./TaskHelper');

////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function (debug) {
    return TaskHelper.mkdirp('build').then(function () {
        return gulp.src('src/html/index.pug')
            .pipe(pug({
                locals: {
                    debug   : debug,
                    title  : 'CPUSIM',
                    version: TaskHelper.randomStr()
                },
                pretty: debug
            }))
            .pipe(gulp.dest('build'));
    });
};