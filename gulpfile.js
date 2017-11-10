var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reactify = require('reactify'),
    package = require('./package.json'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cleanCSS = require('gulp-clean-css'),
    runSequence = require('run-sequence'),
    nodemon = require('nodemon');


gulp.task('bundlejs', function() {
    return browserify(package.paths.app)
        .transform('reactify', {stripTypes: true, es6: true})
        .bundle()
        .pipe(source(package.dest.app))
        .pipe(gulp.dest(package.dest.dist))
});

gulp.task('uglify', function() {
  var src = package.dest.dist+"/*.js";
  console.log("src===",src)
  gulp.src(src)
    .pipe(uglify())
    .pipe(gulp.dest(package.dest.dist))
});

gulp.task('bundlecss', function() {
  return gulp.src(['public/web/css/business-login.css','public/web/css/index.css','public/web/css/styles.css'])
    .pipe(cleanCSS())
    .pipe(concat(package.destCss.app))
    .pipe(gulp.dest(package.destCss.dist));
});

gulp.task('bundle',function(done){
  runSequence('bundlejs', 'bundlecss', done);
})

gulp.task('watch', function () {
    gulp.watch(['src/**/*.js', 'src/**/*.jsx'],['bundle']);
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'bin/www', ext: 'js jsx jade',ignore:["public/web/scripts/react/*"]
    });
});
