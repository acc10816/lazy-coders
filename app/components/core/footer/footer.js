(function(angular){
    'use strict';

    var appFooter = angular.module('appFooter',[]);

    appFooter.controller("footerCtrl", ['$scope', '$location', 'vendorInfoService', 'codeLists', 'bazaarVoiceService', function($scope, $location, vendorInfoService, codeLists,bazaarVoiceService){
        $scope.footerInfo = "footer information";
        $scope.date = new Date();


}]);

    RE;
}(angular));