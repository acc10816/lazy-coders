(function (angular) {
    'use strict';
    RE.controller("pageTitleCtrl", ['$scope', '$location', function($scope, $location){
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
        /*$scope.isHoursOfOperation = callCenterHoursService.isHoursOfOperation();
        $scope.pageTitle = codeLists.global.desktopTitle;
        $scope.requestACall = codeLists.global.requestACall;
        $scope.hoursOfOperation = codeLists.global.hoursOfOperation;*/
    }]);


    RE.directive("pageTitle",function(){
        return {
            restrict: 'E',
            templateUrl:'components/core/page-title/page-title.html'
        };
    });

}(angular));
