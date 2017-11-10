'use strict';

ApplicationConfiguration.registerModule('posts');

angular.module('posts')
.config(function($stateProvider) {
  // course state routing
  $stateProvider.
  state('listPost', {
    url: '/post',
    data: {
      menuType: 'list-post'
    },
    templateUrl: '/templates/admin-post/list.html',
    controller: 'PostController',
    controllerAs: 'vmPost'
  }).
  state('createPost', {
    url: '/post/create',
    data: {
      menuType: 'create-post'
    },
    templateUrl: '/templates/admin-post/form.html',
    controller: 'PostController',
    controllerAs: 'vmPost'
  }).
  state('editPost', {
    url: '/post/edit/:id',
    data: {
      menuType: 'list-post'
    },
    templateUrl: '/templates/admin-post/form.html',
    controller: 'PostController',
    controllerAs: 'vmPost'
  });
});