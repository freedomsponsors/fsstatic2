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

angular.module('component_catalog').factory('ComponentCatalogViewModel', function(ComponentCatalog, $http){
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
            var source_url = component.folder + component.example;
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
        return m.active_component.folder + m.active_component.example;
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
        templateUrl: FS.BASE_URL+'/docs/component_catalog/component_catalog_tree.html',
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
        templateUrl: FS.BASE_URL+'/docs/component_catalog/sample_page.html',
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
