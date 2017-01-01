(function (angular) {
	'use strict';
	// 详情模块
	angular.module('moviecat.movie_detail', ['ngRoute', 'moviecat.services.http'])
			.config(['$routeProvider', function ($routeProvider) {
				$routeProvider.when('/detail/:id', {
					templateUrl: 'movie_detail/view.html?rev=@@hash',
					controller: 'MovieDetailController'
				});
			}])
			.controller('MovieDetailController', [
				'$scope',
				'$route',
				'$routeParams',
				'HttpService',
				function ($scope, $route, $routeParams, HttpService) {
					$scope.movie = {};
					$scope.loading = true;
					$scope.title = 'Loading...';
					HttpService
							.jsonp(
									'http://api.douban.com/v2/movie/subject/' + $routeParams.id, {},
									function (data) {
										$scope.movie = data;
										$scope.loading = false;
										$scope.title = data.title;
										$scope.$apply(); // 强制同步数据到界面
									}
							);
				}
			]);
})(angular);
