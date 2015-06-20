DOCS.add_angular_dependency('ngMaterial');
DOCS.add_angular_dependency('component_catalog');
DOCS.add_angular_dependency('ui.router');

angular.module('docs_main', DOCS.angular_dependencies);
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

