'use strict'
const mongoose = require('mongoose');

exports.register = function(server, options, next) {
    const config = server.plugins['hapi-kea-config'];
    mongoose.connect(config.get('web.db.uri'), { useMongoClient: true });
    mongoose.Promise = require('bluebird');
    require('mongoose-pagination');
    
    console.log('Register Mongo: ', config.get('web.db.uri'));
    next();

}
exports.register.attributes = {
    name: 'app-mongo'
};