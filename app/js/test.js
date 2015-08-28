'use strict';

/* Controllers */
var examApp = angular.module('testCtrl', []);

examApp.controller('testCtrl', function($scope) {
	 Hello();
});


function Hello($scope, $http) {
    $http.get('http://rest-service.guides.spring.io/greeting').
        success(function(data) {
            $scope.greeting = data;
        });
}