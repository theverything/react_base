var gulp = require('gulp');

var scss = require('gulp-ruby-sass');
var uglify = require('gulp-uglify');
var cssMinify = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var notify = require('gulp-notify');

var paths = {
  scss: 'public/scss/main.scss',
  css: 'bower_components/normalize-css/normalize.css',
  scripts: 'bower_components/jquery/jquery.js',
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

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(gulp.dest('public/js/vendor'))
    .pipe(notify("js uglified"));
});

gulp.task('watch', function() {
  var server = livereload();
  gulp.watch(paths.scss, ['scss']).on('change', function (file) {
    server.changed(file.path);
  });
  gulp.watch(paths.html).on('change', function (file) {
    server.changed(file.path);
  });
});

gulp.task('default', ['scss', 'css', 'scripts', 'watch']);
