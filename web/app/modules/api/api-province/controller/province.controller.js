'use strict';

import _ from 'lodash';
import Boom from 'boom';
import moment from 'moment';
import mongoose from 'mongoose';

const Province = mongoose.model('Province');
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');

const get = (request, reply) => {
	Province
	.find()
	.populate('districts')
	.lean()
	.then(provinces => {
		return reply({ items: provinces });
	})
	.catch(err => {
		request.log(['error', 'provinces', 'APIprovince'], err);
		return reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
	});
}

export default {
	get
}