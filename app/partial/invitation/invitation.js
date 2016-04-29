angular.module('app').controller('InvitationCtrl',function(
    $scope,
    $stateParams,
    authService){

    $scope.account = {};


    //na URL smo dolocili, kako se bo imenoval parameter, ki je pripet. /:code
    var code = $stateParams.code;

    authService.checkInvite(code)
        .then(function (res) {

            //skozi ta account bomo imeli dostop do podatkov, ki jih prejmemo iz streznika
            $scope.account = res.data;
        });

    $scope.onSaveClick = function () {

    };

});
