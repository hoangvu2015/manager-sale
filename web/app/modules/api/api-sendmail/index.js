'use strict';

import SendmailController from './controller/sendmail.controller.js';
import SendmailVal from './validate/sendmail.validate.js';

const internals = {};

exports.register = (server, options, next) => {
	var config = server.configManager;
	let queue = server.plugins['hapi-kue'];
	let emailHelper = require('./util/mail')(server, options);
	
	server.expose('sendMail', emailHelper.sendMail);
	
	server.route({
		method: 'GET',
		path: '/sendmail',
		handler: SendmailController.index,
		config: {
			auth: false,
			description: 'Service status',
			tags: ['api']
		}
	});
	
	server.route({
		method: 'POST',
		path: '/sendmail',
		handler: SendmailController.sendmail,
		config: {
			validate: SendmailVal.sendmail,
			description: 'Send email',
			tags: ['api'],
			plugins: {
				'hapi-swagger': {
					responses: {'400': {'description': 'Bad Request'}},
				}
			}
		}
	});
	
	server.route({
		method: 'POST',
		path: '/sendmail2',
		handler: SendmailController.sendmail2,
		config: {
			validate: SendmailVal.sendmail2,
			description: 'Send email',
			tags: ['api'],
			plugins: {
				'hapi-swagger': {
					responses: {'400': {'description': 'Bad Request'}},
				}
			}
		}
	});
	
	
	queue.processJob('api-sendmail', (job, done) => {
		// console.log('receive message');
		// console.log(job.data);
		let emailData = job.data;
		emailHelper.sendMail(emailData);
		done();
	});
	
	next();
};

exports.register.attributes = {
	name: 'api-sendmail'
};