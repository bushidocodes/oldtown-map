// include gulp
var gulp = require('gulp');

// // include plug-ins
// var jshint = require('gulp-jshint');

// // JS hint task
// gulp.task('jshint', function() {
//   gulp.src('./src/scripts/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'));
// });

// include plug-ins
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var minifyHTML = require('gulp-minify-html');
var cleanCSS = require('gulp-clean-css');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var bower = require('gulp-bower');
// var watchify = require('watchify');
// var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
// var browserify = require('browserify');
var html5Lint = require('gulp-html5-lint');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');

// Define directory structure of project
var htmlSrc = './src/*.html';
var cssSrc = './src/css/*.css';
var jsSrc = './src/js/*.js';
var imgSrc = './src/images/*.png';
var buildDir = './dist';


// minify new or changed HTML pages
gulp.task('html', function () {

    gulp.src(htmlSrc)
        .pipe(changed(buildDir))
        .pipe(minifyHTML())
        .pipe(gulp.dest(buildDir));
});

// Strip debugging, Transpile via Babel, concat, and minify
gulp.task('js', function () {
    gulp.src([jsSrc])
        .pipe(stripDebug())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))

        // .pipe(uglify())  //unsure why this is failing... commented out for now
        .pipe(gulp.dest(buildDir + '/js/'));
});

// CSS concat, auto-prefix and minify
gulp.task('css', function () {
    gulp.src([cssSrc])
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildDir + '/css/'));
});

// copy images to dist
gulp.task('images', function () {
    gulp.src([imgSrc])
        .pipe(gulp.dest(buildDir + '/images/'));
});

// install bower components
gulp.task('bower', function () {
    // console.log(buildDir + '/bower_components');
    return bower({
        directory: './dist/bower_components',
        // cwd: './dist'
    })
        .pipe(gulp.dest(buildDir + '/bower_components'));
});

gulp.task('html5-lint', function () {
    return gulp.src(htmlSrc)
        .pipe(html5Lint()).on('error', function (err, results) {
            console.log(err.message);
        });
});

gulp.task('css-lint', function () {
    // gulp.src(buildDir + '/css/*.css')
    gulp.src(cssSrc)
        .pipe(csslint())
        .pipe(csslint.reporter());
});


gulp.task('js-hint', function () {
    // return gulp.src(buildDir + '/js/*.js')
        return gulp.src(jsSrc)
        .pipe(jshint({ esversion: 6 }))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('lint', ['html5-lint', 'css-lint', 'js-hint']);

gulp.task('default', ['html', 'css', 'js', 'images', 'bower']);