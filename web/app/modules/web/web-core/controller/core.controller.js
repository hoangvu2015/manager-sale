'use strict';

import _ from 'lodash';
import mongoose from 'mongoose';
import JWT from 'jsonwebtoken';
import aguid from 'aguid';

const Category = mongoose.model('Category');
const Setting = mongoose.model('Setting');

const env = (request, reply) => {
    if (request.response.variety === 'view') {
        request.response.source.context = request.response.source.context || {};
        request.response.source.context.isDevelopment = (process.env.NODE_ENV === 'development');
    }

    reply.continue();
}

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

const getSettings = async(request, reply) => {
    // Get the response object
    let response = request.response;
    // Check to see if the response is a view
    if (response.variety === 'view') {
        let setting = await request.server.plugins['api-setting'].getSetting();
        response.source.context.cmsSettings = setting;
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
            let auth = request.server.plugins['api-user'].auth;
            let session = auth.createSession({});
            auth.initGuest({})
                .then(token => {
                    reply().state(COOKIE_NAME_WEB, token, cookieOptions);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    reply.continue();
}

const getPostCategories = async(request, reply) => {
    let response = request.response;
    let postCategories = await Category.find({ status: 1, type: 'post' });
    if (response.variety === 'view') {
        response.source.context.postCategories = postCategories;
    }
    reply.continue();
}


const getMeta = (request, reply) => {
    let response = request.response;
    if (response.variety === 'view') {
        let config = request.server.configManager;
        let app = {};
        let webUrl = config.get('web.context.settings.services.webUrl');

        let setting = response.source.context.cmsSettings;
        let siteName = setting.siteName;
        let siteDescription = setting.siteDescription;
        let shareImage = setting.shareImage;

        if (siteName) {
            app.title = siteName;
        }
        if (siteDescription) {
            app.description = siteDescription;
        }
        if (shareImage) {
            app.shareImage = webUrl + '/files/settings/' + shareImage;
        }

        if (response.source.context.meta) {
            if (response.source.context.meta.title) {
                response.source.context.meta.title = response.source.context.meta.title + ' | ' + app.title
            } else {
                response.source.context.meta.title = app.title;
            }

            if (response.source.context.meta.description) {
                response.source.context.meta.description = response.source.context.meta.description
            } else {
                response.source.context.meta.description = app.description
            }

            if (response.source.context.meta.shareImage) {
                response.source.context.meta.shareImage = response.source.context.meta.shareImage
            } else {
                response.source.context.meta.shareImage = app.shareImage
            }
        } else {
            response.source.context.meta = app;
        }
    }
    reply.continue();
}

const handleError = (request, reply) => {
    //   console.log('request.query', request.query);
    //   console.log('request.params', request.params);
    //   console.log('request.payload', request.payload);
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
    } else if (statusCode === 403) {
        request.log(['error', 'permission'], 'You have not permission to access this page');
        return reply.redirect(loginUrl);
    } else if (statusCode === 401) {
        request.log(['error', 'Unauthorized'], 'Invalid credentials');
        /*set lại token*/
        let cookieOptions = config.get('web.cookieOptions');
        let auth = request.server.plugins['api-user'].auth;
        let session = auth.createSession({});
        auth.initGuest({})
            .then(token => {
                return reply().state(COOKIE_NAME_WEB, token, cookieOptions).redirect(loginUrl);
            })
            .catch(err => {
                console.log(err);
                return reply.continue();
            })

    } else {
        return reply().continue();
    }
};

export {
    env,
    getCredentials,
    getSettings,
    createGuestToken,
    getPostCategories,
    getMeta,
    handleError
};