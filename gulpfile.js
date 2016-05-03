// Load plugins
var gulp       	 = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	compass      = require('gulp-compass'),
	concat       = require('gulp-concat'),
	imagemin     = require('gulp-imagemin'),
	jshint       = require('gulp-jshint'),
	minifyCSS    = require('gulp-minify-css'),
	notify       = require('gulp-notify'),
	plumber      = require('gulp-plumber'),
	rename       = require('gulp-rename'),
	sass         = require('gulp-sass'),
	uglify       = require('gulp-uglify'),
	gutil        = require('gulp-util'),
	livereload   = require('gulp-livereload')

// Gulp notification title
var notifyInfo = {
	title: 'Gulp'
};

// Error notifications for plumber
var plumberErrorHandler = { errorHandler: notify.onError({
    title: notifyInfo.title,
    message: "Error: <%= error.message %>"
  })
};

/*************
Styles task:
	* Compile Sass
	* Add vendor prefixes
	* Minify CSS
	* Add compiled CSS file to CSS build directory
	* Add compiled and minified CSS file to main CSS directory
***************/

gulp.task('styles', function () {
  gulp.src('./source/stylesheets/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'iOS 7'))
    .pipe(gulp.dest('./source/stylesheets/build'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./source/stylesheets'))
    .pipe(notify({message: 'Styles task complete.'}));
});

/*************
Scripts task:
	* Combine JS files from source directory
  * Validate JS
	* Minify JS
	* Uglify JS
	* Add add minified JS file to build directory
	* Add uglified and minified JS file to main JS directory
***************/
gulp.task('scripts', function() {
  return gulp.src('./source/javascripts/source/*.js')
  .pipe(plumber(plumberErrorHandler))
  .pipe(concat('main.js'))
  .pipe(jshint('.jshintrc'))
  .pipe(jshint.reporter('default'))
  .pipe(gulp.dest('./source/javascripts/build'))
  .pipe(uglify())
  .pipe(gulp.dest('./source/javascripts'))
  .pipe(notify({ message: 'Scripts task complete.' }));
});

/*************
Scripts task:
	* Combine plugin JS files from plugin directory
	* Minify JS
	* Uglify JS
	* Add add minified JS file to build directory
	* Add uglified and minified JS file to main JS directory
***************/
gulp.task('plugins', function() {
  return gulp.src('./source/javascripts/plugins/**/*.js')
  .pipe(plumber(plumberErrorHandler))
  .pipe(concat('plugins.js'))
  .pipe(gulp.dest('./source/javascripts/build'))
  .pipe(uglify())
  .pipe(gulp.dest('./source/javascripts'))
  .pipe(notify({ message: 'Plugins task complete.' }));
});

// Watch specified directories for changes, run tasks and reload browser
gulp.task('watch', function(){
	livereload.listen();
  gulp.watch(['./source/stylesheets/**/*.scss'], ['styles']);
  gulp.watch(['./source/javascripts/source/*.js'], ['scripts']);
  gulp.watch(['./source/javascripts/plugins/**/*.js'], ['plugins']);
  gulp.watch(['./sources/stylesheets/style.css', './source/javascripts/*.js'], function(files){
  	livereload.changed(files)
  });
});

// Set up default task 
gulp.task('default', ['styles', 'scripts', 'plugins', 'watch']);

