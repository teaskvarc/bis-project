angular.module('app').controller('LoginCtrl',function($scope, authService){

    $scope.loginData = {};

    $scope.onLoginClick = function () {

        console.log($scope.loginData);
        authService.login($scope.loginData)
            .then(function (res) {

                console.log(res.data);

            });
    };

});
