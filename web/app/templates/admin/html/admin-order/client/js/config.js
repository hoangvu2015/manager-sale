'use strict';

ApplicationConfiguration.registerModule('orders');

angular.module('orders')
.config(function($stateProvider) {
  // course state routing
  $stateProvider.
  state('listOrder', {
    url: '/order',
    data: {
      menuType: 'list-order'
    },
    templateUrl: '/templates/admin-order/list.html',
    controller: 'OrderController',
    controllerAs: 'vmOrder'
  }).
  state('createOrder', {
    url: '/order/create',
    data: {
      menuType: 'create-order'
    },
    templateUrl: '/templates/admin-order/form.html',
    controller: 'OrderController',
    controllerAs: 'vmOrder'
  }).
  state('editOrder', {
    url: '/order/edit/:id',
    data: {
      menuType: 'list-order'
    },
    templateUrl: '/templates/admin-order/form.html',
    controller: 'OrderController',
    controllerAs: 'vmOrder'
  });
});