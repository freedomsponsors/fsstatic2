angular.module('fsapi', ['fsajax']);

angular.module('fsapi').factory('FSApi', function(FSAjax){
	var fsapi = {
		add: todo,
		login: login,
		logout: logout,
		whoami: whoami,
		get_user_details: todo,
	};

	function todo(){}

	function login(username, password){
		return FSAjax.post('/api/login', {username: username, password: password});
	}

	function logout(){
		return FSAjax.get('/api/logout');
	}

	function whoami(){
		return FSAjax.get('/api/whoami');
	}

	return fsapi;
});
