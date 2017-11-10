'use strict';

const mongoose = require('mongoose');
const Category = mongoose.model('Category');
const regexp = require(BASE_PATH + '/app/utils/regexp');
const _ = require('lodash');

/**
 * Middleware
 */

const getById = (request, reply) => {
    const id = request.params.id || request.payload.id;
    let promise = Category
        .findOne({ '_id': id });
    promise.then((category) => {
        reply(category);
    }).catch((err) => {
        request.log(['error'], err);
        return reply(err);
    })
}

const getOptions = (request, reply) => {
    let {
        status,
        keyword,
        type
    } = request.payload || request.query;
    let options = {
        status: {
            $ne: 2
        }
    };

    let tmpKeyword = regexp.RegExp("", 'i');
    let idKeyword = null;
    if (!keyword) {
        keyword = '';
    }
    if (keyword && keyword.length > 0) {
        tmpKeyword = regexp.RegExp(keyword, 'i');
        if (mongoose.Types.ObjectId.isValid(keyword)) {
            idKeyword = new mongoose.mongo.ObjectId(keyword);
        }
    }
    var andCondition = [];

    if (status) {
        options.status = status;
    }

    if (type) {
        options.type = type;
    }

    var orCondition = [{
        name: tmpKeyword
    }];

    if (idKeyword) {
        orCondition.push({
            _id: idKeyword
        });
    }

    andCondition.push({
        $or: orCondition
    });

    options.$and = andCondition;
    return reply(options);
}

const getRowsSelect = (request, reply) => {
    let rowsSelected = request.payload.rowsSelected;

    var filter_ids = [];
    _.map(rowsSelected, function(key, value) {
        if (key) {
            filter_ids.push(value);
        }
    });

    reply(filter_ids);
}

export default {
    getById,
    getOptions,
    getRowsSelect
}