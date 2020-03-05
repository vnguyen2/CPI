
// Add our dependencies
const gulp = require('gulp'); // Main Gulp module
const concat = require('gulp-concat'); // Gulp File concatenation plugin   
const connect = require('gulp-connect'); // Gulp Web server runner plugin
const open = require('gulp-open');

const configuration = {
        paths: {
            app: {
                html: './app/*.html',
                css: [
                    './app/css/main.css'
                ]
            },
            dist: './dist'
        },
        localServer: {
            port: 3000,
            url: 'http://localhost:3000/'
        }
    };
    

// Gulp task to copy HTML files to output directory
function html(){
    return gulp
        .src(configuration.paths.app.html)
        .pipe(gulp.dest(configuration.paths.dist))
        .pipe(connect.reload());
        
}

// Gulp task to concatenate our css files
function css(){
    return gulp
        .src(configuration.paths.app.css)
        .pipe(concat('site.css'))
        .pipe(gulp.dest(configuration.paths.dist + '/css'))
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
        .src('dist/index.html')
        .pipe(open({uri: configuration.localServer.url}));
}

// Watch the file system and reload the website automatically
function watchFiles(done){
    gulp.watch(configuration.paths.app.html, html);
    gulp.watch(configuration.paths.app.css, css);
    done()
}

// Gulp
const build = gulp.series(html, css, serverTask, openPage, watchFiles);

exports.html = html;
exports.css = css;
exports.serverTask = serverTask;
exports.openPage = openPage;
exports.watchFiles = watchFiles;
exports.build = build;
exports.default = build;
