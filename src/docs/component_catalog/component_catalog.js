if(!window.DOCS){
    window.DOCS = {};
}
if(!DOCS.angular_dependencies){
    DOCS.angular_dependencies = [];
}
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

    catalog.set_active = function(index) {
        catalog.components[index].active = true;
    };

    catalog.get = function(category, title){
        var index;
        var result = catalog.components.filter(function( component, i ) {
            if(component.category == category &&
               component.title == title){
                index = i;
                return componente;
            }
        });

        catalog.set_active(index);

        return result[0];
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

// angular.module('catalogo_componentes').controller('IncludeComponentController', function($scope, $stateParams, $http, $location, CatalogoComponentes,LayoutModel){

//     $scope.layout = LayoutModel;

//     $scope.get_example = function() {
//         var url = $scope.componente.folder + $scope.componente.example;
//         $http.get(url).then(function(result){
//             $scope.componente.source = result.data;
//         });
//     };

//     $scope.get_source = function(files) {
//         var sources = [];

//         angular.forEach(files, function(value, key){
//             var url = $scope.componente.folder + files[key];
//             $http.get(url).then(function(result){
//                 sources[files[key]] = result.data;
//             });
//         });

//         return sources;
//     };

//     var category = $stateParams.category;
//     var title = $stateParams.title;
//     var componente = CatalogoComponentes.get(category, title);
//     $scope.componente = componente;

//     if($scope.componente.example){
//         $scope.get_example();
//     }
//     if($scope.componente.js){
//         $scope.componente.source_js = $scope.get_source($scope.componente.js);
//     }

//     if($scope.componente.testes){
//         $scope.componente.source_teste = $scope.get_source($scope.componente.testes);
//     }

//     // pega parametros da url para inicializar a tab
//     $scope.show_uso = $location.search().tab_view == 'uso' ? true : false;
//     $scope.show_exemplo = $location.search().tab_view == 'exemplo' ? true : false;
//     $scope.show_codigo = $location.search().tab_view == 'fonte' ? true : false;
//     $scope.show_js = $location.search().tab_view == 'js' ? $location.search().file : false;
//     $scope.show_teste = $location.search().tab_view == 'teste' ? $location.search().file : false;

//     if(!$location.search().tab_view){
//         $scope.show_exemplo = true;
//     }

//     $scope.set_view = function(view, item){
//         $scope.show_uso = view == 'uso';
//         $scope.show_exemplo = view == 'exemplo';
//         $scope.show_codigo = view == 'fonte';
//         $scope.show_js = view == 'js' ? item : false;
//         $scope.show_teste = view == 'teste' ? item : false;

//         $location.search('tab_view', view);

//         if(item !== undefined){
//             $location.search('file', item);
//         }
//     };
// });

// angular.module('catalogo_componentes').controller('developersCtrl', function($scope, LayoutModel){
//     $scope.layout = LayoutModel;
// });
