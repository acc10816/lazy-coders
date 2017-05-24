(function (angular, RE) {

    'use strict';

    RE.controller(
        'mainCtrl',
        [
            '$scope', '$location',
            function ($scope, $location) {

            $scope.back = function () {
                $location.path('/form/begin');
            }

            }]);
}(angular, RE));