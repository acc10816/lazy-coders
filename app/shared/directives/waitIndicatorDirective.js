(function (angular, RE) {

    RE.directive('waitIndicatorDirective', ['$rootScope', 'saveService', '$timeout', function ($rootScope, saveService, $timeout) {
        return {
            restrict: 'A',
            link: link
        };
        function doProcess($element) {
            $element.attr('disabled', 'disabled');
            $element.removeClass('spinner');
            $element.addClass('spinner-processing');
            $element.val('Processing');
        }

        function resetButton($element) {
            $element.removeAttr('disabled');
            $element.val('Continue');
            $element.removeClass('spinner');
            $element.removeClass('spinner-processing');
        }

        function doSaving($element) {
            $element.attr('disabled', 'disabled');
            $element.removeClass('spinner-processing');
            $element.addClass('spinner');
            $element.val('Saving');
        }

        function link($scope, $element, $attrs, ngCtrl) {
            $rootScope.openCount = 0;
            $element.bind('click', function () {
                $element.attr('disabled', 'disabled');
            });
            $rootScope.$on('validationError', function () {
                resetButton($element);
            });
            $rootScope.$on('savingStart', function () {
                doSaving($element);
            });
            $rootScope.$on('rulesStart', function () {
                if($rootScope.openCount === undefined){
                    $rootScope.openCount = 0;
                }
                $rootScope.openCount = $rootScope.openCount + 1;
                doProcess($element);
            });
            $rootScope.$on('rulesEnd', function () {
                $rootScope.openCount = $rootScope.openCount - 1;
                $timeout(function () {
                    if ($rootScope.saving !== true) {
                        resetButton($element);
                    }
                }, 250);
            });
        }

    }]);
}(angular, RE));