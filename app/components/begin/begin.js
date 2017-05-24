(function (angular) {
    'use strict';
    RE.controller('beginCtrl', ['$scope', '$rootScope', 'userInfoService', 'saveService', '$timeout', '$location',
        function ($scope, $rootScope, userInfoService, saveService, $timeout, $location) {
            $scope.continueButtonValue = 'Continue';
            $scope.saveBegin = function () {
                $scope.$broadcast('doFormValidations');
                if (!$scope.beginForm.$valid) {
                    $timeout(function () {
                        $scope.$broadcast('doFormValidations');
                    });
                    return false;
                }

                /**
                 * watches the save service 'saving' variable to see if something is in the process of
                 * saving data at the movement. This will be refactored into a directive in the near future
                 */
                $location.path('/form/main');
                /*$scope.$watch(function (saveService) {
                        return saveService.saving;
                    },

                    function (newValue, oldValue) {
                        $scope.continueButtonValue = (newValue) ? 'Saving' : 'Continue';
                        $scope.disableContinue = (newValue) ? 'disabled' : '';

                        if (!newValue && oldValue) {
                            alert('hehe');
                            $location.path('/form/main');
                        }

                    }, true);*/


            }

        }]);

}(angular));








