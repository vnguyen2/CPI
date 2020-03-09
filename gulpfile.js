
const gulp = require('gulp'); 
const browsersync = require("browser-sync").create();
const sass = require('gulp-sass');
const del = require('del');

const imgSrc = 'app/images/*.*',
      cssSrc = 'app/scss/*.scss',


function browserSync(done) {
    browsersync.init({
        server: {
            baseDir:'./app'
        },
        port:3000
    });
    done();
}

function browserSyncReload(done){
    browsersync.reload();
    done();
}
    
function style(){
    return gulp
        .src(cssSrc)
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browsersync.stream());
}

function watchFiles(done){
    gulp.watch(cssSrc, style);
    gulp.watch(imgSrc);
    gulp.watch('/app/**/*', gulp.series(browsersync.reload));
    done();
}


function clean(){
    return del(['css/**']);   
}


const build = gulp.series(clean, gulp.parallel(style, watchFiles, browserSync));


exports.style = style;
exports.default = build;
