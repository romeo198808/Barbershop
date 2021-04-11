var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var postcss= require('gulp-postcss');
var autoprefixer= require('autoprefixer');
var server = require('browser-sync').create();


gulp.task('style', function () {
  return gulp.src('work/less/style.less')
  .pipe(plumber())
  .pipe(less())
  .pipe(postcss([autoprefixer()]))
  .pipe(gulp.dest('work/css'))
  .pipe(server.stream())
})

gulp.task('serve', function () {
  server.init({
    server: "work",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('work/less/**/*.less', gulp.series('style')).on('change', server.reload);
  gulp.watch('work/*.html').on('change', server.reload);
});

gulp.task('start', gulp.series('style', 'serve'));
