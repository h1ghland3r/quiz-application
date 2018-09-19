var gulp = require('gulp');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
    
gulp.task('sass', function(){
    gulp.src([
      'node_modules/bootstrap/scss/bootstrap.scss',
      'src/styles/**/*.scss'
    ])
    .pipe(plumber({
        errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('build/styles/'))
});

gulp.task('js', function(){
    return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        "node_modules/tether/dist/js/tether.js",
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'src/scripts/**/*.js'
    ])
    .pipe(plumber({
        errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
    }}))
    .pipe(babel())
    .pipe(gulp.dest('build/scripts/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts/'))
});

gulp.task('images', function(){
    gulp.src('src/assets/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('build/assets/'));
});

gulp.task('watch', function(){
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/scripts/**/*.js', ['scripts']);
});