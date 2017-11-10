'use strict';

angular.module('users')
.factory('UserSvc', UserSvc);

function UserSvc ($resource) {
  return $resource(window.cmsprefix + '/user/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    query: {
      isArray: false
    },
    moveToTrashItems: {
      url: window.cmsprefix + '/user/moveToTrashItems',
      method: 'PUT',
    },
    publishItems: {
      url: window.cmsprefix + '/user/publishItems',
      method: 'PUT'
    },
    unPublishItems: {
      url: window.cmsprefix + '/user/unPublishItems',
      method: 'PUT'
    },
    deleteItems: {
      url: window.cmsprefix + '/user/deleteItems',
      method: 'PUT'
    },
    districts: {
      url: window.settings.services.apiUrl + '/districts',
      isArray: false,
      method: 'GET'
    },
    provinces: {
      url: window.settings.services.apiUrl + '/provinces',
      isArray: false,
      method: 'GET'
    }
  });
}
