angular.module('fsapi', []);
angular.module('fsapi').factory('FSApi', function($q, $timeout, $log){
	var fsapi = {
		add: todo,
		login: todo,
		logout: todo,
		whoami: todo,
		get_user_details: todo,
	};

	function todo(){}

	return fsapi;
});