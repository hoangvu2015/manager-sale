'use strict';

import PostController from './controller/post.controller.js';
import PostMid from './middleware/post.middleware.js';

exports.register = (server, options, next) => {
    var configManager = server.configManager;

    server.route({
        method: 'GET',
        path: '/posts/{category?}',
        handler: PostController.list,
        config: {
            pre: [
                { method: PostMid.getCategoryBySlug, assign: 'category' }
            ]
        }
    });

    server.route({
        method: 'GET',
        path: '/post/{slug}',
        handler: PostController.view,
        config: {
            pre: [
                { method: PostMid.getBySlug, assign: 'post' }
            ]
        }
    });

    next();
};

exports.register.attributes = {
    name: 'web-post'
};