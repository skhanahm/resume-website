/* File: gulpfile.js */

// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util');
    jshint = require('gulp-jshint');
    uglify = require('gulp-uglify');
    changed = require('gulp-changed');
    imagemin = require('gulp-imagemin');
    minifyHTML = require('gulp-minify-html');
    autoprefix = require('gulp-autoprefixer');
    minifyCSS = require('gulp-minify-css');

    input = {
        'css': 'source/css/**/*.css',
        'javascript': 'source/javascript/**/*.js',
        'images': 'source/images/**/*',
        'html': 'source/*.html'
    };

    output = {
        'css': 'public/css',
        'javascript': 'public/javascript',
        'images': 'public/images',
        'html': 'public'
    };

    inputCopy = {
        'files': 'source/files/*'
    };

    outputCopy = {
        'files': 'public/files'
    };

gulp.task('copyFiles', function() {
    // copy any html files in source/ to public/
    for (var item in inputCopy) {
        gulp.src(inputCopy[item]).pipe(gulp.dest(outputCopy[item]));
    }
});

// minify new or changed HTML pages
gulp.task('htmlMin', function () {
    gulp.src(input.html)
      .pipe(changed(output.html))
      .pipe(minifyHTML())
      .pipe(gulp.dest(output.html));
});

// CSS concat, auto-prefix and minify
gulp.task('stylesMin', function () {
    gulp.src([input.css])
      .pipe(autoprefix('last 2 versions'))
      .pipe(minifyCSS())
      .pipe(gulp.dest(output.css));
});

// minify new images
gulp.task('imageMin', function () {
    gulp.src(input.images)
        .pipe(changed(output.images))
        .pipe(imagemin())
        .pipe(gulp.dest(output.images));
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('build-js', ['jshint'], function () {
    return gulp.src(input.javascript)
      .pipe(uglify())
      .pipe(gulp.dest(output.javascript));
});

// Create a default task
gulp.task('default', ['copyFiles', 'imageMin', 'htmlMin', 'stylesMin', 'build-js']);