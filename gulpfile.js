var path = require('path'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    changed = require('gulp-changed'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minifycss = require('gulp-minify-css'),
    jade = require('gulp-jade'),
    rimraf = require('gulp-rimraf'),
    gulpCoffee = require('gulp-coffee');

var BUILD_PATH = 'public',
    paths = {
        jade: 'src/tpls/index.jade',
        sass: 'src/styles/**/*.scss',
        scripts: [
            'src/app/module_1.coffee',
            'src/app/module_2.coffee',
            'src/app/main.coffee',
        ]            
    };

// ------------------------------------------------
// - Tasks
// ------------------------------------------------
gulp.task('clean', function () {
  return gulp.src(BUILD_PATH + '/**/*', { read: false })
    .pipe(rimraf({ force: true }));
});

gulp.task('jade', function () {
  return gulp.src(paths.jade)
    .pipe(changed(BUILD_PATH, { extension: '.html' }))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('coffee', function() {
  gulp.src(paths.scripts)
    .pipe(gulpCoffee({bare: true}).on('error', gutil.log))
    .pipe(changed(BUILD_PATH + '/assets/js'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest(BUILD_PATH + '/assets/js'));
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
    .pipe(concat('main.css'))
    .pipe(sass({ errLogToConsole: true }))
    //.pipe(minifycss())
    .pipe(gulp.dest(BUILD_PATH + '/assets/styles'));
});


/**steps:  
    1 clear bulid path
    2 join all scss file --> compile to "main.css" --> copy to bulid path 
    3 join all coffee file --> compile to "main.js" --> copy to bulid path
    4 compile index.jade to index.html  --> copy to bulid path 
**/
gulp.task('default', ['clean'], function () {
  gulp.start('sass', 'coffee', 'jade');
});