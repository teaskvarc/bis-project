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
        }
    };

	return authService;
});
