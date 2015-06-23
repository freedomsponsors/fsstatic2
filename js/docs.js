angular.module("docstemplates", []).run(["$templateCache", function($templateCache) {$templateCache.put("TEMPLATE_CACHE/component_catalog/component_catalog_tree.html","<div><div ng-repeat=\"category in m.categories\"><button class=\"md-button-toggle md-button md-default-theme\" ng-click=\"m.toggle_open(category)\"><div flex=\"\" layout=\"row\">{[{category.name}]}</div></button><ul ng-show=\"category.open\"><li ng-repeat=\"component in m.components | filter: by_category(category.name)\"><a class=\"md-button\" href=\"#/{[{component.category}]}/{[{component.title}]}\">{[{component.title}]}</a></li></ul></div></div>");
$templateCache.put("TEMPLATE_CACHE/component_catalog/sample_page.html","<div><div><span>{[{m.active_component.title}]}</span> <button ng-click=\"m.show_example()\">Example</button> <button ng-click=\"m.show_source()\">Source</button></div><div ng-if=\"m.showing == \'EXAMPLE\'\" ng-include=\"m.get_include()\"></div><div ng-if=\"m.showing == \'SOURCE\'\"><pre>{[{m.get_source()}]}</pre></div></div>");}]);
if(!window.DOCS){
	window.DOCS = {};
}

DOCS.angular_dependencies = [];
DOCS.add_angular_dependency = function(dep){
	DOCS.angular_dependencies.push(dep);
};

angular.module('component_catalog', ['ng_bind_html_unsafe']);
angular.module('component_catalog').factory('ComponentCatalog', function(){
    var catalog = {
        components: []
    };

    catalog.add_test_page = function(options){
        options.js = _2array(options.js);
        options.tests = _2array(options.tests);

        var component = {
            group: options.group,
            title: options.title,
            category: options.category,
            folder: options.folder,
            example: options.example,
            js: options.js,
            tests: options.tests,
            usage: options.usage,
            source: '',
            markdown: '',
            active: false,
        };
        catalog.components.push(component);
    };

    catalog.get = function(category, title){
        for(var i=0; i<catalog.components.length; i++){
            var component = catalog.components[i];
            if(component.category == category && component.title == title){
                return component;
            }
        }
    };

    function _2array(v){
        return !Array.isArray(v) && v !== undefined ? [v] : v;
    }

    return catalog;
});

angular.module('component_catalog').factory('ComponentCatalogViewModel', function(ComponentCatalog, $http, $templateCache){
    var m = {
        active_component: null,
        showing: 'NOTHING',
        components: [],
        categories: [],
        init: init,
        toggle_open: toggle_open,
        activate: activate,
        show_example: show_example,
        show_source: show_source,
        get_include: get_include,
        get_source: get_source,
    };

    function init(group_filter){
        m.components = ComponentCatalog.components.filter(function(e){
            return e.group == group_filter;
        });
        var catmap = {}
        m.categories = [];
        for(var i=0; i<m.components.length; i++){
            var category = m.components[i].category;
            if(!catmap[category]){
                m.categories.push({name: category});
                catmap[category] = true;
            }
        }
    }

    function toggle_open(category){
        category.open = !category.open;
    }

    function activate(component){
        m.active_component = component;
        m.showing = 'EXAMPLE';
        if(!component.source){
            var source_url = DOCS.SAMPLE_BASE_URL + component.folder + component.example;
            $http.get(source_url).success(function(source){
                component.source = source;
            });
        }
    }

    function show_example(){
        m.showing = 'EXAMPLE';
    }

    function show_source(){
        m.showing = 'SOURCE';
    }

    function get_include(){
        return DOCS.SAMPLE_BASE_URL + m.active_component.folder + m.active_component.example;
    }

    function get_source(){
        return m.active_component.source;
    }

    return m;
})

angular.module('component_catalog').directive('componentCatalogTree', function(ComponentCatalogViewModel){
    return {
        restrict: 'E',
        scope: {
            group: '@'
        },
        templateUrl: DOCS.BASE_URL+'component_catalog/component_catalog_tree.html',
        controller: function($scope) {
            var m = $scope.m = ComponentCatalogViewModel;
            m.init($scope.group);

            $scope.by_category = function(category_name){
                return function(component){
                    return component.category == category_name;
                };
            }
        }
    };
});

angular.module('component_catalog').directive('componentCatalogSample', function(ComponentCatalogViewModel){
    return {
        restrict: 'E',
        scope: {},
        templateUrl: DOCS.BASE_URL+'component_catalog/sample_page.html',
        controller: function($scope) {
            var m = $scope.m = ComponentCatalogViewModel;
        }
    };
});

angular.module('component_catalog').controller('IncludeComponentCatalogSampleCtrl', function($scope, $stateParams, ComponentCatalog, ComponentCatalogViewModel){
    var category = $stateParams.category;
    var title = $stateParams.title;
    var component = ComponentCatalog.get(category, title);
    ComponentCatalogViewModel.activate(component);
});

DOCS.add_angular_dependency('todo');

angular.module('component_catalog').run(function(ComponentCatalog){
    ComponentCatalog.add_test_page({
        group: 'fs',
        title: 'TODO component',
        category: 'Example',
        folder: 'components/todo_example/docs/',
        example: 'todo_sample.html',
    });
});

angular.module('component_catalog').controller('TodoSampleCtrl', function($scope, TODOModel){
    $scope.add_laundry = function(){
        TODOModel.newtodo = 'Do the laundry';
        TODOModel.add();
    }
});
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
