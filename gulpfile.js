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

// Define directory structure of project
var htmlSrc = './*.html';
var cssSrc = './css/*.css';
var jsSrc = './js/*.js';
var imgSrc = './images/*.png';
var buildDir = './dist';


// minify new or changed HTML pages
gulp.task('html', function () {

    gulp.src(htmlSrc)
        .pipe(changed(buildDir))
        .pipe(minifyHTML())
        .pipe(gulp.dest(buildDir));
});



// gulp.task('default', () => {
//     return gulp.src('src/app.js')

//         .pipe(gulp.dest('dist'));
// });

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
    return bower().pipe(gulp.dest(buildDir + '/bower_components'));
});

gulp.task('default', ['html','css','js','images','bower']);