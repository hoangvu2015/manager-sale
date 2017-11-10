'use strict';

import <%= modelName %>AdminController from './controller/<%= moduleName %>.controller.js';
import <%= modelName %>AdminVal from './validate/<%= moduleName %>.validate.js';

exports.register = function (server, options, next) {
  
  server.route({
    method: 'GET',
    path: '/<%= moduleName %>',
    handler: <%= modelName %>AdminController.getAll,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/<%= moduleName %>/{id}',
    handler: <%= modelName %>AdminController.edit,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/<%= moduleName %>',
    handler: <%= modelName %>AdminController.save,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: <%= modelName %>AdminVal.save,
      description: 'Create <%= moduleName %>',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'form'
        }
      },
    }
  });

  server.route({
    method: ['PUT', 'POST'],
    path: '/<%= moduleName %>/{id}',
    handler: <%= modelName %>AdminController.update,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: <%= modelName %>AdminVal.update,
      description: 'Update <%= moduleName %>',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'form'
        }
      },
    }
  });

  server.route({
    method: ['PUT'],
    path: '/<%= moduleName %>/deleteItems',
    handler: <%= modelName %>AdminController.deleteItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/<%= moduleName %>/moveToTrashItems',
    handler: <%= modelName %>AdminController.moveToTrashItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/<%= moduleName %>/publishItems',
    handler: <%= modelName %>AdminController.publishItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/<%= moduleName %>/unPublishItems',
    handler: <%= modelName %>AdminController.unPublishItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'admin-<%= moduleName %>'
};
