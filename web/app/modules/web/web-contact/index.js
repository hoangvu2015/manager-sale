'use strict';

import ContactController from './controller/contact.controller.js';

exports.register = (server, options, next) => {
    var configManager = server.plugins['hapi-kea-config'];

    server.route({
        method: 'GET',
        path: '/contact',
        handler: ContactController.contact
    });

    next();
};

exports.register.attributes = {
    name: 'web-contact'
};