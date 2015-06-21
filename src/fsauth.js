angular.module('fsauth', ['fsapi']);

angular.module('fsauth').factory('FSAuth', function(FSApi){
	var auth = {
		username: '', 
		password: '',
		user: null,
		check_for_authentication: check_for_authentication,
		authenticated: authenticated,
		set_user: set_user,
		logout: logout,
	};

	function check_for_authentication(){
		FSApi.whoami().then(function(result){
			var _who = result.data;
			if(_who.authenticated){
				auth.user = _who.user;
			} else {
				auth.user = null;
			}
		});
	}

	function authenticated(){
		return auth.user !== null && auth.user !== undefined;
	}

	function set_user(user){
		auth.user = user;
	}

	function logout(){
		FSApi.logout().then(function(){
			auth.user = null;
		});
	}


	return auth;
});