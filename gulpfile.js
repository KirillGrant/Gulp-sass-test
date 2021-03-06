var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

gulp.task('Sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream())
});
gulp.task('BrowserSync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        }
    })
});
gulp.task('Scripts', function f() {
    return gulp.src([
        'app/libs/jquery/dist/jquery.js',
        'app/libs/magnific-popup/dist/jquery.magnific-popup.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});
gulp.task('Watch', gulp.parallel('BrowserSync', 'Sass', 'Scripts'), function () {
    gulp.watch('app/sass/*.sass',['Sass'])
    gulp.watch('app/*.html', browserSync.reload)
    gulp.watch('app/js/*.js', browserSync.reload)
});