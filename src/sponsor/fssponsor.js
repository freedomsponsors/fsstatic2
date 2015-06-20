angular.module('fssponsor', ['fsapi']);

angular.module('fssponsor').factory('FSSponsorModel', function(FSApi){
	var m = {};

	return m;
});

angular.module('fssponsor').directive('fssponsor', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'/sponsor/fssponsor.html',
		controller: function($scope, FSSponsorModel){

		},
	};
});