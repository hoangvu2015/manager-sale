"use strict";

var Joi = require('joi');

const userVal = {
    edit: {

    },
    save: {
        payload: {
            name: Joi.string().required().description('Name'),
            email: Joi.string().email().required().description('Email'),
            password: Joi.string().description('Password'),
            cfpassword: Joi.string(),
            status: Joi.number().integer().min(0).max(1),
            roles: Joi.any().description('Roles'),
            phone: Joi.any().description('Phone'),
            province: Joi.any().description('province'),
            districts: Joi.any().description('districts'),
            address: Joi.any().description('Address'),
        },
        options: {
            allowUnknown: true
        }
    },
    update: {
        payload: {
            _id: Joi.string().description('MongoID'),
            name: Joi.string().required().description('Name'),
            email: Joi.string().email().required().description('Email'),
            password: Joi.any().description('Password'),
            cfpassword: Joi.any(),
            status: Joi.number().integer().min(0).max(1),
            roles: Joi.any().description('Roles'),
            phone: Joi.any().description('Phone'),
            province: Joi.any().description('province'),
            districts: Joi.any().description('districts'),
            address: Joi.any().description('Address'),
        },
        options: {
            allowUnknown: true
        }
    },
    deleteItem: {

    }
};
export default {
    userVal
}