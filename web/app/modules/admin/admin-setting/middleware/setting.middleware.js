'use strict';

import mongoose from 'mongoose';
const Setting = mongoose.model('Setting');
const regexp = require(BASE_PATH + '/app/utils/regexp');

/**
 * Middleware
 */
const getById = (request, reply) => {
    const id = request.params.id || request.payload.id;
    let promise = Setting.findOne({
        '_id': id
    });
    promise.then((setting) => {
        reply(setting);
    }).catch((err) => {
        request.log(['error'], err);
        return reply(err);
    })
}

export default {
    getById
}