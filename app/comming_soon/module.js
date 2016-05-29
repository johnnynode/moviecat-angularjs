(function(angular){
	'use strict';
	angular.module('moviecat.comming_soon', ['ngRoute'])
		.config(['$routeProvider', function($routeProvider) {
		  $routeProvider.when('/comming_soon', {
		    templateUrl: 'comming_soon/view.html',
		    controller: 'comming_soon_ctrl'
		  });
		}])

		.controller('comming_soon_ctrl', ['$scope','$http',function($scope,$http) {
			$scope.title = '即将上映';
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
