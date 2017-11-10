'use strict';

import Controller from './controller/email-campaign.controller.js';
import Validate from './validate/email-campaign.validate.js';
import Middleware from './middleware/email-campaign.middleware.js';

const internals = {};

exports.register = (server, options, next) => {
	var config = server.configManager;
	let queue = server.plugins['hapi-kue'];
	let emailHelper = require('../api-sendmail/util/mail')(server, options);
	
	server.expose('sendMail', emailHelper.sendMail);
	
	server.route({
		method: 'GET',
		path: '/email-campaign/send',
		handler: Controller.index,
		config: {
			auth: false,
			description: 'Service status',
			tags: ['api']
		}
	});
	
	server.route({
		method: 'POST',
		path: '/email-campaign/send',
		handler: Controller.send,
		config: {
			validate: Validate.send,
			description: 'Send email campaign',
			tags: ['api'],
			plugins: {
				'hapi-swagger': {
					responses: {'400': {'description': 'Bad Request'}},
				}
			},
			pre: [
        { method: Middleware.getById, assign: 'campaign'}
			]
		}
	});
	
	// server.route({
	// 	method: 'POST',
	// 	path: '/sendmail2',
	// 	handler: SendmailController.sendmail2,
	// 	config: {
	// 		validate: SendmailVal.sendmail2,
	// 		description: 'Send email',
	// 		tags: ['api'],
	// 		plugins: {
	// 			'hapi-swagger': {
	// 				responses: {'400': {'description': 'Bad Request'}},
	// 			}
	// 		}
	// 	}
	// });
	
	
	queue.processJob('api-email-campaign', (job, done) => {
		// console.log('receive message');
		// console.log(job.data);
		let emailData = job.data;
		emailHelper.sendMail(emailData);
		done();
	});
	
	next();
};

exports.register.attributes = {
	name: 'api-email-campaign'
};