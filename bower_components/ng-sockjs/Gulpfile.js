var gulp       = require('gulp');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
 
gulp.task('default', function() {
    return gulp.src('src/*.js')
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('dist'));
});