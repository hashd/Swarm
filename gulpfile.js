var gulp = require('gulp'),
   uglify = require('gulp-uglify'),
   concat = require('gulp-concat');

var paths = {
  'swarm:src': ['src/js/namespace.js', 'src/js/**/*.js'],
  'swarm:build:dest': 'build/js'
}

var options = {

}

gulp.task('build:src', function () {
  gulp.src(paths['swarm:src'])
    .pipe(concat('swarm.js'))
    .pipe(gulp.dest(paths['swarm:build:dest']))
    .pipe(uglify())
    .pipe(concat('swarm.min.js'))
    .pipe(gulp.dest(paths['swarm:build:dest']))
});

gulp.task('watch:src', function () {
  gulp.watch(paths['swarm:src'], ['build:src']);
});

gulp.task('default', ['build:src', 'watch:src']);
