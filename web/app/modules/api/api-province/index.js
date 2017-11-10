'use strict';

import _ from 'lodash';
import Boom from 'boom';
import moment from 'moment';
import mongoose from 'mongoose';

import ProvinceCtr from './controller/province.controller.js'
import ProvinceMid from './middleware/province.middleware.js'

const Province = mongoose.model('Province');
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');

exports.register = function (server, options, next) {
	server.route({
        method: 'GET',
        path: '/provinces',
        handler: ProvinceCtr.get,
        config: {
            auth: {
                strategy: 'jwt-admin',
                scope: ['admin']
            },
            pre: [
                // { method: ProvinceMid.getOptions, assign: 'options' }
            ]
        }
    });

    next();
};

exports.register.attributes = {
    name: 'api-province'
};
