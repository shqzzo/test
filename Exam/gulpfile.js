'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require("gulp-notify");
const concatCss = require('gulp-concat-css');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(notify(":)"));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/scss/style.scss', gulp.series('sass'));
});

gulp.task('build:css', function () {
    return gulp.src('src/css/*.css')
        .pipe(concatCss("main.css"))
        .pipe(gulp.dest('dist/css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(notify(":)"));
});

gulp.task('build:img', function () {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(notify(":)"));
});

gulp.task('build:js', function() {
    return gulp.src('src/js/script.js')
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(notify(":)"));
});