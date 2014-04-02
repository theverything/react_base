var gulp = require('gulp');

var scss = require('gulp-ruby-sass');

var paths = {
  scss: 'public/scss/main.scss'
};

gulp.task('scss', function() {
  // Compile scss to css
  return gulp.src(paths.scss)
    .pipe(scss({
      sourcemap: true,
      style: 'expanded',
      lineNumbers: true
    }))
    .pipe(gulp.dest('public/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scss, ['scss']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'images', 'watch']);
