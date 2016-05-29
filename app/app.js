(function(angular){
	'use strict';
	angular.module('moviecat', [
		'ngRoute',
		'moviecat.is_viewing',
		'moviecat.comming_soon'
		])
		.config(['$routeProvider', function($routeProvider){
		  $routeProvider.otherwise({redirectTo: '/is_viewing'});
		}]);
})(angular);
