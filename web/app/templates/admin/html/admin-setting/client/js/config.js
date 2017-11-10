'use strict';

ApplicationConfiguration.registerModule('settings');

angular.module('settings')
.config(function($stateProvider) {
  // course state routing
  $stateProvider.
  state('listSetting', {
    url: '/setting',
    data: {
      menuType: 'list-setting'
    },
    templateUrl: '/templates/admin-setting/list.html',
    controller: 'SettingController',
    controllerAs: 'vmSetting'
  }).
  state('createSetting', {
    url: '/setting/create',
    data: {
      menuType: 'create-setting'
    },
    templateUrl: '/templates/admin-setting/form.html',
    controller: 'SettingController',
    controllerAs: 'vmSetting'
  }).
  state('editSetting', {
    url: '/setting/edit/:id',
    data: {
      menuType: 'list-setting'
    },
    templateUrl: '/templates/admin-setting/form.html',
    controller: 'SettingController',
    controllerAs: 'vmSetting'
  });
});