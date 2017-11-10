'use strict';

import Boom from 'boom';
import util from 'util';
import Joi from 'joi';
import mongoose from 'mongoose';
import JWT from 'jsonwebtoken';
import aguid from 'aguid';
import crypto from 'crypto';
import UserEmail from '../util/user-email';

const User = mongoose.model('User');
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');

const login = (request, reply) => {
    let configManager = request.server.configManager;
    let cookieOptions = configManager.get('web.cookieOptions');

    let { email, password, scope } = request.payload;
    let promise = User.findOne({ email: email }).exec();

    promise
        .then(user => {

            if (!user || (user && user.status != 1)) {
                return reply(Boom.unauthorized("Incorrect email or password"));
            }
            /*check scope if exist*/
            if (scope && !user.roles.includes(scope)) {
                return reply(Boom.unauthorized("Permission denied"));
            }

            return request.server.plugins['api-user'].auth
                .login(email, password, user)
                .then(jwtToken => {
                    return reply({ token: jwtToken, _id: user._id }).header("Authorization", jwtToken).state(COOKIE_NAME_ADMIN, jwtToken, cookieOptions);
                })
                .catch(err => {
                    request.log(['error', 'login'], err);
                    return reply(Boom.unauthorized("Incorrect email or password"));
                });

        }).catch(err => {
            return reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        });
}

const loginAdmin = (request, reply) => {
    let configManager = request.server.configManager;
    let cookieOptions = configManager.get('web.cookieOptions');

    let { email, password, scope } = request.payload;
    let promise = User.findOne({ email: email }).exec();

    promise
        .then(user => {

            if (!user || (user && user.status != 1)) {
                return reply(Boom.unauthorized("Incorrect email or password"));
            }
            /*check scope if exist*/
            if (!user.roles.includes('admin')) {
                return reply(Boom.unauthorized("Permission denied"));
            }

            return request.server.plugins['api-user'].auth
                .login(email, password, user)
                .then(jwtToken => {
                    return reply({ token: jwtToken, _id: user._id }).header("Authorization", jwtToken).state(COOKIE_NAME_ADMIN, jwtToken, cookieOptions);
                })
                .catch(err => {
                    request.log(['error', 'login'], err);
                    return reply(Boom.unauthorized("Incorrect email or password"));
                });

        }).catch(err => {
            return reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        });
}

const logout = (request, reply) => {
    var configManager = request.server.configManager;
    const sessionId = request.auth.credentials.id;
    let auth = request.server.plugins['api-user'].auth;
    auth
        .logout(sessionId)
        .then((session) => {
            let cookieOptions = request.server.configManager.get('web.cookieOptions');
            reply({ status: true }).header("Authorization", '')
                .unstate(COOKIE_NAME_ADMIN, cookieOptions);
        })
        .catch(err => {
            console.log(err);
            return reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        })
}

export default {
    login,
    logout,
    loginAdmin
}