'use strict';

import OrderAdminController from './controller/order.controller.js';
import OrderAdminVal from './validate/order.validate.js';

exports.register = function (server, options, next) {
  
  server.route({
    method: 'GET',
    path: '/order',
    handler: OrderAdminController.getAll,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/order/{id}',
    handler: OrderAdminController.edit,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/order',
    handler: OrderAdminController.save,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: OrderAdminVal.save,
      description: 'Create order',
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
    path: '/order/{id}',
    handler: OrderAdminController.update,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: OrderAdminVal.update,
      description: 'Update order',
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
    path: '/order/deleteItems',
    handler: OrderAdminController.deleteItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/order/moveToTrashItems',
    handler: OrderAdminController.moveToTrashItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/order/publishItems',
    handler: OrderAdminController.publishItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/order/unPublishItems',
    handler: OrderAdminController.unPublishItems,
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
  name: 'admin-order'
};
