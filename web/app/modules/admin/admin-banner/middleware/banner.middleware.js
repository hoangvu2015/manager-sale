'use strict';

import mongoose from 'mongoose';
const Banner = mongoose.model('Banner');
const regexp = require(BASE_PATH + '/app/utils/regexp');

/**
 * Middleware
 */

const getById = (request, reply) => {
    const id = request.params.id || request.payload.id;
    let promise = Banner.findOne({ '_id': id });
    promise.then((banner) => {
        reply(banner);
    }).catch((err) => {
        request.log(['error'], err);
        return reply(err);
    })
}

export default {
    getById
}