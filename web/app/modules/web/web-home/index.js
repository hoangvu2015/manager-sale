'use strict';

import {
    home
}
from './controller/home.controller.js';

exports.register = (server, options, next) => {
    var configManager = server.plugins['hapi-kea-config'];

    server.route({
        method: 'GET',
        path: '/',
        handler: home
    });
    next();
};

exports.register.attributes = {
    name: 'web-home'
};