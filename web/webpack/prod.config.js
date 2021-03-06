const Webpack = require('webpack')
const WebpackMerge = require('webpack-merge')
const BaseConfig = require('./base.config.js')
const ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');

module.exports = function(env) {
    return WebpackMerge(BaseConfig(env.env), {
        plugins: [
            // new BabiliPlugin(),
            new Webpack.DefinePlugin({
                global: {},
                process: {
                    env: {
                        NODE_ENV: JSON.stringify('production')
                    }
                }
            }),
            new Webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false
            }),
            new ngAnnotatePlugin({
                add: true
            }),
            new UglifyJSPlugin({
                beautify: false,
                mangle: false,
                compress: {
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    warnings: false,
                    drop_console: false
                },
                comments: false
            })
        ]
    })
}