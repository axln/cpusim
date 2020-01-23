'use strict';

const gulp     = require('gulp');
const less     = require('gulp-less');
const concat   = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

const TaskHelper = require('./TaskHelper');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
module.exports = function () {
    return TaskHelper.mkdirp('build/css').then(function () {
        return gulp.src([
            'src/style/lib/*.less',
            'src/style/general/*.less',
            'src/style/layout/*.less',
            'src/style/page/**/*.less',
            'src/style/*.less'
        ])
            .pipe(less())
            .pipe(concat('styles.css'))
            .pipe(cleanCSS())
            .pipe(gulp.dest('build/css'));
    });
};