"use strict";

import Joi from 'joi';

const categoryVal = {
  edit: {

  },
  save: {
    payload: {
      name: Joi.string().required().description('Title'),
      slug: Joi.string().description('Slug'),
      type: Joi.string().required().description('Type'),
      status: Joi.number().required().description('Status'),
      description: Joi.any().description('Description')
    }
  },
  update: {
    payload: {
      name: Joi.string().required().description('Name'),
      description: Joi.any().description('Description'),
      slug: Joi.string().description('Slug'),
      type: Joi.string().required().description('Type'),
      status: Joi.number().required().description('Status'),
      _id: Joi.string().description('MongoID'),
      image: Joi.any().description('Image'),
      modified: Joi.any().description('Modified'),
      ordering: Joi.any().description('Ordering'),
    },
  },
  deleteItem: {
  }
};

export default {
  categoryVal
}