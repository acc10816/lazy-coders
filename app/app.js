// Declare app level module which depends on views, and components

var RE = angular.module('RE', ['ui.router'/*,'ngAnimate'*/]);

RE.config(function ($stateProvider, $urlRouterProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);

    $stateProvider.state('form', {
        url: '/form',
        templateUrl: 'components/begin/form.html',
        controller: 'formController'
    })
        .state('form.begin', {
            url: '/begin',
            views: {
                /*"nav@": {
                    templateUrl: 'components/core/menu/menu.html'
                },*/
                "content@": {
                    templateUrl: 'components/begin/begin.html'
                }
            }
        })

    /***
     * url will be /form/product
     * Route to Product Page
     */
        .state('form.main', {
            url: '/main',
            views: {
                /*"nav@": {
                    templateUrl: 'components/core/menu/menu.html'
                },*/
                "content@": {
                    templateUrl: 'components/main/main.html'
                }
            }

        });


    /**
     * catch all route
     * Default Route to Begin Page (/form/begin)
     */
    $urlRouterProvider.otherwise('/form/begin');

});

RE.run(function () {

}).directive("siteHeader",function(){
    return {
        restrict: 'E',
        templateUrl:'components/core/header/header.html'
    };
}).directive("siteFooter",function(){
    return {
        restrict: 'E',
        templateUrl:'components/core/footer/footer.html'

    };
}).controller("headerCtrl", ['$scope','$location', function($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
}]).controller("footerCtrl", ['$scope', function($scope){
    $scope.footerInfo = "footer information";
    $scope.date = new Date();


}]);
