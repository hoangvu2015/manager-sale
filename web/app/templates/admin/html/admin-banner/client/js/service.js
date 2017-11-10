'use strict';

angular.module('banners')
.factory('BannerSvc', BannerSvc);

function BannerSvc ($resource) {
  return $resource(window.cmsprefix + '/banner/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    query: {
      isArray: false
    },
    moveToTrashItems: {
      url: window.cmsprefix + '/banner/moveToTrashItems',
      method: 'PUT',
    },
    publishItems: {
      url: window.cmsprefix + '/banner/publishItems',
      method: 'PUT'
    },
    unPublishItems: {
      url: window.cmsprefix + '/banner/unPublishItems',
      method: 'PUT'
    },
    deleteItems: {
      url: window.cmsprefix + '/banner/deleteItems',
      method: 'PUT'
    }
  });
}
