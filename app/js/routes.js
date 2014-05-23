"use strict";

angular.module('silwebsite.routes', ['ngRoute'])

    // Since all of the page fetches are done in XHR requests, we
    // can't serve a 404 back to the client through this, so let's
    // just redirect to /home.
    .config(['$httpProvider', '$provide', function($httpProvider, $provide) {
        $provide.factory('404Interceptor', function($q, $injector) {
            return {
                'responseError': function(rejection, $location) {
                    if (rejection.status == 404) {
                        window.location="#/home";
                        $location.path("/home");
                        return $q.reject(rejection)
                    } else {
                        return $q.reject(rejection)
                    }
                }
            }
        });
        $httpProvider.interceptors.push('404Interceptor');
    }])

   // configure views; the authRequired parameter is used for specifying pages
   // which should only be available while logged in
    .config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/:path*', {
            //      templateUrl: function($routeParams) { return 'partials/'+$routeParams.path+'.html' },
            templateUrl: function($routeParams) {
                return 'partials/'+$routeParams.path+'.html'
            },
            controller: 'GenericCtrl'
        })
        $routeProvider.when('/account', {
            authRequired: true, // must authenticate before viewing this page
            templateUrl: 'partials/account.html',
            controller: 'AccountCtrl'
        });

        $routeProvider.when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/home'});
    }]);
