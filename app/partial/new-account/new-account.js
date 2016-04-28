angular.module('app').controller('NewAccountCtrl',function($scope){

    $scope.roles = ['Patient', 'Doctor','Admin', ' Nurse'];

    $scope.newUser = {

        role:'Patient'
    };

});
