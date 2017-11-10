const Glob = require('glob');
const PATHS = require('./path');

const configManager = require('kea-config');
configManager.setup('./app/config');
const vendor = configManager.get('web.assets.required');

var mainResource = Glob.sync(PATHS.skin + "/core/+(scripts|css)/+(main.js|styles.scss)");
mainResource = mainResource.concat(Glob.sync(PATHS.skin + "/modules/+(scripts|css)/+(*.js|*.scss)"));
var commonResource = Glob.sync(PATHS.skin + "/**/vue/*.js");

let Entries = {
    vendor: vendor,
    main: mainResource,
    common: commonResource
};

module.exports = Entries;