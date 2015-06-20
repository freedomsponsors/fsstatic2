angular.module('fsapi', []);
angular.module('fsapi').factory('FSApi', function($q, $timeout){
	var fsapi = {
		add: _mockasync(add),
	}

	function add(todo){
		var newtodo = angular.copy(todo)
		newtodo.id = Math.floor(Math.random() * 1E9);
		return newtodo;
	}

	function _mockasync(f){
		return function(){
			var _arguments = arguments;
			var _this = this;
			if(!FS.MOCK){
				FS.MOCK = {}
			}
			if(FS.MOCK.timeout === undefined){
				FS.MOCK.timeout = 500;
			}
			var deferred = $q.defer();
			$timeout(function(){
				try{
					var result = f.apply(_this, _arguments);
					deferred.resolve({data: result});
				} catch(ex){
					deferred.reject(ex); //TODO: simulate http stuff
				}
			}, FS.MOCK.timeout);
			return deferred.promise;
		}
	}

	return fsapi;
})