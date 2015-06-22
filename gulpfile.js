////////// requires
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var linker = require('gulp-linker');
var webserver = require('gulp-webserver');
var ngTemplates = require('gulp-ng-templates');
var htmlmin = require('gulp-htmlmin');
var merge = require('merge-stream');
var argv = require('yargs').argv; 

var mock = argv.mock == 'true' || argv.mock === undefined;
var prod = argv.prod == 'true';

var apijs = mock ? './src/api/api_mock.js' : './src/api/api.js';
var settingsjs = prod ? './settings/prod.js' : './settings/dev.js';

////////// variables
var srcjs = [
    settingsjs,
    './src/fs_global.js',
    './src/commons/jsutils.js',
    './src/commons/fsngutils.js',
    './src/*.js',
    './src/!(api)/**/*.js',
    apijs,
    '!./src/**/docs/**/*.js',
];

var srchtml = [
    './src/**/*.html',
    '!./src/**/docs**/*.html',
];

var srcjsprod = [
    './dist/js/fs.js',
];

var docsjs = [
    './docs_src/docs_global.js',
    './docs_src/component_catalog/component_catalog.js',
    './src/**/docs/**/*.js',
    '!./src/**/docs/**/test_*.js',
    './docs_src/docs_main.js',
];

var docshtml = [
    './docs_src/**/**/*.html',
    './src/**/docs/**/*.html',
];

var docsjsprod = [
    './dist/js/docs.js',
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

gulp.task('js', ['concatjslib', 'concatjslibmin', 'linkjs']);
gulp.task('jsprod', ['concatjssrc', 'concatjsdocs', 'concatjslib', 'concatjslibmin', 'linkjsprod']);

////////// Individual tasks

concattask('concatjssrc', {js: srcjs, html: srchtml, ngmodule: 'fstemplates', tmplprefix: 'FAKEPATH/', dest: 'fs.js'});
concattask('concatjsdocs', {js: docsjs, html: docshtml, ngmodule: 'fsdocstemplates', tmplprefix: 'FAKEPATH/', dest: 'docs.js'});
concattask('concatjslib', {js: libjs, dest: 'lib.js'});
concattask('concatjslibmin', {js: libjsmin, dest: 'lib.min.js'});
sasstask('sass');
linktaskdev('linkjs');
linktaskprod('linkjsprod');
webservertask('runserver');

////////// Helper functions

function concattask(id, options){
    gulp.task(id, function() {
        var stream_concat = gulp
            .src(options.js)
            .pipe(concat(options.dest));
        if(options.html){
            var stream_ngtemplates = gulp.src(options.html)
                .pipe(htmlmin({collapseWhitespace: true}))
                .pipe(ngTemplates({
                    filename: 'zzz.js',
                    module: options.ngmodule,
                    path: function (path, base) {
                        var result = options.tmplprefix + path.replace(base, '');
                        console.log(result);
                        return result;
                    },
                }));
            stream_concat = merge(stream_concat);
            stream_concat.add(stream_ngtemplates);
            stream_concat = stream_concat.pipe(concat(options.dest))
        }
        return stream_concat
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

function linktaskdev(id){
    gulp.task(id, function() {
        return gulp.src('./src/pages/*.html')
            .pipe(linker(linker_params(srcjs, 'SRCJS', '.')))
            .pipe(linker(linker_params(docsjs, 'DOCSJS', '.')))
            .pipe(gulp.dest('./dist/'));
    });
}

function linktaskprod(id){
    gulp.task(id, ['concatjssrc', 'concatjsdocs'], function() {
        return gulp.src('./src/pages/*.html')
            .pipe(linker(linker_params(srcjsprod, 'SRCJS', 'dist/')))
            .pipe(linker(linker_params(docsjsprod, 'DOCSJS', 'dist/')))
            .pipe(gulp.dest('./dist/'));
    });
}

function linker_params(src, marker, approot){
    return {
        scripts: src,
        startTag: '<!--'+marker+'-->',
        endTag: '<!--'+marker+' END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: approot,
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

