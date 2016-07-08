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


// minify new or changed HTML pages
gulp.task('html', function () {
    var htmlSrc = './*.html',
        htmlDst = './dist';

    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});



// gulp.task('default', () => {
//     return gulp.src('src/app.js')

//         .pipe(gulp.dest('dist'));
// });

// Strip debugging, Transpile via Babel, concat, and minify
gulp.task('js', function () {
    gulp.src(['./js/*.js'])
        .pipe(stripDebug())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(concat('scripts.js'))

        // .pipe(uglify())  //unsure why this is failing... commented out for now
        .pipe(gulp.dest('./dist/js/'));
});

// include plug-ins


// CSS concat, auto-prefix and minify
gulp.task('css', function () {
    gulp.src(['./css/*.css'])
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./dist/css/'));
});

// include plug-ins
var bower = require('gulp-bower');

// install bower components
gulp.task('bower', function () {
    return bower().pipe(gulp.dest('./dist/bower_components'));
});

gulp.task('default', ['html','css','js','bower']);