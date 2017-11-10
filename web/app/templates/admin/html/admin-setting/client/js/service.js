'use strict';

angular.module('settings')
.factory('SettingSvc', SettingSvc);

function SettingSvc ($resource) {
  return $resource(window.cmsprefix + '/setting/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    query: {
      isArray: false
    },
    moveToTrashItems: {
      url: window.cmsprefix + '/setting/moveToTrashItems',
      method: 'PUT',
    },
    publishItems: {
      url: window.cmsprefix + '/setting/publishItems',
      method: 'PUT'
    },
    unPublishItems: {
      url: window.cmsprefix + '/setting/unPublishItems',
      method: 'PUT'
    },
    deleteItems: {
      url: window.cmsprefix + '/setting/deleteItems',
      method: 'PUT'
    }
  });
}
