(function (angular, RE) {
    "use strict";
    RE.factory('saveService', ['$rootScope', '$timeout', '$http', 'userInfoService',
        function ($rootScope, $timeout, $http, userInfoService) {

            $rootScope.saving = false;
            function saveData() {
                $rootScope.$broadcast('savingStart');
                var deferred = $timeout(function () {
                    if($rootScope.openCount > 0){
                        $rootScope.saving = false;
                        return;
                    }
                    invokeSaveData(userInfoService.getQuoteData());
                }, 200);
            }

            function invokeSaveData(quoteData) {
                //$rootScope.saving = true;
                $rootScope.saving = true;
                $timeout(function () {
                    $rootScope.saving = false;
                }, 1000);

            }

            return {
                saveData: saveData,
                saving: $rootScope.saving
            };
        }]);
}(angular, RE));
