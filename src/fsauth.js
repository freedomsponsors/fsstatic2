angular.module('fsauth', ['fsapi']);

angular.module('fsauth').factory('FSAuth', function(FSApi){
	var auth = {
		username: '', 
		password: '',
		user: null,
		authenticated: authenticated,
		set_user: set_user,
	};

	function authenticated(){
		return auth.user !== null && auth.user !== undefined;
	}

	function set_user(user){
		auth.user = user;
	}


	return auth;
});