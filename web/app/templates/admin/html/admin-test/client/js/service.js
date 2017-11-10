'use strict';

angular.module('tests')
.factory('TestSvc', TestSvc);

function TestSvc ($resource) {
  return $resource(window.cmsprefix + '/test/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    query: {
      isArray: false
    },
    moveToTrashItems: {
      url: window.cmsprefix + '/test/moveToTrashItems',
      method: 'PUT',
    },
    publishItems: {
      url: window.cmsprefix + '/test/publishItems',
      method: 'PUT'
    },
    unPublishItems: {
      url: window.cmsprefix + '/test/unPublishItems',
      method: 'PUT'
    },
    deleteItems: {
      url: window.cmsprefix + '/test/deleteItems',
      method: 'PUT'
    }
  });
}
