var gulp      = require('gulp'),
    inlineCss = require('gulp-inline-css');

gulp.task('inlineCSS', function() {
    return gulp.src('./src/*.html')
        .pipe(inlineCss({
                applyStyleTags: true,
                applyLinkTags: true,
                removeStyleTags: true,
                removeLinkTags: true
        }))
        .pipe(gulp.dest('./html'));
});

gulp.task('watch', function() {
    gulp.watch(['src/*.css', 'src/*.html'], ['inlineCSS']);
});

gulp.task('default',['watch'], function() {});