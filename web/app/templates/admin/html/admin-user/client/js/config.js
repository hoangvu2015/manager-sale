'use strict';

ApplicationConfiguration.registerModule('users');

angular.module('users')
.config(function($stateProvider) {
  // course state routing
  $stateProvider.
  state('listUser', {
    url: '/user',
    data: {
      menuType: 'list-user'
    },
    templateUrl: '/templates/admin-user/list.html',
    controller: 'UserController',
    controllerAs: 'vmUser'
  }).
  state('createUser', {
    url: '/user/create',
    data: {
      menuType: 'create-user'
    },
    templateUrl: '/templates/admin-user/form.html',
    controller: 'UserController',
    controllerAs: 'vmUser'
  }).
  state('editUser', {
    url: '/user/edit/:id',
    data: {
      menuType: 'list-user'
    },
    templateUrl: '/templates/admin-user/form.html',
    controller: 'UserController',
    controllerAs: 'vmUser'
  });
});