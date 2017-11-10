'use strict';

ApplicationConfiguration.registerModule('banners');

angular.module('banners')
.config(function($stateProvider) {
  // course state routing
  $stateProvider.
  state('listBanner', {
    url: '/banner',
    data: {
      menuType: 'list-banner'
    },
    templateUrl: '/templates/admin-banner/list.html',
    controller: 'BannerController',
    controllerAs: 'vmBanner'
  }).
  state('createBanner', {
    url: '/banner/create',
    data: {
      menuType: 'create-banner'
    },
    templateUrl: '/templates/admin-banner/form.html',
    controller: 'BannerController',
    controllerAs: 'vmBanner'
  }).
  state('editBanner', {
    url: '/banner/edit/:id',
    data: {
      menuType: 'list-banner'
    },
    templateUrl: '/templates/admin-banner/form.html',
    controller: 'BannerController',
    controllerAs: 'vmBanner'
  });
});