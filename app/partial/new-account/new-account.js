angular.module('app').controller('NewAccountCtrl',function($scope, authService){

    $scope.roles = ['Patient', 'Doctor','Admin', ' Nurse'];

    $scope.newUser = {

        role:'Patient'
    };

    $scope.onInviteClick = function () {

        authService.invite($scope.newUser);

    };

});
