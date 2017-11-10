const mongoose = require('mongoose');
const Setting = mongoose.model('Setting');
const async = require('async');

function getSetting(key) {

    return new Promise(function(resolve, reject) {
        var options = {};
        if (key) {
            options = {
                'key': key
            };
        }

        let promise = Setting
            .find(options)
            .select('key value')
            .lean();
        let result = [];
        promise
            .then(items => {

                if (key) {
                    resolve(items[0].value);
                } else {
                    async.each(items, function(item, callback) {
                        switch (item.value_type) {
                            case "boolean":
                                result[item.key] = item.value == "true" ? true : false;
                                break;
                            case "json":
                                result[item.key] = JSON.parse(item.value);
                                break;
                            default:
                                result[item.key] = item.value;
                        }
                        callback();
                    }, function(err) {
                        if (err) {
                            console.log('A file failed to process');
                        } else {
                            resolve(result);
                        }
                    });
                }

            })
            .catch(e => {
                resolve(null);
            });
    });
}

exports.getSetting = function(key) {
    return getSetting(key);
}