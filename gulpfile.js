var gulp  = require('gulp'),
cssmin = require('gulp-cssmin'),
changed = require('gulp-changed'),
notify = require('gulp-notify'),
uglify = require('gulp-uglify'),
server = require( 'gulp-develop-server' ),
less = require('gulp-less')

var filepath = 'themes/basic/public/';
// gulp.task('all-css', function () {
//   gulp.src(filepath + 'uncomp/css/**/*.css')
//     .pipe(changed(filepath + 'stylesheets'), {hasChanged: changed.compareLastModifiedTime})
//     .pipe(cssmin())
//     .pipe(gulp.dest(filepath + 'stylesheets'))
//     .pipe(notify('CSS Compilation finished'));
// });

gulp.task('less', function(){ 
  return gulp.src(filepath + 'uncomp/less/main.less')
  .pipe(less({
      paths: [ filepath + 'uncomp/less/' ]
    }))
  .pipe(cssmin())
  .pipe(gulp.dest(filepath + '/stylesheets/css'))
  .pipe(notify('Less Compilation finished'));

}) 

gulp.task('all-js', function() {
  return gulp.src(filepath + 'uncomp/js/**/*.js')
    .pipe(changed(filepath + 'js'), {hasChanged: changed.compareLastModifiedTime})
    .pipe(uglify())
    .pipe(gulp.dest(filepath + 'js'))
    .pipe(notify('JS Compilation finished'));
});

//To start node server
gulp.task('start',function(){
  server.listen( { path: './app.js' } );
  // gulp.watch([filepath + 'uncomp/css/**/*.css'], ['all-css']);
  gulp.watch([filepath + 'uncomp/less/*.less'], ['less']);
  gulp.watch([filepath + 'uncomp/js/**/*.js'], ['all-js']);
  gulp.watch(['./app.js'], server.restart);  
  // gulp.watch([filepath + 'uncomp/css/css/*.css'], ['social-css']);
})

gulp.task('default',['start']);

// gulp.task('social-css', function() {
//   return gulp.src(filepath + 'uncomp/css/css/social-font.css')
//     .pipe(changed(filepath + 'stylesheets/css'), {hasChanged: changed.compareLastModifiedTime})
//     .pipe(cssmin())
//     .pipe(gulp.dest(filepath + 'stylesheets/css'))
//     .pipe(notify('Social Font CSS Compilation finished'));
// })
