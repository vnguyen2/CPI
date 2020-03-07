
// Add our dependencies
const gulp = require('gulp'); // Main Gulp module
const concat = require('gulp-concat'); // Gulp File concatenation plugin   
const connect = require('gulp-connect'); // Gulp Web server runner plugin
const open = require('gulp-open');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const del = require('del');


const configuration = {
        paths: {
            app: {
                html: './app/*.html',
                images: './app/images/*.*',
                scss: './app/scss/*.*',
            },
            dist: './dist'
        },
        localServer: {
            port: 3000,
            url: 'http://localhost:3000/'
        }
    };
    
//Gulp task to minify Images
function img(){
    return gulp
        .src(configuration.paths.app.images)
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
}

// Gulp task to copy HTML files to output directory
function html(){
    return gulp
        .src(configuration.paths.app.html)
        .pipe(gulp.dest(configuration.paths.dist))
        .pipe(connect.reload());
        
}

// Gulp task to concatenate our css files
function style(){
    return gulp
        .src(configuration.paths.app.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('main.css'))
        .pipe(gulp.dest(configuration.paths.dist + '/app/css'))
        .pipe(connect.reload());
}

// Gulp task to create a web server
function serverTask(done){
    connect.server({
        root: './dist',
        port: configuration.localServer.port,
        livereload: true
    })
    done();
}

//Gulp task to open default web browser
function openPage(){
    return gulp
        .src('dist/*.html')
        .pipe(open({uri: configuration.localServer.url}));
}

// Watch the file system and reload the website automatically
function watchFiles(done){
    gulp.watch(configuration.paths.app.html, html);
    done();
}


//delete files in directory
function clean(){
    return del(['dist']);   
}

// Gulp
const build = gulp.series(clean, gulp.parallel(html, style, img, serverTask), openPage, watchFiles);

//exports.img = img;
//exports.html = html;
//exports.style = style;
//exports.serverTask = serverTask;
//exports.openPage = openPage;
exports.watchFiles = watchFiles;
//exports.clean = clean;
//exports.build = build;
exports.default = build;
