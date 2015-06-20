angular.module('fsapi', []);
angular.module('fsapi').factory('FSApi', function($q, $timeout){
	var fsapi = {
		add: _mockasync(add),
		login: _mockasync(login),
		get_user_details: _mockasync(get_user_details),
	}

	function add(todo){
		var newtodo = angular.copy(todo)
		newtodo.id = Math.floor(Math.random() * 1E9);
		return newtodo;
	}

	function login(username, password){
		var fakeuser = {
			username: username,
			name: 'Fake User',
		};
		return fakeuser;
	}

	function get_user_details(username){
		var fakeuser = {
			username: username,
			name: 'Fake User',
			has_paypal: true,
			has_bitcoin: false,
		};
		return fakeuser;
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