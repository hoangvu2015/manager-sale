'use strict';

import fs from 'fs';
import path from 'path';
import Joi from 'joi';
import util from 'util';

import AuthController from './controller/auth.controller.js';

exports.register = function(server, options, next) {
    var configManager = server.configManager;

    server.route({
        method: ['GET'],
        path: '/signin',
        handler: AuthController.viewLogin,
        config: {
            auth: false
        }
    });

    next();
};

exports.register.attributes = {
    name: 'admin-auth'
};