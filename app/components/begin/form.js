(function (angular, RE) {
'use strict';


RE.controller(
		'formController',
		function($scope, $state) {

			// we will store all of our form data in this object
			$scope.formData = {};

			// function to process the form
			$scope.processForm = function() {
				
			};

			$scope.validate = function(uid) {
				
			};
			$scope.alerts = [];

			$scope.openPlain = function() {
				//var message='Your primary business is the service or product that creates the majority of your annual revenue';
				$scope.alerts
						.push({
							msg : 'Your primary business is the service or product that creates the majority of your annual revenue.'
						});
			};
			$scope.closeAlert = function(index) {
				$scope.alerts.splice(index, 1);
			};
		});



}(angular, RE));