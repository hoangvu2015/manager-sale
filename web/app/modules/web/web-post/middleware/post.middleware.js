'use strict';

const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Category = mongoose.model('Category');
const regexp = require(BASE_PATH + '/app/utils/regexp');

/**
 * Middleware
 */

const getBySlug = (request, reply) => {
    const slug = request.params.slug || request.payload.slug;
    let promise = Post.findOne({ 'slug': slug, 'status': 1 }).exec();
    promise.then((post) => {
        reply(post);
    }).catch((err) => {
        request.log(['error'], err);
        return reply(err);
    })
}

const getCategoryBySlug = (request, reply) => {
    if (request.params && request.params.category) {
        const slug = request.params.category
        let promise = Category.findOne({ 'slug': slug, 'status': 1 });
        promise.then((category) => {
            reply(category);
        }).catch((err) => {
            request.log(['error'], err);
            return reply.continue();
        })
    } else {
        return reply.continue();
    }
}

const getPrelink = (request) => {
    if (request.pre.category) {
        return '/' + request.pre.category.slug;
    }
    return '';
}

export default {
    getBySlug,
    getCategoryBySlug,
    getPrelink
}