'use strict';

angular.module('auth').controller('AuthenticationController', ['$scope', '$http', '$location', '$window', 'Authentication',
    function($scope, $http, $location, $window, Authentication) {
        $scope.authentication = Authentication;

        $scope.signin = function() {
            var data = $scope.credentials;
            data.scope = 'admin';
            $http.post($window.settings.services.apiUrl + window.cmsprefix + '/login', data)
                .then(function(response) {
                    if (response.data.token) {
                        $window.location.href = window.cmsprefix;
                    }
                    $scope.error = response.message;
                })
                .catch(function(response) {
                    $scope.error = response.data.message;
                });
        };

        $scope.signout = function() {
            $http.get($window.settings.services.apiUrl + window.cmsprefix + '/logout')
                .then(function(response) {
                    $scope.authentication.user = '';
                    $window.location.href = window.cmsprefix;
                })
                .catch(function(response) {
                    $scope.error = response.data.message;
                });
        };
    }
]);