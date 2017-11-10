'use strict';

import ContactController from './controller/contact.controller.js';
import ContactVal from './validate/contact.validate.js';

exports.register = (server, options, next) => {

    // WEB
    server.route({
        method: 'POST',
        path: '/web/contact',
        handler: ContactController.contact,
        config: {
            auth: false,
            validate: ContactVal.contact,
            description: 'Handle Contact Form Submitted',
            tags: ['api'],
            plugins: {
                'hapi-swagger': {
                    responses: {'400': {'description': 'Bad Request'}},
                    payloadType: 'form'
                }
            },
        }
    });

    next();
};

exports.register.attributes = {
    name: 'api-contact'
};