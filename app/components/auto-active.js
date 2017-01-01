(function (angular) {
	angular.module('moviecat.directives.auto-active', [])
			.directive('autoActive', ['$location', function ($location) {
				return {
					link: function (scope, element, attributes) {
						scope.location = $location;
						scope.$watch('location.url()', function (now, old) {
							var alink = element.children().attr('href').substr(1);
							/* 截取字符串，去掉# */
							if (now.indexOf(alink) != -1) {
								element.parent().children().removeClass(attributes.autoActive);
								element.addClass(attributes.autoActive);
							}
						})
					}
				}
			}])
})(angular);
