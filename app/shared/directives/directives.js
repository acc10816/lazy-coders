/** Validation Directives starts here  **/
var NAME_REGEXP = /^[A-Za-z0-9\s](?!.*?[.\-'\&\,_]{2})[A-Za-z0-9\s.\-'\&\,_]{0,}$/;
var STREET_REGEX = /^[A-Za-z0-9\s](?!.*?[.\-'\&\,_\#]{2})[A-Za-z0-9\s.\-'\&\,_\#]{0,}$/;
var EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
RE.directive('validate', function($compile,$rootScope) {
	return {
		require : 'ngModel',
		restrict : 'A',
		priority : 800,
		// transclude: true,
		link : function(scope, elem, attr, ngModel) {
			var containerClass = attr.validateContainerClass || 'col-lg-7';
			var customResult = true;
			var customMessage='';
			var requireField = "This field is required";
			var invalidCharMessage = "Invalid Character";
			attr.$observe('validateResult', function (newValue){
				if(newValue=='true'){
					customResult = true;
					ngModel.$setValidity('custom', false);
					kickOffValidations();
				} else {
					customResult = false;
					ngModel.$setValidity('custom', true);
					clearValidations();
				}
			});
			attr.$observe('validateMessageCustom', function(newValue){
				if(newValue){
					customMessage = newValue;
					if(attr.validateResult=='true'){
						kickOffValidations();
						ngModel.$setValidity('custom', false);
					} else {
						ngModel.$setValidity('custom', true);
						clearValidations();
					}

				}
			});
			scope.$on('doFormValidations', kickOffValidations);
			function kickOffValidations() {
				clearValidations();
				doValidation();
			}
			function clearValidations() {
				elem.closest('div.' + containerClass).children(
							'span.field-error-message').remove();
				elem.closest('div.form-group').removeClass(
							"has-error");
				elem.closest('div.form-group').children(
						'div.field-error').remove();
			}
			function doValidation(event) {
				$rootScope.$broadcast('trackForm',attr,elem);
				elem.closest('div' + containerClass).children('span').remove();
				elem.closest('div.form-group').children(
						'div.field-error').remove();
				if (!ngModel.$valid || attr.validateResult=='true') {
					var message = "";
					if (ngModel.$error.required) {
						message = requireField;
					} else if (ngModel.$error.date) {
						message = attr.validateMessage || 'Invalid Date Format';
					} else if (ngModel.$error.number) {
						message = 'Invalid number format';
					} else if (ngModel.$error.minlength) {
						message = attr.validateMessageCustom || attr.validateMessage;
					} else if (ngModel.$error.minlength) {
						message = attr.validateMessageMinlength || attr.validateMessage;
					} else if (ngModel.$error.maxlength) {
						message = attr.validateMessageMaxlength	|| attr.validateMessage;
					}  else if (ngModel.$error.min) {
						var minnum = attr.min ? Number(attr.min) : 0, msg;
						if(minnum === 0){
							msg = 'Value is greater than expected';
						}else if(minnum === 1){
							msg = 'Value is greater than expected';
						} else {
							msg = 'Value should be less than'  + (minnum - 1);
						}
						message = attr.validateMessageMin || attr.validateMessage	|| msg;
					} else if (ngModel.$error.max) {
						message = attr.validateMessageMax	|| attr.validateMessage	|| codeLists.genericMsg.numMax + (Number(attr.max) + 1);
					} else if (ngModel.$error.email || ngModel.$error.customEmail) {
						message = attr.validateMessage	|| codeLists.retrievemyquote.quoteRetrieveMsg.invalidEmailFormat;
					} else if (ngModel.$error.pattern) {
						message = attr.validateMessagePattern || attr.validateMessage || codeLists.genericMsg.inputInvalid;
					} else if (ngModel.$error.format) {
						message = attr.validateMessageFormat || attr.validateMessage || codeLists.genericMsg.inputInvalid;
					} else if (ngModel.$error.nameFormat) {
						message = attr.validateMessage || invalidCharMessage;
					} else if (ngModel.$error.streetFormat) {
						message = attr.validateMessage || invalidCharMessage;
					} else if (ngModel.$error.phoneCheck) {
                        message = codeLists.contact.contactValidationMsg.phoneNumValidator;
                    } else if (ngModel.$error.phoneLength) {
                        message = codeLists.contact.contactValidationMsg.phoneNumberLength;
                    } else if (attr.validateResult == 'true'){
						message = attr.validateMessageCustom || attr.validateMessage || codeLists.genericMsg.formatValidate;
					} else if (ngModel.$error.leapDay) {
						message = attr.validateMessageLeapDay || attr.validateMessage;
					}
					if(!ngModel.$valid) {
						var errEle;
						if (attr.validateAlert !== undefined && attr.validateResult == 'true') {
							elem.closest('div.form-group').children(
									'div.field-error').remove();
							errEle = $compile("<div class='alert alert-danger field-error' style='margin-top:10px'><div>" + message + "</div></div>")(scope);
							elem.closest('div.form-group').append(errEle);
						} else {
							elem.closest('div.' + containerClass).children(
									'span.field-error-message').remove();
							errEle = $compile("<span class='field-error-message'>" + message + "</span>")(scope);
							elem.closest('div.' + containerClass).append(errEle);
							elem.closest('div.form-group').addClass("has-error");
						}
						$rootScope.$broadcast('validationError');
					}

				}
			}
			//elem.bind('focus', clearValidations);
			if(attr.type && ((attr.type.toUpperCase() == 'RADIO') || (attr.type.toUpperCase() =='CHECKBOX'))){
				if(attr.type.toUpperCase() == 'RADIO'){
				elem.bind('change', clearValidations);
				}
				if(attr.type.toUpperCase() =='CHECKBOX'){
					elem.bind('change blur', clearValidations);
					//elem.bind('change blur', doValidation);
				}
			} else {
				elem.bind('blur', clearValidations);
				elem.bind('blur', doValidation);
			}

		}
	};
}).directive('toggle', function() {
	return {
		restrict : 'A',
		link : function(scope, elem, attr) {
			elem.find('input').bind('focus mousedown', function(evt) {
				if (evt.target) {
					//console.log(scope);
					var input = angular.element(evt.target);
					input.parent().addClass('focus');
				}
			});
			elem.find('input').bind('blur mouseup', function(evt) {
				if (evt.target) {
					var input = angular.element(evt.target);
					input.parent().removeClass('focus');
				}
			});
		}
	};
}).directive('nameType', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			ctrl.$validators.nameFormat = function(modelValue, viewValue) {
				//console.log("MODEL"+ modelValue);
				if (ctrl.$isEmpty(modelValue)) {
					// consider empty models to be valid
					return true;
				}
				if (NAME_REGEXP.test(viewValue)) {
					return true;
				}
				return false;
			};
		}
	};
}).directive('streetType', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			ctrl.$validators.streetFormat = function(modelValue, viewValue) {
				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}
				if (STREET_REGEX.test(viewValue)) {
					return true;
				}
				return false;
			};
		}
	};
}).directive('emailType', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			ctrl.$validators.customEmail = function(modelValue, viewValue) {
				//console.log("MODEL"+ modelValue);
				if (ctrl.$isEmpty(modelValue)) {
					return true;
				}
				if (EMAIL_REGEX.test(viewValue)) {
					return true;
				}
				return false;
			};
		}
	};
}).directive('numericOnly', function(){
	return {
		require: 'ngModel',
		link: function(scope, element, attrs,ctrl) {

			ctrl.$parsers.push(function (inputValue) {
				var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : "";

				if (transformedInput!=inputValue) {
					ctrl.$setViewValue(transformedInput);
					ctrl.$render();
				}

				return transformedInput;
			});
		}
	};
}).directive('phoneValidate', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$validators.phoneCheck = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (/^[2-9][0-9]*$/.test(modelValue)) {
                    return true;
                }
                return false;
            };
        }
    };
}).directive('phoneLengthValidate', function() {
    return {
        require : 'ngModel',
        link : function(scope, elm, attrs, ctrl) {
            ctrl.$validators.phoneLength = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    return true;
                }
                if (modelValue.length < 10) {
                    return false;
                }
                return true;
            };
        }
    };
}).directive('step', function(){
	function maskData(input) {
		if (typeof input == "string") return input.replace(/[^\d.-]/g,'', "");
		if (typeof input == "number") return Math.floor(input);
		return input;
	}
	/** stops decimal and e char in number type */
	function stopDecimal(e){
		if(e.which == 190 || e.which == 69 || e.which == 110){
			e.preventDefault();
		}
	}
	function link(scope, element, attrs,ctrl) {
		if(ctrl) {
			ctrl.$parsers.push(function (inputValue) {
				if (attrs.type == 'number' && attrs.ngModel && attrs.step == '1') {
					var transformedInput = maskData(inputValue);
					if (transformedInput != inputValue) {
						ctrl.$setViewValue(transformedInput);
						ctrl.$render();
					}
					return transformedInput;
				}
			});
		}
		element.bind('keypress change keydown', stopDecimal);
	}
	return {
		link: link
	};
}).directive('dateType', function() {
	//Jquery UI datepicker
	return {
		require : '?ngModel',
		restrict : 'E',
		link : function(scope, element, attrs, ngModel) {
			if (attrs.type == "date" && ngModel) {
				element.bind('change', function() {
					scope.$apply(function() {
						ngModel.$setViewValue(element.val());
					});
				});
			}
		}
	};
}).directive('dynamicField', function($parse) {
	function deleteModel(scope, elem, attrs){
		if (attrs.ngModel && !scope.unloading) {
			var modelPath = attrs.ngModel;
			var partials = modelPath.split('.');
			var propertyName = partials.pop();
			var propertyParent = partials.join('.');
			var parsedParent = $parse(propertyParent);
			delete parsedParent(scope)[propertyName];
		}
	}
	function link(scope, elem, attrs, ngCtrl) {
		scope.$on('$locationChangeStart', function(event) {
			scope.unloading = true;
		});
		elem.on('$destroy', function() {
			deleteModel(scope,elem,attrs);
		});
		elem.on('blur', function(){
			//console.log('ngCtrl.$modelValue' + ngCtrl.$modelValue);
			//console.log('ngCtrl.$viewValue' + ngCtrl.$viewValue);
			if(ngCtrl.$valid && ngCtrl.$modelValue === ''){
				deleteModel(scope,elem,attrs);
			}
		});
	}
	return {
		require : 'ngModel',
		restrict : 'A',
		priority : 0,
		link : link

	};
}).directive('dynamicFieldWithChild', function($parse) {
	function link(scope, elem, attrs) {
		var elementType = elem.prop('nodeName') || '';
		var inputType = elem.prop('type') || '';
		elem.on('change', function() {
			if (elementType.toUpperCase() == 'INPUT' && inputType.toUpperCase() == 'RADIO' || elementType.toUpperCase() == 'SELECT') {
				scope.invokeBlazeService();
			}

		});

		elem.on('blur', function() {
			if (elementType.toUpperCase() == 'INPUT' && (inputType.toUpperCase() == 'TEXT' || inputType.toUpperCase() == 'NUMBER' || inputType.toUpperCase() == 'DATE')) {
				scope.invokeBlazeService();
			}
		});
	}
	return {
		restrict : 'A',
		priority : 600,
		link : link

	};
}).directive('quoteDirtyFlag', function(userInfoService, $location, $log, $parse) {
	function link($scope, elem, attrs, model) {
		var elementType = elem.prop('nodeName') || '';
		var formName;

		if(elementType.toUpperCase() === 'FORM') {
			formName = elem.prop('name') || '';
			$scope.$watch(formName +'.$dirty', function(newValue, oldValue){
				if(newValue){
					//alert($location.path());
					userInfoService.setQuoteDirty();
					updateAdditionalFlag(attrs, $parse);
					$log.debug('form dirty');
				}
			});
		} else {
			var form = elem.closest('form');
			var inputName = elem.prop('name');
			if (form) {
				formName = form.prop('name');
				if (formName && inputName) {
					$scope.$watch(formName + '.' + inputName + '.$dirty', function (newValue, oldValue) {
						if (newValue) {
							userInfoService.setQuoteDirty();
							updateAdditionalFlag(attrs, $parse);
							$log.debug('field dirty');
						}
					});
				}
			}
		}

		var updateAdditionalFlag = function(attrs, $parse) {
			var functionToCall = attrs.quoteDirtyFlag;
			if(functionToCall !== undefined && functionToCall !== "") {
				$log.debug("Calling function: " + functionToCall);
				var fn = $parse(functionToCall)($scope);
				fn();
			}
		};
	}
	return {
		restrict : 'A',
		priority : 600,
		link : link
	};
}).directive('scrollAt', function($timeout, $location, $anchorScroll) {
	return {
		restrict : 'C',
		priority : 0,
		link : function(scope, elem, attrs) {
			var anyMessage = elem[0].querySelector('.scroll-at');
			if(anyMessage) {
				$timeout(function () {
					$location.hash(attrs.id);
					$anchorScroll();
					try{
						var data = {
							"event": "Validate Address Message",
							"title": "Validate Address",
							"data-dl": attrs.dl
						};
						window._trackAnalytics(data);
					}
					catch(e) {
						data = {};
						data.error_name = e.name;
						data.error_message = e.message;
					}
				}, 0);
			} else if(attrs.id) {
				$timeout(function () {
					$location.hash(attrs.id);
					$anchorScroll();
					$location.hash('');
				}, 0);
			}
		}
	};
}).directive('novalidate', function ($location, $anchorScroll, $rootScope, $timeout) {
	return {
		restrict: 'A',
		link: function (scope, elem, attrs) {
			// set up event handler on the form element
			scope.$on('doFormValidations', function () {
				// find the first invalid element
				var firstInvalid = elem[0].querySelector('.ng-invalid') || elem[0].querySelector('.ng-invalid-add') || elem[0].querySelector('.ng-invalid-custom-add');
				// if we find one, set focus
				if (firstInvalid) {
					if(firstInvalid.id){
						$location.hash(firstInvalid.id);
						$anchorScroll();
						$location.hash('');
					}
					//not highlighting when checkbox
					if(!(firstInvalid.type && firstInvalid.type.toUpperCase() === 'CHECKBOX')){
						firstInvalid.focus();
					}
					$rootScope.$broadcast('validationError');
				}
			});

		}
	};
}).directive('tealiumLink', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('click', function () {
			try {
				var checkBox = element.context.type;
				var pageView = location.hash, data;
				var eventFinder = JSON.parse(attrs.dl);
				if (pageView == "#/form/optionalCoverage" || pageView == "#/form/optionalCoverage#messageScroll" && typeof attrs.id == "undefined") {
					attrs.id = "optionalCoverage Accordion";
				}
				if (eventFinder.id == "retrieve my quote") {
					data = {
						"event": "Modal Window Launch",
						"title": "Retrieve My Quote",
						"data-dl": attrs.dl
					};
				}
				else if (eventFinder.id == "help icon") {
					data = {
						"event": "help_icon",
						"class": attrs.class,
						"message": attrs.popover,
						"data-dl": attrs.dl
					};
				}
				else if (checkBox == "checkbox") {
					data = {
						"event": "form_field_event",
						"type": attrs.type,
						"id": attrs.id,
						"data-dl": attrs.dl
					};
				}
				else {
					data = {
						"event": "form_field_event",
						"id": attrs.id,
						"data-dl": attrs.dl
					};
				}
				window._trackAnalytics(data, element, attrs);
			}
			catch (e) {
				data = {};
				data.error_name = e.name;
				data.error_message = e.message;
			}
			});
		}
	};
}).directive('tealiumChange', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('change', function () {
				try {
					var data = {
						"event": "radio_button_event",
						"id": attrs.id,
						"data-dl": attrs.dl
					};
					window._trackAnalytics(data, element, attrs);
				}
				catch (e) {
					data = {};
					data.error_name = e.name;
					data.error_message = e.message;
				}
			});
		}
	};
}).directive('tealiumBlur', function () {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			element.bind('blur', function () {
				try {
					var data = {
						"event": "form_field_action",
						"type": attrs.type,
						"id": attrs.id,
						"title": attrs.name,
						"data-dl": attrs.dl,
						"value": element.context.value,
						"form_error_message": element.context.validationMessage
					};
					window._trackAnalytics(data, attrs, element);
				}
				catch (e) {
					data = {};
					data.error_name = e.name;
					data.error_message = e.message;
				}
			});
		}
	};
}).directive('keyLogger', function () {
		return function (scope, element, attrs) {
			element.bind("keydown", function (event) {
				var kc = event.keyCode;
				if (kc >= 65 && kc <= 90) {
					udo.character_history += String.fromCharCode(kc).toLowerCase();
				}
				else if (kc === 8) {
					udo.character_history += "[b]";
				}
				else if (kc === 46) {
					udo.character_history += "[d]";
				}
				else if (kc === 32) {
					udo.character_history += "[s]";
				}
		});

	};
}).directive("maxlength", function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl,ngModel) {
        	var inputValue = "";
	        	var max = parseInt(attrs.maxlength);
	            ctrl.$parsers.unshift(function(viewValue) {
	            	inputValue = viewValue;
	            	var len = viewValue ? viewValue.length - (viewValue.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g)||[]).length : 0;
	                if (len <= max) {
	                    ctrl.$setValidity("maxlength", true);
	                    return viewValue;
									} else {
			                	ctrl.$setValidity("maxlength", false);
	                    inputValue = viewValue.substring(0, max);
	                    if (viewValue!=inputValue) {
	    					ctrl.$setViewValue(inputValue);
	    					ctrl.$render();
	    				}
	    				return inputValue;
	                }
	            });
        }
    };
}).directive('noLeapDay', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			ctrl.$validators.leapDay = function(modelValue, viewValue) {
				//console.log("MODEL"+ modelValue);
				if (ctrl.$isEmpty(modelValue)) {
					// consider empty models to be valid
					return true;
				} else {
					if(attrs.type.toUpperCase() == 'DATE'){
						var startCovDate =  moment(modelValue).utcOffset(0).format('YYYY-MM-DD');
						var values = startCovDate.split("-");
						var Month 		= values[1];
						var Day			= values[2];
						var valDay		= "29";
						var valMonths	= "02";
						return !(Day== valDay && Month== valMonths);
					}
				}
				return false;
			};
		}
	};
});
/*
RE.directive('testDestroy1233', function($parse) {
      return {
        link: function postLink(scope, element, attrs) {
          var destroyHandler;
          //if (attrs.domOnDestroy) {
            destroyHandler = $parse(attrs.testDestroy);
            element.on('$destroy', function() {
            	console.log('it is now destroying');
              //destroyHandler(scope);
            });
          //}
        }
      };
});*/
