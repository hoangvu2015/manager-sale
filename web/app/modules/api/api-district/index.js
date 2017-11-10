'use strict';

import _ from 'lodash';
import Boom from 'boom';
import moment from 'moment';
import mongoose from 'mongoose';

import DistrictCtr from './controller/district.controller.js';
import DistrictMid from './middleware/district.middleware.js';

const District = mongoose.model('District');
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');

exports.register = function (server, options, next) {
    server.route({
        method: 'GET',
        path: '/districts',
        handler: DistrictCtr.get,
        config: {
            auth: {
                strategy: 'jwt-admin',
                scope: ['admin']
            },
            pre: [
                // { method: DistrictMid.getOptions, assign: 'options' }
            ]
        }
    });

    next();
};

exports.register.attributes = {
    name: 'api-district'
};
