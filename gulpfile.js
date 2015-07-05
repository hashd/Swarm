var gulp = require('gulp'),
   uglify = require('gulp-uglify');

gulp.task('minify', function () {
   gulp.src('js/utils.js')
      .pipe(uglify())
      .pipe(gulp.dest('build'))
});