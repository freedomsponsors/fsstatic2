(function(){
	var deps = [
		// 'fshome',
		// 'fslogin',
		// 'fsissue',
		// 'fsproject',
		// 'fssearch',
		// 'fssponsor',
		// 'fsviewuser',
		// 'fseditprofile',
		// 'fsapi',
	];
	angular.module('fs_main', deps);

	angular.module('docs_main', DOCS.angular_dependencies);
	angular.module('fs_main').config(function($interpolateProvider, $stateProvider, $urlRouterProvider) {
	    $interpolateProvider.startSymbol('{[{').endSymbol('}]}');

	    $urlRouterProvider.otherwise('/');

	    $stateProvider
	        .state('home', {url: '/', template: '<fshome></fshome>'})
	        .state('login', {url: '/login', template: '<fslogin></fslogin>'})
	        .state('issue', {url: '/issue/:id/:slug', template: '<fsissue></fsissue>', controller: 'IssueStateCtrl'})
	        .state('project', {url: '/project/:id/:slug', template: '<fsproject></fsproject>', controller: 'ProjectStateCtrl'})
	        .state('search', {url: '/search', template: '<fssearch></fssearch>', controller: 'SearchStateCtrl'}})
	        .state('sponsor', {url: '/sponsor', template: '<fssponsor></fssponsor>', controller: 'SponsorStateCtrl'})
	        .state('viewuser', {url: '/user/:login', template: '<fsviewuser></fsviewuser>', controller: 'ViewUserStateCtrl'})
	        .state('editprofile', {url: '/editprofile', template: '<fseditprofile></fseditprofile>'})
	});
})();
