'use strict';

import SettingAdminController from './controller/setting.controller.js';
import SettingVal from './validate/setting.validate.js';

exports.register = function (server, options, next) {
  
  server.route({
    method: 'GET',
    path: '/setting',
    handler: SettingAdminController.getAll,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/setting/{id}',
    handler: SettingAdminController.edit,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/setting',
    handler: SettingAdminController.save,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: SettingVal.save,
      description: 'Create setting',
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
    path: '/setting/{id}',
    handler: SettingAdminController.update,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: SettingVal.update,
      description: 'Update setting',
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
    path: '/setting/deleteItems',
    handler: SettingAdminController.deleteItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/setting/moveToTrashItems',
    handler: SettingAdminController.moveToTrashItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/setting/publishItems',
    handler: SettingAdminController.publishItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['PUT'],
    path: '/setting/unPublishItems',
    handler: SettingAdminController.unPublishItems,
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
  name: 'admin-setting'
};