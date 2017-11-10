'use strict';

import DashboardController from './controller/dashboard.controller.js';

exports.register = function(server, options, next) {

    var configManager = server.configManager;

    server.route({
        method: 'GET',
        path: '/',
        handler: DashboardController.indexAction,
        config: {
            auth: {
                strategy: 'jwt-admin',
                mode: 'try',
                scope: ['guest', 'admin', 'user']
            }
        }
    });

    next();
};

exports.register.attributes = {
    name: 'admin-dashboard'
};