'use strict';

let config = {};
const Pack = require(global.BASE_PATH + '/package');
const frontend = require('./general/frontend.js');
const backend = require('./general/backend.js');

config.web = {
    name: Pack.name,
    sessionKey: '6ketaq3cgrggdfgdfgdfgdfgo315rk9',
    cookieOptions: {
        ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
        encoding: 'none', // we already used JWT to encode
        isSecure: false, // warm & fuzzy feelings
        isHttpOnly: false, // prevent client alteration
        clearInvalid: false, // remove invalid cookies
        strictHeader: true, // don't allow violations of RFC 6265
        path: '/' // set the cookie for all routes
    },
    paging: {
        defaultPageSize: 25,
        numberVisiblePages: 10,
        itemsPerPage: 20
    },
    htmlCompress: false,
    isUseVersionResource: true,
    mailer: {
        options: {
            pool: true,
            port: 465,
            host: '',
            auth: {
                user: '',
                pass: ''
            },
            logger: false, // log to console
            debug: false // include SMTP traffic in the logs
        },
        defaults: {
            from: 'info <sender@example.com>'
        }
    },
    email: {
        from: {
            "name": "info",
            "address": "info@bizzon.com.vn"
        },
        to: [{ //for admin
            "name": "admin",
            "address": "tu.tran@bizzon.com.vn"
        }],
        cc: [],
        bcc: []
    },
    log: {
        options: {
            transport: 'file',
            logFilePath: BASE_PATH + '/var/bunyan-log.log'
        }
    },
    db: {
        uri: 'mongodb://bzdevuser:bzdienkinh@13.228.4.248/db_bzcms'
    },
    redisOptions: {
        host: '127.0.0.1', //13.228.4.248
        port: 6379,
        detect_buffers: true
    },
    upload: {
        path: process.cwd() + '/public/files',
        bannerPath: process.cwd() + '/public/files/banner/',
        postPath: process.cwd() + '/public/files/post/',
        productPath: process.cwd() + '/public/files/product/'
    },
    awsService: backend.awsService,
    connections: [{
            port: process.env.CMS_WEB_PORT || 9006,
            labels: ['web'],
            routes: {
                cors: {
                    origin: ['*'],
                    credentials: true
                }
            },
            router: {
                stripTrailingSlash: false
            }
        },
        {
            port: process.env.CMS_ADMIN_PORT || 9002,
            labels: ['admin'],
            routes: {
                cors: {
                    origin: ['*'],
                    credentials: true
                },
                auth: {
                    scope: ['admin']
                }
            }
        },
        {
            port: process.env.CMS_API_PORT || 9001,
            labels: 'api',
            routes: {
                cors: {
                    origin: ['*'],
                    credentials: true
                }
            }
        }
    ],
    jwt: {
        secret: process.env.JWT_SECRET_CMS || 'jKErFlFEktfafasfaKLfghLoPrlafasflsdf0werr'
    },

    error: {
        notfound: {
            url: '/error404' //404 URL
        },
        user: {
            login: '/login' // Login URL
        }
    },

    context: backend.context,

    facebook: backend.facebook,
    twitter: backend.twitter,
    google: backend.google,

    assets: frontend.assets,
    adminassets: backend.adminassets

};

module.exports = config;