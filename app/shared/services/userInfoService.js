(function (angular, RE) {
    RE.service('userInfoService', function () {
        var appData;

        this.init = function () {
            this.quoteData = {};
            appData = this.quoteData;
            appData.begin = appData.begin || {};
            appData.main = appData.main || {};
        };
        this.init();
        function getBegin () {
            return appData.begin;
        }

        function getFullData() {
            return this;
        }
        function getMain () {
            return this.main;
        }


        return {
            begin: getBegin,
            main: getMain,
            getFullData: getFullData
        }
    });
}(angular, RE));
