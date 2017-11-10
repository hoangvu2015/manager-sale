'use strict';

angular.module('posts')
.factory('PostSvc', PostSvc);

function PostSvc ($resource) {
  return $resource(window.cmsprefix + '/post/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    query: {
      isArray: false
    },
    moveToTrashItems: {
      url: window.cmsprefix + '/post/moveToTrashItems',
      method: 'PUT',
    },
    publishItems: {
      url: window.cmsprefix + '/post/publishItems',
      method: 'PUT'
    },
    unPublishItems: {
      url: window.cmsprefix + '/post/unPublishItems',
      method: 'PUT'
    },
    deleteItems: {
      url: window.cmsprefix + '/post/deleteItems',
      method: 'PUT'
    }
  });
}
