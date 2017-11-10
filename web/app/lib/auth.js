'use strict'

const AuthJwt2 = require('hapi-auth-jwt2');

const Pack = require(global.BASE_PATH + '/package');
const User = require(BASE_PATH + '/app/modules/api/api-user/model/user.model');

exports.register = function(server, options, next) {

    var config = server.configManager;

    function validate(decoded, request, callback) {
        const redisClient = server.redis;
        redisClient.get(decoded.id, function(rediserror, result) {
            if (rediserror) {
                server.log(['error', 'redis', 'validateauth'], rediserror);
            }
            let session;
            if (result) {
                session = JSON.parse(result);
                // console.log(session);
            } else {
                return callback(rediserror, false);
            }
            if (session.valid === true) {
                return callback(rediserror, true);
            } else {
                return callback(rediserror, false);
            }
        });
    }

    function registerJwtAuth2(err) {
        if (err) {
            console.log(err);
        }
        server.auth.strategy('jwt', 'jwt', 'optional', {
            key: config.get('web.jwt.secret'),
            validateFunc: validate,
            verifyOptions: { ignoreExpiration: true, algorithms: ['HS256'] },
            cookieKey: COOKIE_NAME_WEB,
            urlKey: COOKIE_NAME_WEB,
            headerKey: COOKIE_NAME_WEB
        });

        server.auth.strategy('jwt-admin', 'jwt', {
            key: config.get('web.jwt.secret'),
            validateFunc: validate,
            verifyOptions: { ignoreExpiration: true, algorithms: ['HS256'] },
            cookieKey: COOKIE_NAME_ADMIN,
            urlKey: COOKIE_NAME_ADMIN,
            headerKey: COOKIE_NAME_ADMIN
        });

        return next();
    };
    server.register(AuthJwt2, registerJwtAuth2);
};

exports.register.attributes = {
    name: 'app-auth-jwt2',
    dependencies: ['app-redis']
};