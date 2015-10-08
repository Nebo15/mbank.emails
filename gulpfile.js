var gulp        = require('gulp'),
    inline      = require('gulp-inline'),
    inlineCSS   = require('gulp-inline-css'),
    pngquant    = require('imagemin-pngquant'),
    imagemin    = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    inlineimg   = require('gulp-inline-image');

gulp.task('server', ['build', 'watch'], function() {
    browserSync({
        server: {
            baseDir: 'build',
            index: 'intercom.html'
        },
        files: ["build/**/*"],
        port: 8080,
        open: true,
        notify: false,
        ghostMode: false
    });
});

gulp.task('imagemin', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('build', ['imagemin'], function() {
    return gulp.src('src/*.html')
        .pipe(inline({
            base: 'src/',
            disabledTypes: ['css', 'js']
        }))
        .pipe(inlineCSS({
            applyStyleTags: true,
            applyLinkTags: true,
            removeStyleTags: true,
            removeLinkTags: true
        }))
        .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*'], ['build']);
});

gulp.task('default', ['server']);
