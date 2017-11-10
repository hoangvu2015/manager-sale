'use strict';

ApplicationConfiguration.registerModule('contacts');

angular.module('contacts')
.config(function($stateProvider) {
  // course state routing
  $stateProvider.
  state('listContact', {
    url: '/contact',
    data: {
      menuType: 'list-contact'
    },
    templateUrl: '/templates/admin-contact/list.html',
    controller: 'ContactController',
    controllerAs: 'vmContact'
  }).
  state('createContact', {
    url: '/contact/create',
    data: {
      menuType: 'create-contact'
    },
    templateUrl: '/templates/admin-contact/form.html',
    controller: 'ContactController',
    controllerAs: 'vmContact'
  }).
  state('editContact', {
    url: '/contact/edit/:id',
    data: {
      menuType: 'list-contact'
    },
    templateUrl: '/templates/admin-contact/form.html',
    controller: 'ContactController',
    controllerAs: 'vmContact'
  });
});