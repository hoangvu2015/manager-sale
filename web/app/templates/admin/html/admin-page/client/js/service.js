'use strict';

angular.module('pages')
.factory('PageSvc', PageSvc);

function PageSvc ($resource) {
  return $resource(window.cmsprefix + '/page/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    query: {
      isArray: false
    },
    moveToTrashItems: {
      url: window.cmsprefix + '/page/moveToTrashItems',
      method: 'PUT',
    },
    publishItems: {
      url: window.cmsprefix + '/page/publishItems',
      method: 'PUT'
    },
    unPublishItems: {
      url: window.cmsprefix + '/page/unPublishItems',
      method: 'PUT'
    },
    deleteItems: {
      url: window.cmsprefix + '/page/deleteItems',
      method: 'PUT'
    }
  });
}
