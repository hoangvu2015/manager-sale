'use strict';

import mongoose from 'mongoose'
const EmailCampaign = mongoose.model('EmailCampaign')

const getBySlug = (request, reply) => {
	let slug = request.params.slug || request.query.slug || request.payload.slug

	EmailCampaign
	.findOne({ slug: slug })
	.then(item => {
		return reply(item)
	})
	.catch(err => {
		request.log(['error'], err);
		return reply.continue();
	})
}

const getById = (request, reply) => {
	let id = request.params.id || request.query.id || request.payload.id

	EmailCampaign
	.findOne({ _id: id })
	.then(item => {
		return reply(item)
	})
	.catch(err => {
		request.log(['error'], err);
		return reply.continue();
	})
}

export default {
	getBySlug,
	getById
}