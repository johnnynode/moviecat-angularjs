(function(angular){
	'use strict';
	angular.module('moviecat.is_viewing', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
		  $routeProvider.when('/is_viewing', {
		    templateUrl: 'is_viewing/view.html',
		    controller: 'is_viewing_ctrl'
		  });
		}])
		.controller('is_viewing_ctrl', ['$scope','$http',function($scope,$http) {
			$scope.title = '正在热映';
			// $scope.movies = [];
			$http
				.get('/app/data.json')
				.then((data)=>{
					$scope.movies = data.data || [];
				})
				.catch((err)=>{
					console.log(err);
				});

		}]);
})(angular);
