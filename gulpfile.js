const {src, dest, parallel, series} = require('gulp');

function htmlTask() {
  return src('src/*.html')
    .pipe(dest('dist/'));
}

function stylesTask() {
  return src('src/styles/*.css')
    .pipe(dest('dist/style/'));
}

function scriptTask() {
  return src('src/scripts/*.js')
    .pipe(dest('dist/scripts/'));
}

exports.html = htmlTask;
exports.styles = stylesTask;
exports.scripts = scriptTask;
exports.default = series( parallel(htmlTask, stylesTask, scriptTask))