angular.module('app', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);


//tukaj smo ustvarili konstantno vrednost
angular.module('app').constant('NET',{ API_URL:'http://localhost:3050' });

angular.module('app').config(function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'partial/login/login.html',
        controller: 'LoginCtrl',

    });
    /* Add New States Above */
    $urlRouterProvider.otherwise('/login');

});

angular.module('app').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});