'use strict'

var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./scss/style.scss')
  .pipe(sass({
    includePaths: ['node_modules']
  }).on('error', sass.logError))
  .pipe(gulp.dest('./public/css'))
  .pipe(sass({outputStyle: 'compressed'}))
  .pipe(concat('style.min.css'))
  .pipe(gulp.dest('./public/css'));
});

// Watching SCSS files
gulp.task('sass:watch', ['sass'], function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['sass:watch']);