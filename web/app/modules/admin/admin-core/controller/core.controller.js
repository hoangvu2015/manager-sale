'use strict';

import _ from 'lodash';
import JWT from 'jsonwebtoken';
import aguid from 'aguid';

const getCredentials = (request, reply) => {
    // Get the response object
    let response = request.response;
    // Check to see if the response is a view
    if (response.variety === 'view') {
        if (_.isEmpty(response.source.context)) {
            response.source.context = {};
        }
        if (_.isEmpty(response.source.context.credentials)) {
            response.source.context.credentials = {};
        }
        response.source.context.credentials = request.auth.credentials;
    }
    reply.continue();

}

const createGuestToken = (request, reply) => {
    let response = request.response;
    // Check to see if the response is a view
    if (response.variety === 'view') {
        var configManager = request.server.configManager;
        let cookieOptions = configManager.get('web.cookieOptions');

        let credentials = request.auth.credentials;
        let authToken = request.auth.token;
        if (!authToken) {
            var session = {
                valid: true,
                id: aguid(), //a random session id,
                uid: '', //user id
                name: 'guest',
                scope: ['guest'],
                exp: new Date().getTime() + 30 * 60 * 1000
            };
            const redisClient = request.server.redis;
            const secret = configManager.get('web.jwt.secret');
            redisClient.set(session.id, JSON.stringify(session));
            var token = JWT.sign(session, secret);
            reply().state(COOKIE_NAME_ADMIN, token, cookieOptions);
        }
    }

    reply.continue();

}

const getMeta = (request, reply) => {
    let response = request.response;
    if (response.variety === 'view') {
        let config = request.server.configManager;
        let app = config.get('web.context.app');
        if (response.source.context.meta && response.source.context.meta.title) {

            if (response.source.context.meta.title) {
                response.source.context.meta.title = response.source.context.meta.title + ' | ' + app.title
            }
        } else {
            response.source.context.meta = app
        }
    }
    reply.continue();
}

const handleError = (request, reply) => {
    const response = request.response;
    if (!response.isBoom) {
        return reply.continue();
    }
    let config = request.server.configManager;
    let loginUrl = config.get('web.error.user.login');
    let notFoundUrl = config.get('web.error.notfound.url');

    const error = response;
    const statusCode = error.output.statusCode;

    if (statusCode === 404) {
        request.log(['error', 'notfound'], 'Resources is not be found');
        return reply.redirect(notFoundUrl);
    } else if (statusCode === 403 || statusCode === 401) {
        request.log(['error', 'permission'], 'You have not permission to access this page');
        return reply.redirect(loginUrl);
    } else {
        return reply.continue();
    }
};

export default {
    getCredentials,
    createGuestToken,
    getMeta,
    handleError
}