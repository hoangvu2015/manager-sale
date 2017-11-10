'use strict';

/*Nơi config riêng trên server*/
/*Tạo file production.conf.js trên server cùng cấp và copy nội dung file này bỏ vào và customs nếu cần */

let config = {};

config.web = {
    htmlCompress: true,
    db: {
        uri: 'mongodb://127.0.0.1/db_bzcms',
        options: {
            user: '',
            pass: ''
        }
    },
    redisOptions: {
        host: '127.0.0.1',
        port: 6379,
        detect_buffers: true
    },
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
    context: {
        cmsprefix: '/admin',
        app: {
            title: 'BZ CMS',
            description: 'This is description bz cms',
            keywords: ''
        },
        settings: {
            services: {
                webUrl: 'http://localhost:9006',
                adminUrl: 'http://localhost:9002',
                apiUrl: 'http://localhost:9001/v1/api'
            }
        }
    },
};

module.exports = config;