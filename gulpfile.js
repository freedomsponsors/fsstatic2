////////// requires
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var linker = require('gulp-linker');
var webserver = require('gulp-webserver');
var argv = require('yargs').argv; 

var mock = argv.mock == 'true' || argv.mock === undefined;

var apijs = mock ? './src/api/api_mock.js' : './src/api/api.js';

////////// variables
var srcjs = [
    './src/fs_global.js',
    './src/*.js',
    './src/!(api)/**/*.js',
    apijs,
    '!./src/**/docs/**/*.js',
];

var docsjs = [
    './src/docs/docs_global.js',
    './src/docs/component_catalog/component_catalog.js',
    './src/**/docs/**/!(docs_main)*.js',
    '!./src/**/docs/**/test_*.js',
    './src/docs/docs_main.js',
];

var libjs = [
    './lib/angular-1.4.0/angular.js',
    './lib/angular-1.4.0/angular-aria.js',
    './lib/angular-1.4.0/angular-animate.js',
    './lib/angular-material-0.9.8/angular-material.js',
    './lib/angular-ui-router-0.2.15/angular-ui-router.js',
];

var libjsmin = [
    './lib/angular-1.4.0/angular.min.js',
    './lib/angular-1.4.0/angular-aria.min.js',
    './lib/angular-1.4.0/angular-animate.min.js',
    './lib/angular-material-0.9.8/angular-material.min.js',
    './lib/angular-ui-router-0.2.15/angular-ui-router.min.js',
];

////////// Big tasks

gulp.task('js', ['concatjssrc', 'concatjsdocs', 'concatjslib', 'concatjslibmin', 'linkjs', 'sass']);

////////// Individual tasks

concattask('concatjssrc', srcjs, 'fs.js');
concattask('concatjsdocs', docsjs, 'fs_docs.js');
concattask('concatjslib', libjs, 'lib.js');
concattask('concatjslibmin', libjsmin, 'lib.min.js');
sasstask('sass');
linktask('linkjs');
webservertask('runserver');

////////// Helper functions

function concattask(id, src, dest){
    gulp.task(id, function() {
        return gulp.src(src)
            .pipe(concat(dest))
            .pipe(gulp.dest('./dist/js/'));
    });
}

function sasstask(id){
    gulp.task('sass', function () {
        gulp.src('./src/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./dist/css'));
    });

}

function linktask(id){
    gulp.task(id, function() {
        return gulp.src('./src/pages/*.html')
            .pipe(linker(linker_params(srcjs, 'SRCJS')))
            .pipe(linker(linker_params(docsjs, 'DOCSJS')))
            .pipe(gulp.dest('./dist/'));
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

function webservertask(id){
    gulp.task(id, function() {
        return gulp.src('.')
        .pipe(webserver({
            livereload: false,
            directoryListing: true,
            open: false,
            port: 9001,
        }));
    });

}

