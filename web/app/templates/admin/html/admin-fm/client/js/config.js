'use strict';

ApplicationConfiguration.registerModule('fm');

angular.module('fm')
.config(function($stateProvider, $urlMatcherFactoryProvider) {
    // posts state routing
    $urlMatcherFactoryProvider.type('path', {
      raw: true,
    });
    $stateProvider
    .state('listFiles', {
      url: '/fm/{path:.*}',
      data: {
        menuType: 'list-file'
      },
      templateUrl: '/templates/admin-fm/list-fm.html'
    })
    .state('editFile', {
      url: '/fm/:fileName/edit',
      data: {
        menuType: 'list-file'
      },
      templateUrl: '/templates/admin-fm/edit-fm.html'
    });
  });