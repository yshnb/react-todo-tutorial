var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('js', function() {
  browserify('./src/app.js')
    .transform(reactify)
    .bundle()
    .pipe(source('refined.js'))
    .pipe(gulp.dest('./assets'));
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*.js'], ['js']);
});

