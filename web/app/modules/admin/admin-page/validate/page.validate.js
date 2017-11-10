"use strict";

import Joi from 'joi'
const pageVal = {
  edit: {},
  save: {
    payload: {
      title: Joi.string().required().description('Title'),
      slug: Joi.string().description('Slug'),
      content: Joi.string().required().description('Content'),
      identity: Joi.string().required().description('Identity'),
      status: Joi.number().required().description('Status')
    }
  },
  update: {
    payload: {
      title: Joi.string().required().description('Title'),
      slug: Joi.string().description('Slug'),
      content: Joi.string().required().description('Content'),
      identity: Joi.string().required().description('Identity'),
      slug: Joi.string().required().description('Slug'),
      _id: Joi.string().required().description('MongoID')
    }
  },
  deleteItem: {}
};

export default {
  pageVal
}