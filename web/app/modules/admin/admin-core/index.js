'use strict';


import CoreController from './controller/core.controller.js';

exports.register = function(server, options, next) {
    server.route({
        method: 'GET',
        path: '/error404',
        config: {
            auth: {
                strategy: 'jwt-admin',
                scope: ['admin']
            },
            handler: function(request, reply) {
                reply.view('admin/html/admin-core/404', { meta: { title: 'Page Not Found' } });
            }
        }
    });
    server.ext('onPostHandler', CoreController.createGuestToken);
    server.ext('onPostHandler', CoreController.getCredentials);
    server.ext('onPreResponse', CoreController.handleError);
    next();
};
exports.register.attributes = {
    name: 'admin-core'
};