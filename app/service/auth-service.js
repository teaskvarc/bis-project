//v funkcijo vstavimo parameter:     $http
angular.module('app').factory('authService',function($http, NET) {

	//tukaj pisemo metode, kaj bo login-service delal

    var authService = {

        login:function(userData) {

           //to so podatki, ki jih poslijamo na streznik
            //$http.post metoda vrne PROMISE
            var promise = $http.post(NET.API_URL+'/api/account/login', userData);

            promise.then(function (res) {

            });

            return promise;
        },

        invite:function (userData) {

            var promise = $http.post(NET.API_URL+'/api/account/invite', userData);

            promise.then(function (res) {

            });

            return promise;
        },

        //preverimo kdo se zeli registrirati na podlagi povabila(invite)
        checkInvite: function () {

            var promise = $http.get(NET.API_URL+'/api/invite/check/'+code);

            promise.then(function (res) {

                console.log(res);

            });

            return promise;

        }
    };

	return authService;
});
