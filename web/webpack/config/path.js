let htmlModulePath = '/app/templates/web';
const ROOT_PATH = process.cwd();
const PATHS = {
    htmlModulePath: htmlModulePath,
    dist: ROOT_PATH + '/public/assets/dist',
    build: ROOT_PATH + '/public/assets/build',
    module: ROOT_PATH + htmlModulePath,
    skin: ROOT_PATH + htmlModulePath + '/skin'
};

module.exports = PATHS;