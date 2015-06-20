angular.module('fsviewuser', ['fsapi']);

angular.module('fsviewuser').factory('FSViewUserModel', function(FSApi){
	var m = {};

	return m;
});

angular.module('fsviewuser').directive('fsviewuser', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'/viewuser/fsviewuser.html',
		controller: function($scope, FSViewUserModel){

		},
	};
});