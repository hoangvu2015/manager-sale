const PATHS = require('./config/path');
const rules = require('./config/rules');
const plugins = require('./config/plugins');
const entries = require('./config/entries');
const ExtLibs = require('./config/variables.js');
const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = function(env) {
    return {
        target: ExtLibs.target,
        entry: entries,
        resolve: {
            extensions: ['.json', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.vue'],
            alias: {
                '@': resolve(PATHS.htmlModulePath),
                '@Core': resolve(PATHS.htmlModulePath) + '/skin/core/scripts',
                vue$: 'vue/dist/vue.esm.js'
            }
        },
        output: {
            path: env == "dev" ? PATHS.dist : PATHS.build,
            publicPath: '',
            filename: 'scripts/[name].js',
            chunkFilename: '[name].js',
            sourceMapFilename: '[name].map'
        },
        plugins: plugins,
        module: {
            rules: rules
        },
        externals: ExtLibs.externals
    };
};