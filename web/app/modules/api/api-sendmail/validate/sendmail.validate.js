"use strict";

var Joi = require('joi');

const sendmailVal = {
	edit: {},
	save: {
		payload: {}
	},
	sendmail: {
		payload: {
			from: {name: Joi.string().required(), address: Joi.string().email().required()},
			to: Joi.array().items({name: Joi.string(), address: Joi.string().email().required()}),
			cc: Joi.array().items({name: Joi.string(), address: Joi.string().email()}),
			subject: Joi.string().required(),
			html: Joi.any().optional(),
			template: {name: Joi.any().optional(), context: Joi.any().optional()},
			text: Joi.any().optional()
		}
	},
	sendmail2: {
		payload: {
			subject: Joi.string().required(),
			email: Joi.any().optional(),
			email2: Joi.any().optional(),
			content: Joi.any().optional()
		}
	},
	update: {
		payload: {},
		options: {
			allowUnknown: true
		}
	},
	deleteItem: {}
};
module.exports = sendmailVal;