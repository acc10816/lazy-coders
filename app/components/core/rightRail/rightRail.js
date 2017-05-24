(function(angular){
    "use strict";

    var appRightRail = angular.module('RE');
    /**
     * name: right rail controller
     * description: This is the controller for the right rail functions
     * it contains the help message functionality that is populated through the
     * help service.
     */
    appRightRail.controller("rightRailCtrl", ['$scope', '$rootScope', '$location',
        function ($scope, $rootScope, $location) {

            $scope.message = "";

            $scope.blacklist =function() {
                var isBlacklisted  = false;
                var list=['bridged','hardStop', 'quote','tooComplex','systemDown', 'timeout', 'systemError'];
                list.forEach(function(item){
                    if($location.$$path.toLowerCase().indexOf(item.toLowerCase()) !== -1){
                        isBlacklisted = true;
                    }
                });

                return isBlacklisted;
            };

            $rootScope.$on('help', function (event, args) {
                if ($scope.getScreenWidth() < 768) return;
                setTimeout(function() {
                    if(args.message) {
                        $scope.$apply(function () {
                            $scope.message = args.message;
                            $scope.top = args.location;
                            $scope.helpVisible = true;
                        });
                    }
                },0);

            });

            $rootScope.$on('helpoff', function () {
                $scope.helpVisible = false;
                $scope.message = "";
                /*$scope.$apply(function(){
                    $scope.helpVisible = false;
                    $scope.message = "";
                });*/



            });

            $scope.getScreenWidth = function () {
                return window.innerWidth ||
                    document.documentElement.clientWidth ||
                    document.body.clientWidth;
            };

        }]);

    appRightRail.filter('capitalize', function() {
        return function(input) {
            return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
        };
    });



    appRightRail.directive("rightRail", function () {
        return {
            scope: false,
            templateUrl: 'components/core/rightRail/rightRail.html',
            restrict: 'E',
            replace: true
        };
    });
}(angular));

