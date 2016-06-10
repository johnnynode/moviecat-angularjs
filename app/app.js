;(function(angular){
	'use strict';
	/* 这里配置启动模块，配置otherwise的路由状态 */
	angular.module('moviecat', [
		'ngRoute',
		'moviecat.directives.auto-active',
		'moviecat.in_theaters',
		'moviecat.coming_soon',
		'moviecat.top250'
	])
		.config(['$routeProvider', function($routeProvider){
		  $routeProvider.otherwise({redirectTo: '/in_theaters'});
		}]);
})(angular);
