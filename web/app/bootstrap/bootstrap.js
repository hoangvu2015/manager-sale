'use strict'

const Pack = require(global.BASE_PATH + '/package');
import Boom from 'boom';
import util from 'util';
import Joi from 'joi';
import HapiSwagger from 'hapi-swagger';
import Path from 'path';
import Glob from 'glob';
import Nunjucks from 'nunjucks';
import { minify } from 'html-minifier';
import { apolloHapi, graphiqlHapi } from 'apollo-server';
import executableSchema from '../modules/graphql/schema';
global.COOKIE_NAME_WEB = Pack.name + '-token';
global.COOKIE_NAME_ADMIN = Pack.name + '-admin-token';

module.exports = function(server) {
    const config = server.configManager;

    server.register([{
            register: require('inert')
        },
        {
            register: require('vision')
        },
        // {
        //     register: require('hapi-logger'),
        //     options: config.get('web.log.options')
        // },
        {
            register: HapiSwagger,
            options: {
                info: {
                    'title': 'Documentation',
                    'version': Pack.version,
                }
            }
        },
        {
            register: require('../lib/redis.js')
        },
        {
            register: require('../lib/mongo.js')
        },
        {
            register: require('../lib/auth.js')
        },
        {
            register: require('../lib/static.js')
        },
        {
            register: require('../lib/hapi-kue/index.js')
        },
        {
            register: require('../lib/hapi-scheduler/index.js')
        },
        {
            register: require('hapi-io'),
            options: {
                connectionLabel: 'api'
            }
        },
        {
            register: apolloHapi,
            options: {
                path: '/graphql',
                apolloOptions: () => ({
                    pretty: true,
                    schema: executableSchema,
                }),
            },
        },
        {
            register: graphiqlHapi,
            options: {
                path: '/graphiql',
                graphiqlOptions: {
                    endpointURL: '/graphql',
                },
            },
        }
    ], (err) => {
        if (err) {
            server.log(['error', 'server'], err);
        }
        const config = server.configManager;

        server.views({
            engines: {
                html: {
                    compile: function(src, options) {
                        var template = Nunjucks.compile(src, options.environment);
                        return function(context) {
                            var content = template.render(context);
                            let htmlCompress = config.get('web.htmlCompress');
                            if (htmlCompress) {
                                var result = minify(content, {
                                    removeAttributeQuotes: true,
                                    removeComments: true,
                                    collapseWhitespace: true
                                });
                                return result;
                            }
                            return content;
                        };
                    },
                    prepare: function(options, next) {
                        options.compileOptions.environment = Nunjucks.configure(options.path, {
                            tags: {
                                blockStart: '<%',
                                blockEnd: '%>',
                                variableStart: '<$',
                                variableEnd: '$>',
                                commentStart: '<#',
                                commentEnd: '#>'
                            },
                            watch: false
                        });
                        return next();
                    }
                }
            },
            path: Path.join(BASE_PATH + "/app", 'templates'),
            context: config.get('web.context')
        });

        //autoload models
        let models = Glob.sync(BASE_PATH + "/app/modules/*/*/model/*.js", {});

        models.forEach((item) => {
            require(Path.resolve(item));
        });

        //autoload modules
        server.connections.forEach(function(connectionSetting) {

            let labels = connectionSetting.settings.labels;
            labels.forEach(name => {
                let modules = [];
                let modulesName = Glob.sync(BASE_PATH + `/app/modules/${name}/${name}-*/index.js`, {});
                modulesName.forEach((item) => {
                    modules.push(require(Path.resolve(`${item}`)));
                });

                console.log(name);
                if (modules.length) {
                    let options = { select: [name] };
                    if (name == 'api') {
                        options.routes = { prefix: '/v1/api' };
                    }
                    if (name == 'admin') {
                        options.routes = { prefix: config.get('web.context.cmsprefix') };
                    }
                    server.register(modules, options, (err) => {
                        if (err) {
                            server.log(['error', 'server'], err);
                        }
                    });
                }
            });
        });
    });
};