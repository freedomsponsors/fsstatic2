angular.module('fssearch', ['fsapi']);

angular.module('fssearch').factory('FSSearchModel', function(FSApi){
	var m = {};

	return m;
});

angular.module('fssearch').directive('fssearch', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: {},
		templateUrl: FS.BASE_URL+'/search/fssearch.html',
		controller: function($scope, FSSearchModel){

		},
	};
});