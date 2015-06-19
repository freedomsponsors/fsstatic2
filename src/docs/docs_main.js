angular.module('docs_main', ['ngMaterial', 'component_catalog', 'ui.router']);
angular.module('docs_main').config(function($interpolateProvider, $stateProvider, $urlRouterProvider) {
    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

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
            // templateUrl: 'someurl'
        });
});

angular.module('docs_main').controller('AppCtrl', function($scope, $mdSidenav){
    $scope.toggleSidenav = function(menuId) {
        $mdSidenav(menuId).toggle();
    };
});
