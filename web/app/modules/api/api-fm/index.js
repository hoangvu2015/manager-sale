'use strict';

const Controller = require('./controller/fm.controller.js');
const Validate = require('./validate/fm.validate.js');

exports.register = function(server, options, next) {
    var configManager = server.plugins['hapi-kea-config'];

    server.route({
        method: 'POST',
        path: '/fm/{slug?}',
        handler: Controller.index,
        config: {
            auth: false,
            description: 'Service status',
            tags: ['api']
        }
    });

    server.route({
        method: 'GET',
        path: '/fm/edit',
        handler: Controller.getFile,
        config: {
            auth: false,
            description: 'Service status',
            tags: ['api']
        }
    });

    server.route({
        method: 'POST',
        path: '/fm/edit',
        handler: Controller.update,
        config: {
            auth: false,
            description: 'Service status',
            tags: ['api']
        }
    });

    server.route({
        method: 'DELETE',
        path: '/fm/delete',
        handler: Controller.deleteFile,
        config: {
            auth: false,
            description: 'Service status',
            tags: ['api']
        }
    });
    next();
};

exports.register.attributes = {
    name: 'api-fm'
};