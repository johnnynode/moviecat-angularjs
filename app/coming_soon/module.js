(function(angular){
	'use strict';
	angular.module('moviecat.coming_soon', ['ngRoute','moviecat.services.http'])
		.config(['$routeProvider', function($routeProvider) {
		  $routeProvider.when('/coming_soon/:page?', {
		    templateUrl: 'coming_soon/view.html',
		    controller: 'coming_soon_ctrl'
		  });
		}])
		.controller('coming_soon_ctrl', [
			'$scope',
			'$route',
			'$routeParams',
			'HttpService',
			function($scope,$route,$routeParams,HttpService) {
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
				}

				$scope.loading = true;
				$scope.title = '加载中...';
				HttpService
					.jsonp(
						"http://api.douban.com/v2/movie/coming_soon",
						{start:start,count:pageSize},
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
