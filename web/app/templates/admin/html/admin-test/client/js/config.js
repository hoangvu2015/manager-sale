'use strict';

ApplicationConfiguration.registerModule('tests');

angular.module('tests')
.config(function($stateProvider) {
  // course state routing
  $stateProvider.
  state('listTest', {
    url: '/test',
    data: {
      menuType: 'list-test'
    },
    templateUrl: '/templates/admin-test/list.html',
    controller: 'TestController',
    controllerAs: 'vmTest'
  }).
  state('createTest', {
    url: '/test/create',
    data: {
      menuType: 'create-test'
    },
    templateUrl: '/templates/admin-test/form.html',
    controller: 'TestController',
    controllerAs: 'vmTest'
  }).
  state('editTest', {
    url: '/test/edit/:id',
    data: {
      menuType: 'list-test'
    },
    templateUrl: '/templates/admin-test/form.html',
    controller: 'TestController',
    controllerAs: 'vmTest'
  });
});