(function(){

    var deps = [
        'ngMaterial',
        'component_catalog',
        'ui.router',
        'fsngutils',
    ].concat(DOCS.angular_dependencies);
    if(FS.USE_TEAMPLE_CACHE){
        deps.push('fstemplates');
    }
    if(DOCS.USE_TEAMPLE_CACHE){
        deps.push('docstemplates');
    }

    angular.module('docs_main', deps);
    angular.module('docs_main').config(function($interpolateProvider, $controllerProvider, $stateProvider, $urlRouterProvider) {
        $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

        $controllerProvider.allowGlobals();
        $urlRouterProvider.otherwise('/instructions');

        $stateProvider
            .state('base', {
                url: '/:category/:title',
                template: '<component-catalog-sample></component-catalog-sample>',
                controller: 'IncludeComponentCatalogSampleCtrl'
            })
            .state('instructions', {
                url: '/instructions',
                template: '<div> instructions </div>'
            });
    });
})();
