'use strict';

import TestAdminController from './controller/test.controller.js';
import TestAdminVal from './validate/test.validate.js';

exports.register = function (server, options, next) {
  
  server.route({
    method: 'GET',
    path: '/test',
    handler: TestAdminController.getAll,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/test/{id}',
    handler: TestAdminController.edit,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/test',
    handler: TestAdminController.save,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: TestAdminVal.save,
      description: 'Create test',
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
    path: '/test/{id}',
    handler: TestAdminController.update,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: TestAdminVal.update,
      description: 'Update test',
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
    path: '/test/deleteItems',
    handler: TestAdminController.deleteItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/test/moveToTrashItems',
    handler: TestAdminController.moveToTrashItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/test/publishItems',
    handler: TestAdminController.publishItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/test/unPublishItems',
    handler: TestAdminController.unPublishItems,
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
  name: 'admin-test'
};
