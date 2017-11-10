'use strict';

const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const regexp = require(BASE_PATH + '/app/utils/regexp');
const _ = require('lodash');

/**
 * Middleware
 */
const getById = (request, reply) => {
    const id = request.params.id || request.payload.id;
    let promise = Post.findOne({ '_id': id });
    promise
        .then((post) => {
            reply(post);
        })
        .catch((err) => {
            request.log(['error'], err);
            return reply.continue();
        })
}

const getRowsSelect = (request, reply) => {
    let rowsSelected = request.payload.rowsSelected;

    var filter_ids = [];
    _.map(rowsSelected, (key, value) => {
        if (key) {
            filter_ids.push(value);
        }
    });

    reply(filter_ids);
}

const getOptions = (request, reply) => {
    let {
        status,
        category,
        feature,
        keyword,
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

    if (feature) {
        options.feature = feature;
    }

    if (category && mongoose.Types.ObjectId.isValid(category)) {
        options.category = new mongoose.mongo.ObjectId(category);
    }
    var orCondition = [{
        title: tmpKeyword
    }, {
        product_code: keyword
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

export default {
    getById,
    getRowsSelect,
    getOptions,
}