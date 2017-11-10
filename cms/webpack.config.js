global.BASE_PATH = __dirname;

function buildConfig(env) {
    return require('./webpack/webpack.' + env + '.conf.js');
}
module.exports = buildConfig
