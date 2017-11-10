'use strict';

import Joi from 'joi'
import EmailCampaignCtr from './controller/email-campaign.controller.js'
import EmailCampaignMid from './middleware/email-campaign.middleware.js'

exports.register = function (server, options, next) {

  server.route({
    method: 'GET',
    path: '/email-campaign',
    handler: EmailCampaignCtr.get,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/email-campaign/{id}',
    handler: EmailCampaignCtr.edit,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      pre: [
        // { method: EmailCampaignMid.getById, assign: 'emailCampaign'}
      ]
    }
  });

  server.route({
    method: 'PUT',
    path: '/email-campaign/{id}',
    handler: EmailCampaignCtr.update,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      pre: [
        { method: EmailCampaignMid.getById, assign: 'emailCampaign'}
      ]
    }
  });

  server.route({
    method: 'POST',
    path: '/email-campaign',
    handler: EmailCampaignCtr.save,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      },
      validate: {
        payload: {
          title: Joi.string().required().description('Title'),
          slug: Joi.string().required().description('Slug'),
          templatePath: Joi.string().required().description('template path'),
          status: Joi.number().integer().min(0).max(2)
        },
        options: {
          allowUnknown: true
        }
      }
    }
  });

  server.route({
    method: ['POST', 'PUT'],
    path: '/email-campaign/publishItems',
    handler: EmailCampaignCtr.publishItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['POST', 'PUT'],
    path: '/email-campaign/deleteItems',
    handler: EmailCampaignCtr.deleteItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['POST', 'PUT'],
    path: '/email-campaign/moveToTrashItems',
    handler: EmailCampaignCtr.moveToTrashItems,
    config: {
      auth: {
        strategy: 'jwt-admin',
        scope: ['admin']
      }
    }
  });

  server.route({
    method: ['POST', 'PUT'],
    path: '/email-campaign/unPublishItems',
    handler: EmailCampaignCtr.unPublishItems,
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
  name: 'admin-email-campaign'
};
