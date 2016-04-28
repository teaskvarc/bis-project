angular.module('app').controller('LoginCtrl',function($scope){

    $scope.loginData = {};

    $scope.onLoginClick = function () {

        console.log($scope.loginData);
    };

});
