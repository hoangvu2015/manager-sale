'use strict';

angular.module('<%= moduleName %>s')
.factory('<%= modelName %>Svc', <%= modelName %>Svc);

function <%= modelName %>Svc ($resource) {
  return $resource(window.cmsprefix + '/<%= moduleName %>/:id', {
    id: '@_id'
  }, {
    update: {
      method: 'PUT'
    },
    query: {
      isArray: false
    },
    moveToTrashItems: {
      url: window.cmsprefix + '/<%= moduleName %>/moveToTrashItems',
      method: 'PUT',
    },
    publishItems: {
      url: window.cmsprefix + '/<%= moduleName %>/publishItems',
      method: 'PUT'
    },
    unPublishItems: {
      url: window.cmsprefix + '/<%= moduleName %>/unPublishItems',
      method: 'PUT'
    },
    deleteItems: {
      url: window.cmsprefix + '/<%= moduleName %>/deleteItems',
      method: 'PUT'
    }
  });
}
