DOCS.add_angular_dependency('todo');

angular.module('component_catalog').run(function(ComponentCatalog){
    ComponentCatalog.add_test_page({
        group: 'fs',
        title: 'TODO component',
        category: 'Example',
        folder: FS.BASE_URL + '/components/todo_example/docs/',
        example: 'todo_sample.html',
    });
});