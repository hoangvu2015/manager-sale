'use strict';

angular.module('categories')
.factory('Categories', Categories);

function Categories ($resource) {
  return $resource(window.cmsprefix + '/category/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    query: {
      isArray: false
    },
    moveToTrashItems: {
      url: window.cmsprefix + '/category/moveToTrashItems',
      method: 'PUT',
    },
    publishItems: {
      url: window.cmsprefix + '/category/publishItems',
      method: 'PUT'
    },
    unPublishItems: {
      url: window.cmsprefix + '/category/unPublishItems',
      method: 'PUT'
    },
    deleteItems: {
      url: window.cmsprefix + '/category/deleteItems',
      method: 'PUT'
    }
  });
}
