'use strict';

import UserController from './controller/user.controller.js';
import UserMid from './middleware/user.middleware.js';
import UserVal from './validate/user.validate.js';

exports.register = (server, options, next) => {
  
  server.route({
    method: 'GET',
    path: '/user',
    handler: UserController.getAll,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      pre: [
      {method: UserMid.getOptions, assign: 'options'}
      ]
    }
  });

  server.route({
    method: ['GET'],
    path: '/user/{id}',
    handler: UserController.edit,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      pre: [
      {method: UserMid.getById, assign: 'user'}
      ]
    }
  });

  server.route({
    method: 'POST',
    path: '/user',
    handler: UserController.save,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      pre: [
      {method: UserMid.getUserByEmail, assign: 'userByEmail'}
      ],
      validate: UserVal.save,
    }
  });

  server.route({
    method: ['GET'],
    path: '/user/sysaccount',
    handler: UserController.sysAccount,
    config: {
      pre: [
        { method: UserMid.getAuthUser, assign: 'user' }
      ],
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'PUT',
    path: '/user/{id}',
    handler: UserController.update,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      pre: [
      {method: UserMid.getById, assign: 'user'}
      ],
      validate: UserVal.update,
    }
  });

  server.route({
    method: ['PUT'],
    path: '/user/deleteItems',
    handler: UserController.deleteItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/user/moveToTrashItems',
    handler: UserController.moveToTrashItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/user/publishItems',
    handler: UserController.publishItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/user/unPublishItems',
    handler: UserController.unPublishItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'admin-user'
};