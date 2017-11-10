'use strict';

import CategoryAdminController from './controller/category.controller.js';
import CategoryAdminVal from './validate/category.validate.js';

exports.register = function (server, options, next) {
  
  server.route({
    method: 'GET',
    path: '/category',
    handler: CategoryAdminController.getAll,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/category/{id}',
    handler: CategoryAdminController.edit,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/category',
    handler: CategoryAdminController.save,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: CategoryAdminVal.save,
      description: 'Create category',
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
    path: '/category/{id}',
    handler: CategoryAdminController.update,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: CategoryAdminVal.update,
      description: 'Update category',
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
    path: '/category/deleteItems',
    handler: CategoryAdminController.deleteItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/category/moveToTrashItems',
    handler: CategoryAdminController.moveToTrashItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/category/publishItems',
    handler: CategoryAdminController.publishItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/category/unPublishItems',
    handler: CategoryAdminController.unPublishItems,
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
  name: 'admin-category'
};
