(function(){

    var deps = [
        'ngMaterial',
        'component_catalog',
        'ui.router',
        'fsngutils',
    ].concat(DOCS.angular_dependencies);
    if(jsutils.has_ng_module('fstemplates')){
        deps.push('fstemplates');
    }
    if(jsutils.has_ng_module('fsdocstemplates')){
        deps.push('fsdocstemplates');
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
