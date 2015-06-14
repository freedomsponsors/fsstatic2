var gulp = require('gulp');
var concat = require('gulp-concat');
var linker = require('gulp-linker');
 
gulp.task('concatjs', function() {
    return gulp.src('./src/**/*.js')
        .pipe(concat('fs.js'))
        .pipe(gulp.dest('./dist/js/'));
});
gulp.task('linkjs', function() {
    return gulp.src('./src/pages/*.html')
        .pipe(linker({
            scripts: [ './src/**/*.js' ],
            startTag: '<!--JS-->',
            endTag: '<!--JS END-->',
            fileTmpl: '<script src="%s"></script>',
            appRoot: 'approot/'
        }))
        .pipe(gulp.dest('./dist/'));
});

