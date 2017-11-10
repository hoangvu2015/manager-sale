'use strict';

const Boom = require('boom');
const util = require('util');
const Joi = require('joi');
const _ = require('lodash');
const regexp = require(BASE_PATH + '/app/utils/regexp');
const mongoose = require('mongoose');

module.exports = {
    index
};

function index(request, reply) {
    return reply.view('admin/html/admin-files/index');
}