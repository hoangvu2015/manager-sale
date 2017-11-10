'use strict';

angular.module('orders')
.factory('OrderSvc', OrderSvc);

function OrderSvc ($resource) {
  return $resource(window.cmsprefix + '/order/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    query: {
      isArray: false
    },
    moveToTrashItems: {
      url: window.cmsprefix + '/order/moveToTrashItems',
      method: 'PUT',
    },
    publishItems: {
      url: window.cmsprefix + '/order/publishItems',
      method: 'PUT'
    },
    unPublishItems: {
      url: window.cmsprefix + '/order/unPublishItems',
      method: 'PUT'
    },
    deleteItems: {
      url: window.cmsprefix + '/order/deleteItems',
      method: 'PUT'
    }
  });
}
