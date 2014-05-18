var gulp = require('gulp');

var scss = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var cssMinify = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');
var browserify = require('gulp-browserify');
var gulputil = require('gulp-util');
var concat = require('gulp-concat');
var react = require('gulp-react');
var rename = require('gulp-rename');

var paths = {
  scss: 'scss/main.scss',
  css: 'bower_components/normalize-css/normalize.css',
  modules: ['js/modules/main.js'],
  scripts: ['bower_components/jquery/jquery.js','js/app.js'],
  html: 'public/index.html'
};

gulp.task('scss', function() {
  return gulp.src(paths.scss)
    .pipe(scss({
      sourcemap: true,
      style: 'expanded',
      lineNumbers: true
    }))
    .pipe(gulp.dest('public/css'))
    .pipe(notify("scss compiled"));
});

gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(cssMinify())
    .pipe(gulp.dest('public/css/vendor'))
    .pipe(notify("css minified"));
});

gulp.task('browserify', function (cb) {
  return gulp.src(paths.modules)
    .pipe(browserify({
      transform: ["reactify"]
    }))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('js'))
    .pipe(notify("modules browserified"));
    cb(err);
});

gulp.task('uglify', ['browserify'], function () {
  return gulp.src(paths.scripts)
    .pipe(concat('all.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('public/js'))
    .pipe(notify("js uglified"));
});

gulp.task('scripts', ['browserify', 'uglify']);

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(paths.scss, ['scss']).on('change', function (file) {
    server.changed(file.path);
  });
  gulp.watch('./js/modules/**/*.js', ['scripts']).on('change', function (file) {
    server.changed(file.path);
  });
  gulp.watch(paths.html).on('change', function (file) {
    server.changed(file.path);
  });
});

gulp.task('build', ['scss', 'css', 'scripts']);

gulp.task('default', ['build', 'watch']);
