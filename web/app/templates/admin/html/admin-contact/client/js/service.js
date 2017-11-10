'use strict';

angular.module('contacts')
.factory('ContactSvc', ContactSvc);

function ContactSvc ($resource) {
  return $resource(window.cmsprefix + '/contact/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    query: {
      isArray: false
    },
    moveToTrashItems: {
      url: window.cmsprefix + '/contact/moveToTrashItems',
      method: 'PUT',
    },
    publishItems: {
      url: window.cmsprefix + '/contact/publishItems',
      method: 'PUT'
    },
    unPublishItems: {
      url: window.cmsprefix + '/contact/unPublishItems',
      method: 'PUT'
    },
    deleteItems: {
      url: window.cmsprefix + '/contact/deleteItems',
      method: 'PUT'
    }
  });
}
