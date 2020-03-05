
// Add our dependencies
const gulp = require('gulp'), // Main Gulp module
    browsersync = require("browser-sync").create();
    concat = require('gulp-concat'), // Gulp File concatenation plugin
    open = require('gulp-open'), // Gulp browser opening plugin
    connect = require('gulp-connect'); // Gulp Web server runner plugin

// BrowserSync
function browserSync(done) {
    browsersync.init({
      server: {
        baseDir: "./app/"
      },
      port: 3000
    });
    done();
  }
  
  // BrowserSync Reload
  function browserSyncReload(done) {
    browsersync.reload();
    done();
  }

// Gulp task to copy HTML files to output directory
function html(){
    gulp.src(configuration.paths.app.html)
        .pipe(gulp.dest(configuration.paths.dist))
        .pipe(connect.reload());
}

// Gulp task to concatenate our css files
function css(){
    gulp.src(configuration.paths.app.css)
        .pipe(concat('site.css'))
        .pipe(gulp.dest(configuration.paths.dist + '/css'))
        .pipe(connect.reload());
}

// Gulp task to create a web server
function connect(){
    connect.server({
        root: 'dist',
        port: 3000,
        livereload: true
    })
}

// Watch the file system and reload the website automatically
function watch(){
    gulp.watch(configuration.paths.app.html, ['html']);
    gulp.watch(configuration.paths.app.css, ['css']);
    gulp.series(browserSyncReload);
}

// Gulp
const build = gulp.parallel(html, css);
const watch = gulp.parallel(watch, browserSync);
