'use strict';

ApplicationConfiguration.registerModule('categories');

angular.module('categories')
.config(function($stateProvider) {
  // course state routing
  $stateProvider.
  state('listCategory', {
    url: '/category',
    data: {
      menuType: 'list-category'
    },
    templateUrl: '/templates/admin-category/list.html',
    controller: 'CategoryController',
    controllerAs: 'vmCategory'
  }).
  state('createCategory', {
    url: '/category/create',
    data: {
      menuType: 'create-category'
    },
    templateUrl: '/templates/admin-category/form.html',
    controller: 'CategoryController',
    controllerAs: 'vmCategory'
  }).
  state('editCategory', {
    url: '/category/edit/:id',
    data: {
      menuType: 'list-category'
    },
    templateUrl: '/templates/admin-category/form.html',
    controller: 'CategoryController',
    controllerAs: 'vmCategory'
  });
});