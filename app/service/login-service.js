//v funkcijo vstavimo parameter:     $http
angular.module('app').factory('loginService',function($http, NET) {

	//tukaj pisemo metode, kaj bo login-service delal
    var loginService = {

        login:function (userData) {

           //to so podatki, ki jih poslijamo na streznik
            var promise = $http.post(NET.API_URL+'/api/account/login', userData);

            promise.then(function (res) {

            });

            return promise;
        }
    };

	return loginService;
});
