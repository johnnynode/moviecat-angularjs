(function(angular){
	'use strict';
	// 列表页模块
	angular.module('moviecat.movie_list', ['ngRoute','moviecat.services.http'])
		.config(['$routeProvider', function($routeProvider) {
		  $routeProvider.when('/:category/:page?', {
		    templateUrl: 'movie_list/view.html?rev=@@hash',
		    controller: 'MovieListCtrl'
		  });
		}])
		.controller('MovieListCtrl', [
			'$scope',
			'$route',
			'$routeParams',
			'HttpService',
			function($scope,$route,$routeParams,HttpService) {
				// 取得当前页码
				$scope.page = $routeParams.page-0 ||1;
				/* 豆瓣api的start参数配置 显示5条记录*/
				var start = ($scope.page-1) * 5;
				var pageSize = 5;
				/* 总条数 */
				$scope.totalCount = 0;
				/* 总页数 */
				$scope.totalPage = 0;
				/* 翻页行为 */
				$scope.go = function(page) {
					if(0<page && page <= $scope.totalPage){
						$route.updateParams({page:page});
					}
				};
				$scope.loading = true;
				$scope.title = '加载中...';
				HttpService
					.jsonp(
						"http://api.douban.com/v2/movie/" + $routeParams.category,
						{start:start,count:pageSize,q:$routeParams.q},
						function(data){
							$scope.loading = false;
							$scope.title = data.title;
							$scope.movies = data.subjects;
							$scope.totalCount = data.total;
							$scope.totalPage = Math.ceil($scope.totalCount/pageSize);
							$scope.$apply(); // 强制同步数据到界面
						}
					)
		}]);
})(angular);
