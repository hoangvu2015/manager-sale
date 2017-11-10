'use strict';

const Boom = require('boom');
const Joi = require('joi');


const index = (request, reply) => {
	return reply({status: true, msg: 'It works'});
	
};

const sendmail = (request, reply) => {
	let emailData = request.payload;
	let emailHelper = require('../util/mail')(request.server);
	emailHelper.sendMail(emailData, (error, info) => {
		if (error) {
			reply(Boom.badRequest(error));
		}
		reply({status: true, msg: 'Send email success'});
	});
};

const sendmail2 = (request, reply) => {
	let config = request.server.configManager;
	let {content, subject, email, email2} = request.payload;
	let receive = email ? email : email2;
	let emailData = {
		"from": config.get('web.email.from'),
		"to": receive.join(','),
		"subject": subject,
		"html": "dsdad",
		"template": {
			"name": "blank",
			"context": {
				content: content
			}
		}
	};
	
	let queue = request.server.plugins['hapi-kue'];
	
	queue.createJob('api-sendmail', emailData, (err) => {
		if (err) {
			request.log(['error'], 'Error: publish message to queue');
		} else {
			request.log(['error'], 'publish message to queue');
		}
	});
	
	reply({status: true, message: 'Handle Contact Form Submitted'});
};


export default {
	index,
	sendmail,
	sendmail2
}