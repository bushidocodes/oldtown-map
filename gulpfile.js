'use strict';

// Gulp 5 build pipeline for oldtown-map.
//
// Migrated from gulp 3.9.1, which aborted on Node >= 12 with
// "ReferenceError: primordials is not defined" (gulp 3's graceful-fs/natives
// chain relied on a global that became internal in Node 12). See issue #22.
//
// Notes on the migration:
//   * Task dependency arrays (gulp.task('default', ['a', 'b'])) are not
//     supported in gulp 4+, so composition now uses series()/parallel().
//   * Every task returns its stream so gulp can detect completion.
//   * gulp 5 reads files as UTF-8 by default; binary assets (images) must be
//     read with { encoding: false } to avoid corruption.
//   * The old `bower` task and the abandoned lint plugins were removed. The
//     vendor libraries (jQuery, Bootstrap, Knockout, Knockstrap) are vendored
//     under dist/bower_components and referenced directly by dist/index.html.

const { src, dest, parallel } = require('gulp');
const changed = require('gulp-changed');
const concat = require('gulp-concat');
const htmlmin = require('gulp-html-minifier-terser');
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const replace = require('gulp-replace');
require('dotenv').config();

// Define the directory structure of the project
const htmlSrc = './src/*.html';
const cssSrc = './src/css/*.css';
const jsSrc = './src/js/*.js';
const imgSrc = './src/images/*.png';
const buildDir = './dist';

// Minify new or changed HTML pages, injecting secrets from .env
function html() {
    return src(htmlSrc)
        .pipe(replace('%%MAPS_API_KEY%%', process.env.MAPS_API_KEY || ''))
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(dest(buildDir));
}

// Transpile ES2015+ via Babel, then concatenate into a single bundle
function js() {
    return src(jsSrc)
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(concat('scripts.js'))
        .pipe(dest(buildDir + '/js/'));
}

// Concatenate and minify CSS
function css() {
    return src(cssSrc)
        .pipe(concat('styles.css'))
        .pipe(cleanCSS())
        .pipe(dest(buildDir + '/css/'));
}

// Copy images to dist (encoding: false keeps binary assets intact under gulp 5)
function images() {
    return src(imgSrc, { encoding: false })
        .pipe(dest(buildDir + '/images/'));
}

const build = parallel(html, css, js, images);

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.build = build;
exports.default = build;
