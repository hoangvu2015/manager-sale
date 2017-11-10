'use strict';

import {
    createGuestToken,
    getCredentials,
    getSettings,
    getPostCategories,
    getMeta,
    handleError,
    env
} from './controller/core.controller.js';

exports.register = (server, options, next) => {

    server.ext('onPostHandler', createGuestToken);
    server.ext('onPostHandler', getCredentials);
    server.ext('onPostHandler', getSettings);
    server.ext('onPostHandler', getPostCategories);
    server.ext('onPostHandler', getMeta);
    // server.ext('onPreResponse', handleError);
    server.ext('onPreResponse', env);

    next();
};

exports.register.attributes = {
    name: 'core'
};