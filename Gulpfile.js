var jshint  = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gulp    = require('gulp');

gulp.task('default', function() {
    return gulp.src('./*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});