var gulp        = require('gulp'),
    inline      = require('gulp-inline'),
    inlineCSS   = require('gulp-inline-css'),
    pngquant    = require('imagemin-pngquant'),
    imagemin    = require('gulp-imagemin'),
    browserSync = require('browser-sync'),
    clean       = require('gulp-rimraf'),
    replace     = require('gulp-replace'),
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

gulp.task('clean', function () {
    return gulp.src(['build'], {read: false})
        .pipe(clean());
});

gulp.task('imagemin', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('src/img'));
});

gulp.task('build-html', ['imagemin'], function() {
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
        .pipe(replace(/class="([^"]*)" /g, ''))
        .pipe(replace('data:image/unknown', 'data:image/png'))
        .pipe(gulp.dest('build/'));
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*'], ['build-html']);
});

gulp.task('default', ['server']);
gulp.task('build', ['clean', 'build-html']);
