var gulp = require('gulp');
var concat = require('gulp-concat');
var linker = require('gulp-linker');
 
var srcjs = [
    './src/**/*.js',
    '!./src/**/docs/**/*.js',
];
var docsjs = [
    './src/**/docs/**/*.js',
    '!./src/**/docs/**/test_*.js',
];

var libjs = [
    './lib/angular-1.4.0/angular.js',
    './lib/angular-1.4.0/angular-aria.js',
    './lib/angular-1.4.0/angular-animate.js',
    './lib/angular-material-0.9.8/angular-material.js',
];
var libjsmin = [
    './lib/angular-1.4.0/angular.min.js',
    './lib/angular-1.4.0/angular-aria.min.js',
    './lib/angular-1.4.0/angular-animate.min.js',
    './lib/angular-material-0.9.8/angular-material.min.js',
];

gulp.task('js', ['concatjssrc', 'concatjsdocs', 'concatjslib', 'concatjslibmin']);

concattask('concatjssrc', srcjs, 'fs.js');
concattask('concatjsdocs', docsjs, 'fs_docs.js');
concattask('concatjslib', libjs, 'lib.js');
concattask('concatjslibmin', libjsmin, 'lib.min.js');

gulp.task('linkjs', function() {
    return gulp.src('./src/pages/*.html')
        .pipe(linker(linker_params(srcjs, 'SRCJS')))
        .pipe(linker(linker_params(docsjs, 'DOCSJS')))
        .pipe(gulp.dest('./dist/'));
});

function concattask(id, src, dest){
    gulp.task(id, function() {
        return gulp.src(src)
            .pipe(concat(dest))
            .pipe(gulp.dest('./dist/js/'));
    });
}

function linker_params(src, marker){
    return {
        scripts: src,
        startTag: '<!--'+marker+'-->',
        endTag: '<!--'+marker+' END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.'
    };
}



