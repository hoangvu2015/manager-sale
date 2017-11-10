'use strict';

ApplicationConfiguration.registerModule('pages');

angular.module('pages')
.config(function($stateProvider) {
  // course state routing
  $stateProvider.
  state('listPage', {
    url: '/page',
    data: {
      menuType: 'list-page'
    },
    templateUrl: '/templates/admin-page/list.html',
    controller: 'PageController',
    controllerAs: 'vmPage'
  }).
  state('createPage', {
    url: '/page/create',
    data: {
      menuType: 'create-page'
    },
    templateUrl: '/templates/admin-page/form.html',
    controller: 'PageController',
    controllerAs: 'vmPage'
  }).
  state('editPage', {
    url: '/page/edit/:id',
    data: {
      menuType: 'list-page'
    },
    templateUrl: '/templates/admin-page/form.html',
    controller: 'PageController',
    controllerAs: 'vmPage'
  });
});