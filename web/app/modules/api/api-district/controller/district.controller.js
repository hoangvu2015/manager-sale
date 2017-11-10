'use strict';

import _ from 'lodash';
import Boom from 'boom';
import moment from 'moment';
import mongoose from 'mongoose';

const District = mongoose.model('District');
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');

const get = (request, reply) => {
	District
	.find()
	.populate('province')
	.then(districts => {
		return reply({ districts });
	})
	.catch(err => {
		request.log(['error', 'districts', 'APIdistrict'], err);
		return reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
	});
}

export default {
	get
}