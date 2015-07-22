var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  handlebars = require('gulp-handlebars'),
  wrap = require('gulp-wrap'),
  declare = require('gulp-declare'),
  concat = require('gulp-concat'),
  minify_css = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  manifest = require('./manifest.json'),
  project = require('./package.json'),
  crx = require('gulp-crx'),
  fs = require('fs');

var paths = {
  'swarm:js:src': ['js/namespace.js', 'js/**/*.js'],
  'swarm:templates:src': ['templates/*.hbs'],
  'swarm:css:src': ['css/feeds.css', 'css/profile.css', 'css/overrides.css', 'css/loading.css', 'css/templates.css'],
  'swarm:plugin:src': ['build/**/*', 'img/**/*', 'libs/css/**/*', 'libs/js/**/*', 'oauth2/**/*', 'background.js', 'popup.js', 'manifest.json', 'home.html']
};

var options = {
  'declare:templates': {
    namespace: 'Swarm.templates',
    noRedeclare: true
  }
};

gulp.task('move:fonts', function () {
  gulp.src(['libs/fonts/**/*'], { base: 'libs' })
    .pipe(gulp.dest('build'));
});

gulp.task('move:plugin:src', function () {
  gulp.src(paths['swarm:plugin:src'], { base: './' })
    .pipe(gulp.dest('dist'));
});

gulp.task('build:js', function () {
  gulp.src(paths['swarm:js:src'])
    .pipe(concat('swarm.js'))
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(concat('swarm.min.js'))
    .pipe(gulp.dest('build/js'));
});

gulp.task('build:css', ['move:fonts'], function () {
  gulp.src(paths['swarm:css:src'])
    .pipe(concat('swarm.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(minify_css())
    .pipe(concat('swarm.min.css'))
    .pipe(gulp.dest('build/css'));
});

gulp.task('build:src', ['build:js', 'build:css']);

gulp.task('build:templates', function () {
  gulp.src(paths['swarm:templates:src'])
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare(options['declare:templates']))
    .pipe(concat('swarm.templates.js'))
    .pipe(gulp.dest('build/js'));/*
    .pipe(uglify('swarm.templates.min.js'))
    .pipe(gulp.dest('build/js'));*/
});

gulp.task('watch:src', function () {
  gulp.watch(paths['swarm:js:src'].concat(paths['swarm:css:src'])
    , ['build:src']);
});

gulp.task('watch:templates', function () {
  gulp.watch(paths['swarm:templates:src', ['build:templates']]);
});

gulp.task('create:dist', ['build:src', 'build:templates', 'move:plugin:src']);
gulp.task('create:crx', ['create:dist'], function() {
  return gulp.src('./dist')
    .pipe(crx({
      privateKey: fs.readFileSync('./dist.pem', 'utf8'),
      filename: manifest.name + '-' + project.version + '.crx',
      codebase: '.',
      updateXmlFilename: 'update.xml'
    }))
    .pipe(gulp.dest('./releases'));
});
gulp.task('release', ['create:crx']);

gulp.task('default', ['build:src', 'build:templates', 'watch:src', 'watch:templates']);
