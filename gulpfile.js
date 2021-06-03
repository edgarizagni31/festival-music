'use strict';

const { src, dest, watch, task, series } = require('gulp');

// html 
const htmlmin = require('gulp-htmlmin');

// css/sass
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

// js
const terser = require('gulp-terser');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

// images
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const notify = require('gulp-notify');

sass.compiler = require('dart-sass');

// fn task
function minimizerHtml() {
    return src('./public/index.html')
        .pipe( htmlmin({ collapseWhitespace: true }) )
        .pipe( notify({ message: 'minmizer HTML' }))
        .pipe( dest('./build/') )
}

function compilerSass() {
    return src('./src/sass/app.scss')
        .pipe( sass() )
        .pipe( dest('./build/static/css') );
}

function minimizerCSS() {
    return src('./src/sass/app.scss')
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ] ))
        .pipe( sourcemaps.write('.') )
        .pipe( notify({ message: 'minimizer css' }))
        .pipe( dest('./build/static/css') );
}

function watchSass() {
    watch('./src/sass/**/*.scss', minimizerCSS);
}

function minimizerImgs() {
    return src('./src/assets/images/**/*')
        .pipe( imagemin() )
        .pipe(  webp() )
        .pipe( notify({ message: 'minified image' }))
        .pipe( dest('./build/static/media/images') ) ;
}

function copyVideo () {
    return src( './src/assets/video/**/*' )
        .pipe( notify({ message: 'copy video' }) )
        .pipe( dest( './build/static/media/video' ) )
}

function js() {
    return src('./src/js/**/*')
        .pipe( sourcemaps.init() )
        .pipe( concat('bundle.js') )
        .pipe( babel() )
        .pipe( terser() )
        .pipe( rename( { suffix: '.min'} ))
        .pipe( sourcemaps.write('.') )
        .pipe( notify({ message: 'minimizer js' }) )
        .pipe( dest('./build/static/js') )
}

// register task

// html 
task('minimizer:html', minimizerHtml);

// sass
task('sass', compilerSass);
task('watch:sass', watchSass);

// css
task('minimizer:css', minimizerCSS);

// assets
task('minimizer:img', minimizerImgs);
task('copy:video', copyVideo);

// js
task('js',js);

// build
task('build', series(minimizerImgs,copyVideo,minimizerHtml,minimizerCSS,js))