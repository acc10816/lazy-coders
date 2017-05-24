(function(angular){
    "use strict";
    var appHeader = angular.module('RE');

    appHeader;

    /*appHeader.run(function($rootScope, $location, vendorInfoService) { $rootScope.$on('$stateChangeStart',
    		function(event, next, current) {
    		$rootScope.isBlacklisted=false;
    		var list= ['bridged','hardStop','tooComplex'];
    		list.forEach(function(item) {
    		if($location.$$path.toLowerCase().indexOf(item.toLowerCase()) !== -1) {
    		$rootScope.isBlacklisted=true;
    		}
            });
    		return $rootScope.isBlacklisted;

    		});
    });
*/

/*    appHeader.directive("siteHeader",function(){
        return {
            restrict: 'E',
            templateUrl:'components/core/header/header.html'
        };
    });*/
}(angular));
