'use strict'

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import Boom from 'boom';
import mongoose from 'mongoose'
import File from '../../../../utils/File';
import BaseApi from '../../../../utils/BaseApi'
const EmailCampaign = mongoose.model('EmailCampaign')
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');

const index = (request, reply) => {
	return reply({ success: true })
}

const send = (request, reply) => {
	let configManager = request.server.configManager;
	let settings = configManager.get('web.context.settings')
	let queue = request.server.plugins['hapi-kue'];
	let uploadPath = configManager.get('web.upload.path')

	let campaign = request.pre.campaign
	let template = request.params.template || request.query.template || request.payload.template

	if (!campaign || !template) {
		return reply(Boom.badRequest('Email campaign not found'))
	}

	File
	.getContent(path.join(uploadPath, campaign.templatePath, template))
	.then(content => {

		let emailData = {
			"from": configManager.get('web.email.from'),
			"to": request.payload.email.join(','),
			"subject": request.payload.subject,
			"html": "",
			"template": {
				"name": "blank",
				"context": {
					content: content
				}
			}
		}

		// Cách 1 gửi trực tiếp
		// let emailHelper = require('../../api-sendmail/util/mail')(request.server);
		// emailHelper.sendMail(emailData, (error, info) => {
			
		// 	if (error) {
		// 		return reply(Boom.badRequest(error));
		// 	}
			
		// 	return reply({
		// 		info,
		// 		status: true, 
		// 		message: 'Send email success'
		// 	})
		// })

		// Cách 2 đưa vào queue (queue sẽ chạy ở index.js)
		queue.createJob('api-email-campaign', emailData, (err) => {

			if (err) {
				request.log(['error'], 'Error: publish email campaign to queue');
				return reply(err)
			}

			request.log(['error'], 'Publish email campaign to queue');
			return reply({
				status: true, 
				message: 'Send email campaign success'
			})
		})
	})
	.catch(err => {
		request.log(['error', 'emailcampaign-send'], err)
		return reply(Boom.badRequest('Get template content fail'))
	})

	// return reply({ 
	// 	success: true,
	// 	query: request.query,
	// 	params: request.params,
	// 	payload: request.payload,
	// 	campaign: request.pre.campaign
	// })
}

export default {
	index, 
	send
}