if(!window.DOCS){
    window.DOCS = {};
}
if(!DOCS.angular_dependencies){
    DOCS.angular_dependencies = [];
}
angular.module('component_catalog', []);
angular.module('component_catalog').factory('CatalogoComponentes', function(){
    var catalog = {
        componentes: []
    };

    catalog.add_test_page = function(options){
        options.js = !Array.isArray(options.js) && options.js !== undefined ? [options.js] : options.js;
        options.testes = !Array.isArray(options.testes) && options.testes !== undefined ? [options.testes] : options.testes;

        var componente = {
            group: options.group,
            title: options.title,
            category: options.category,
            folder: options.folder,
            example: options.example,
            js: options.js,
            testes: options.testes,
            usage: options.usage,
            source: '',
            markdown: '',
            active: false,
        };
        catalog.componentes.push(componente);
    };

    catalog.set_active = function(index) {
        catalog.componentes[index].active = true;
    };

    catalog.get = function(category, title){
        var index;
        var result = catalog.componentes.filter(function( componente, i ) {
            if(componente.category == category &&
               componente.title == title){
                index = i;
                return componente;
            }
        });

        catalog.set_active(index);

        return result[0];
    };

    return catalog;
});

angular.module('component_catalog').directive('catalogoComponentesTree', function(CatalogoComponentes){
    return {
        restrict: 'E',
        scope: {
            group: '@'
        },
        templateUrl: EM.get_baseurl()+'js/estante/commons/docs/catalogo_componentes/catalogo_componentes_tree.html',
        controller: function($scope) {
            $scope.componentes = CatalogoComponentes.componentes.filter(function(e){
                return e.group == $scope.group;
            });

            $scope.categories = [];

            // retorna um array com as categorias não duplicadas
            $.each(
                // mapeia as categorias dos componentes
                $scope.componentes.map(
                    function(e){ return {name: e.category}; }
                ),
                // remove ocorrencias duplicadas
                function(i, el){
                    // Se não existe no objecto ele adiciona
                    if(!($scope.categories.filter(function(e){ return e.name === el.name; } )).length){
                        $scope.categories.push(el);
                    }
                }
            );

            $scope.toggle_category = function(category){
                //close all categorys
                // for (var i = 0; i < $scope.categories.length; i++) {
                //     $scope.categories[i].open = false;
                // };
                category.open = !category.open;
            };

            $scope.toggle_active = function(componente){
                //close all categorys
                for (var i = 0; i < $scope.componentes.length; i++) {
                    $scope.componentes[i].active = false;
                }
                componente.active = true;
            };
        }
    };
});

angular.module('component_catalog').controller('IncludeComponentController', function($scope, $stateParams, $http, $location, CatalogoComponentes,LayoutModel){

    $scope.layout = LayoutModel;

    $scope.get_example = function() {
        var url = $scope.componente.folder + $scope.componente.example;
        $http.get(url).then(function(result){
            $scope.componente.source = result.data;
        });
    };

    $scope.get_source = function(files) {
        var sources = [];

        angular.forEach(files, function(value, key){
            var url = $scope.componente.folder + files[key];
            $http.get(url).then(function(result){
                sources[files[key]] = result.data;
            });
        });

        return sources;
    };

    var category = $stateParams.category;
    var title = $stateParams.title;
    var componente = CatalogoComponentes.get(category, title);
    $scope.componente = componente;

    if($scope.componente.example){
        $scope.get_example();
    }
    if($scope.componente.js){
        $scope.componente.source_js = $scope.get_source($scope.componente.js);
    }

    if($scope.componente.testes){
        $scope.componente.source_teste = $scope.get_source($scope.componente.testes);
    }

    // pega parametros da url para inicializar a tab
    $scope.show_uso = $location.search().tab_view == 'uso' ? true : false;
    $scope.show_exemplo = $location.search().tab_view == 'exemplo' ? true : false;
    $scope.show_codigo = $location.search().tab_view == 'fonte' ? true : false;
    $scope.show_js = $location.search().tab_view == 'js' ? $location.search().file : false;
    $scope.show_teste = $location.search().tab_view == 'teste' ? $location.search().file : false;

    if(!$location.search().tab_view){
        $scope.show_exemplo = true;
    }

    $scope.set_view = function(view, item){
        $scope.show_uso = view == 'uso';
        $scope.show_exemplo = view == 'exemplo';
        $scope.show_codigo = view == 'fonte';
        $scope.show_js = view == 'js' ? item : false;
        $scope.show_teste = view == 'teste' ? item : false;

        $location.search('tab_view', view);

        if(item !== undefined){
            $location.search('file', item);
        }
    };
});

angular.module('component_catalog').controller('developersCtrl', function($scope, LayoutModel){
    $scope.layout = LayoutModel;
});
