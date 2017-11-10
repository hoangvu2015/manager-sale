'use strict';

const Boom = require('boom');
const Joi = require('joi');
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
const JWT = require('jsonwebtoken');
const aguid = require('aguid');

const index = (request, reply) => {
    return reply({status: true, msg: 'It works'});
};

const contact = (request, reply) => {
    let contact = new Contact(request.payload);
    let promise = contact.save();

    promise
        .then(user => {
            let config = request.server.configManager;

            let emailData = {
                "from": config.get('web.email.from'),
                "to": config.get('web.email.to'),
                "subject": "Contact Form",
                "html": "Contact Form",
                "template": {
                    "name": "contact",
                    "context": request.payload
                },
                "text": ""
            };

            let queue = request.server.plugins['hapi-kue'];

            queue.createJob('api-sendmail', emailData, (err) => {
                if (err) {
                    request.log(['error'], 'Error: publish message to queue');
                } else {
                    request.log(['error'], 'publish message to queue');
                }
            });

            reply({status: true, msg: 'Handle Contact Form Submitted'});

        })
        .catch((err) => {
            reply(Boom.badRequest(err.message));
        });
};

export default {
    index,
    contact
}