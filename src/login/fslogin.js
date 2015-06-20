angular.module('fslogin', ['fsapi']);

angular.module('fslogin').factory('FSLoginModel', function(FSApi){
	var m = {};

	return m;
});

angular.module('fslogin').directive('fslogin', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'/login/fslogin.html',
		controller: function($scope, FSLoginModel){

		},
	};
});