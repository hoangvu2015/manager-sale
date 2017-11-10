'use strict';

ApplicationConfiguration.registerModule('<%= moduleName %>s');

angular.module('<%= moduleName %>s')
.config(function($stateProvider) {
  // course state routing
  $stateProvider.
  state('list<%= modelName %>', {
    url: '/<%= moduleName %>',
    data: {
      menuType: 'list-<%= moduleName %>'
    },
    templateUrl: '/templates/admin-<%= moduleName %>/list.html',
    controller: '<%= modelName %>Controller',
    controllerAs: 'vm<%= modelName %>'
  }).
  state('create<%= modelName %>', {
    url: '/<%= moduleName %>/create',
    data: {
      menuType: 'create-<%= moduleName %>'
    },
    templateUrl: '/templates/admin-<%= moduleName %>/form.html',
    controller: '<%= modelName %>Controller',
    controllerAs: 'vm<%= modelName %>'
  }).
  state('edit<%= modelName %>', {
    url: '/<%= moduleName %>/edit/:id',
    data: {
      menuType: 'list-<%= moduleName %>'
    },
    templateUrl: '/templates/admin-<%= moduleName %>/form.html',
    controller: '<%= modelName %>Controller',
    controllerAs: 'vm<%= modelName %>'
  });
});