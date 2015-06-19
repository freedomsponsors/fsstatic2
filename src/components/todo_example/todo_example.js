angular.module('todo_example', []);

angular.module('todo_example').factory('TODOModel', function(){
    var m = {
        newtodo: '';
        todos: [];
    };

    angular.extend(m, {
        add: add,
        remove: remove,
    });

    function add(){
        m.todos.push({description: m.newtodo});
        m.newtodo = '';
    }

    function remove(todo){
        var idx = m.todos.indexOf(todo);
        m.todos.splice(idx, 1);
    }

    return m;
});

angular.module('todo_example').directive('todo', function(){
    return {
        restrict: 'E',
        replace: true,
        scope: {},
        template: FS.BASE_URL+'/components/todo_example/todo.html'
        controller: function($scope, TODOModel){
            var m = $scope.m = TODOModel;
        }
    };
});