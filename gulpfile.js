var gulp = require('gulp'),
   uglify = require('gulp-uglify'),
   concat = require('gulp-concat');

var paths = {
  'swarm:src': ['js/namespace.js', 'js/**/*.js']
}

var options = {

}

gulp.task('build:src', function () {
  gulp.src(paths['swarm:src'])
    .pipe(concat('swarm.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(concat('swarm.min.js'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('watch:src', function () {
  gulp.watch(paths['swarm:src'], ['build:src']);
});

gulp.task('default', ['build:src', 'watch:src']);
