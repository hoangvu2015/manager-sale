'use strict';
import PageAdminContrller from './controller/page.controller.js';
import PageAdminVal from './validate/page.validate.js';

exports.register = function (server, options, next) {
  
  server.route({
    method: 'GET',
    path: '/page',
    handler: PageAdminContrller.getAll,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/page/{id}',
    handler: PageAdminContrller.edit,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/page',
    handler: PageAdminContrller.save,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: PageAdminVal.save,
      description: 'Create page',
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
    path: '/page/{id}',
    handler: PageAdminContrller.update,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: PageAdminVal.update,
      description: 'Update page',
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
    path: '/page/deleteItems',
    handler: PageAdminContrller.deleteItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/page/moveToTrashItems',
    handler: PageAdminContrller.moveToTrashItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/page/publishItems',
    handler: PageAdminContrller.publishItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/page/unPublishItems',
    handler: PageAdminContrller.unPublishItems,
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
  name: 'admin-page'
};
