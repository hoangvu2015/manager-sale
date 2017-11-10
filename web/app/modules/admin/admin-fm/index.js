'use strict';

const Controller = require('./controller/fm.controller.js');

exports.register = function(server, options, next) {
    var configManager = server.configManager;
    server.route({
        method: 'GET',
        path: '/fm/{slug*}',
        handler: Controller.index,
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
    name: 'admin-fm'
};