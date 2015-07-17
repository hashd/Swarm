var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  handlebars = require('gulp-handlebars'),
  wrap = require('gulp-wrap'),
  declare = require('gulp-declare'),
  concat = require('gulp-concat');

var paths = {
  'swarm:src': ['js/namespace.js', 'js/**/*.js'],
  'swarm:templates': ['templates/*.hbs']
};

var options = {
  'declare:templates': {
    namespace: 'Swarm.templates',
    noRedeclare: true
  }
};

gulp.task('build:src', function () {
  gulp.src(paths['swarm:src'])
    .pipe(concat('swarm.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(concat('swarm.min.js'))
    .pipe(gulp.dest('build/js'))
});

gulp.task('build:templates', function () {
  gulp.src(paths['swarm:templates'])
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare(options['declare:templates']))
    .pipe(concat('swarm.templates.js'))
    .pipe(gulp.dest('build/js'));/*
    .pipe(uglify('swarm.templates.min.js'))
    .pipe(gulp.dest('build/js'));*/
});

gulp.task('watch:src', function () {
  gulp.watch(paths['swarm:src'], ['build:src']);
});

gulp.task('watch:templates', function () {
  gulp.watch(paths['swarm:templates', ['build:templates']]);
})

gulp.task('default', ['build:src', 'build:templates', 'watch:src', 'watch:templates']);
