const {src, dest, parallel, series} = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const csso = require('gulp-csso');
const uglify = require('gulp-uglify-es').default;

function cleanTask() {
  return del('dist/');
}

function htmlTask() {
  return src('src/*.html')
    .pipe(dest('dist/'));
}

function stylesTask() {
  return src('src/styles/*.css')
    .pipe(csso())
    .pipe(concat('all.css'))
    .pipe(dest('dist/styles/'));
}

function scriptTask() {
  return src('src/scripts/*.js')
    .pipe(uglify())
    .pipe(concat('all.js'))
    .pipe(dest('dist/scripts/'));
}

exports.clean = cleanTask;
exports.html = htmlTask;
exports.styles = stylesTask;
exports.scripts = scriptTask;
exports.default = series( cleanTask, parallel(htmlTask, stylesTask, scriptTask));