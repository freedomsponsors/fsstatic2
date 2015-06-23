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