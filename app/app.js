;(function (angular) {
	'use strict';
	/* 这里配置启动模块，配置otherwise的路由状态 */
	angular.module('moviecat', [
				'ngRoute',
				'moviecat.directives.auto-active',
				'moviecat.movie_detail', // 控制加载的顺序 , 这个和下面的movie_list 格式相同，需要这个置先
				'moviecat.movie_list'
			])
			.config(['$routeProvider', function ($routeProvider) {
				$routeProvider.otherwise({redirectTo: '/in_theaters'});
			}])
			.controller('SearchController', [
				'$scope',
				'$route',
				'$routeParams',
				'$location',
				function ($scope, $route, $routeParams, $location) {
					$scope.input = '';
					$scope.search = function () {
						// 针对 detail详情模块 进行判断
						if (!$routeParams.category) {
							$location.path("/search");
							return $location.search('q',$scope.input);
						}
						$route.updateParams({category: 'search', q: $scope.input});
					};
				}
			]);
})(angular);
