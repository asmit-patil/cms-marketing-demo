var roi_app = angular.module('roiCalculator');

roi_app.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
})

roi_app.controller('roiController',function($scope){	
	$scope.items = data;	
	$scope.checkContent = function(content){
		// console.log(content);
		if(content == "Other"){
			$scope.other = true;
			$scope.newers = false;
		}
		else{
			$scope.other = false;
		}
		if(content == "Web"){
			$scope.valueIndex = 0;
			$scope.newers = true;
		}
		if(content == "Mobile"){
			$scope.valueIndex = 1;
			$scope.newers = true;
		}
		if(content == "Product"){
			$scope.valueIndex = 2;
			$scope.newers = true;
		}
	};


}); 