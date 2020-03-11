
const gulp = require('gulp'); 
const browserSync = require("browser-sync").create();
const del = require('del');
const sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      sourcemaps = require('gulp-sourcemaps'),
      cssnano = require ('cssnano');

const cssSrc = 'app/scss/*.scss';

function reload(done) {
    browserSync.reload();
    done();
}
    
function style() {
    return gulp
        .src(cssSrc)
        .pipe(sourcemaps.init())
        .pipe(sass()).on('error', sass.logError)
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
}

function watch(done) {
    browserSync.init({
        server: {
            baseDir: "./app"
        },
        port:3000
    });
    gulp.watch(cssSrc, style);
    gulp.watch('./app/*.html', reload);
    done();
}

function clean(){
    return del(['app/css/**', '!public']);   
}

const build = gulp.series(clean, gulp.parallel(style, watch));

exports.clean = clean;
exports.style = style;
exports.watch = watch;
exports.default = build;
