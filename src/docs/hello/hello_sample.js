angular.module('component_catalog').run(function(ComponentCatalog){
    ComponentCatalog.add_test_page({
        group: 'fs',
        title: 'Hello Test Page!',
        category: 'Basic stuff',
        folder: FS.BASE_URL + '/docs/hello/',
        example: 'hello_sample.html',
    });
    ComponentCatalog.add_test_page({
        group: 'fs',
        title: 'Hello2!',
        category: 'Basic stuff',
        folder: FS.BASE_URL + '/docs/hello/',
        example: 'hello_sample.html',
    });
    ComponentCatalog.add_test_page({
        group: 'fs',
        title: 'Hello 3!',
        category: 'Another Category',
        folder: FS.BASE_URL + '/docs/hello/',
        example: 'hello_sample.html',
    });
});