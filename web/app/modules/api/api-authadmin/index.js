'use strict';

import AuthController from './controller/auth.controller.js';
import AuthMid from './middleware/auth.middleware.js';
import AuthVal from './validate/auth.validate.js';

exports.register = (server, options, next) => {

    var configManager = server.configManager;
    var cmsprefix = configManager.get('web.context.cmsprefix');

    var Auth = require('./util/auth');
    server.expose('authAdmin', new Auth(server));

    server.route({
        method: 'POST',
        path: cmsprefix + '/login',
        handler: AuthController.loginAdmin,
        config: {
            validate: AuthVal.login,
            description: 'Admin Login',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: { '400': { 'description': 'Bad Request' } },
                    payloadType: 'form'
                }
            },
        }
    });

    server.route({
        method: ['GET'],
        path: cmsprefix + '/logout',
        handler: AuthController.logout,
        config: {
            auth: 'jwt-admin',
        }
    });

    return next();
};

exports.register.attributes = {
    name: 'api-authadmin'
};