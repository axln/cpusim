'use strict';

const gulp     = require('gulp-param')(require('gulp'), process.argv, 'cb');
const del      = require('del');
const pug      = require('gulp-pug');
const less     = require('gulp-less');
const css      = require('gulp-clean-css');
const concat   = require('gulp-concat');
const bro      = require('gulp-bro');
const uglify   = require('gulp-uglify');
const collapse = require('bundle-collapser/plugin');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('clean', function () {
    return del([
        'build/css/style.css',
        'build/js/script.js',
        'build/index.html'
    ]);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('html', function () {
    return gulp.src('src/html/index.pug')
        .pipe(pug({
            locals: {
                version: Math.random().toString(16).substring(2, 15) // to refresh js on every change
            },
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('style', function () {
    return gulp.src([
        'src/style/lib/*.less',
        'src/style/general/*.less',
        'src/style/layout/*.less',
        'src/style/page/**/*.less',
        'src/style/*.less'
    ])
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(css())
        .pipe(gulp.dest('build/css'));
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('script', function (debug) {
    if (debug) {
        return gulp.src([
            'src/script/_dev.js',
            'src/script/app.js'
        ])
            .pipe(bro())
            .pipe(concat('script.js'))
            .pipe(gulp.dest('build/js'));
    } else {
        return gulp.src(['src/script/app.js'])
            .pipe(bro({plugin: [collapse]}))
            .pipe(concat('script.js'))
            .pipe(uglify({mangle: {reserved: ['jQuery']}}))
            .pipe(gulp.dest('build/js'));
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
gulp.task('build', ['style', 'script', 'html']);
gulp.task('default', ['build']);