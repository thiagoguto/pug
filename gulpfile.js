var gulp = require('gulp'),
    gulpSass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    gulpPug = require('gulp-pug'),
    browserSync = require('browser-sync').create();
// caminhos
var paths = {
    public: "./www/",
    dev: "./src/dev/",
    uikit: "./node_modules/uikit/dist/js/",
    pug: "./src/pug/",
    sass: "./src/sass/",
    js: "./www/assets/js/",
    css: "./www/assets/css/",
    images: "./src/img/",
    img: "./www/assets/img/"
}
// images
gulp.task('img', function(){
    return gulp.src(paths.images + '*.*')
        .pipe(gulp.dest(paths.img));
    })
// pug
gulp.task('pug', function () {
return gulp.src(paths.pug + '*.pug')
    .pipe(gulpPug({
        pretty: true
    }))
    .on('error', function (err) {
    process.stderr.write(err.message + '\n');
    this.emit('end');
    })
    .pipe(gulp.dest(paths.public));
});
// sass
gulp.task('sass', function () {
return gulp.src(paths.sass + '*.sass')
    .pipe(gulpSass({
        includePaths: [paths.sass],
        outputStyle: 'compressed'
    }))
    .on('error', gulpSass.logError)
    .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
        cascade: true
    }))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.reload({
        stream: true
    }));
});
// javascript
gulp.task('js', function(){
return gulp.src(paths.uikit + '*.min.js')
    .pipe(gulp.dest(paths.js));
})
// browsersync
gulp.task('server', ['sass', 'pug'], function () {
browserSync.init({
    server: {
        baseDir: paths.public
        },
        notify: false
    });
});
gulp.task('build', ['sass', 'pug']);
gulp.task('rebuild', ['pug'], function () {
    browserSync.reload();
});
gulp.task('watch', function () {
    gulp.watch(paths.sass + '**/*.sass', ['sass']);
    gulp.watch('./src/pug/**/*.pug', ['rebuild']);
});


gulp.task('default',['img', 'js', 'server', 'watch'] )