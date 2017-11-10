'use strict';
ApplicationConfiguration.registerModule('core');

// Setting up route
angular.module('core')
.config(config)

function config ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.
    state('home', {
        url: '/',
        templateUrl: '/templates/admin-core/home.html'
    });
}
