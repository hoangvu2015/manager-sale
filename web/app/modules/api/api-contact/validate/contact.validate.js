"use strict";

var Joi = require('joi');

const contactVal = {
    edit: {},
    save: {
        payload: {}
    },
    contact: {
        payload: {
            name: Joi.string().required().description('Name'),
            phone: Joi.string().optional().description('Phone'),
            email: Joi.string().email().required().description('Email'),
            message: Joi.string().required().description('Message')
        }
    },
    update: {
        payload: {},
        options: {
            allowUnknown: true
        }
    },
    deleteItem: {}
};
export default contactVal;