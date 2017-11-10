"use strict";

import Joi from 'joi';

const settingVal = {
  save: {
    payload: {
      key: Joi.string().required().description('Key'),
      value: Joi.any().description('Value'),
      value_type: Joi.any().description('Value Type'),
      description: Joi.any().description('Description'),
      status: Joi.any().description('Status'),
    }
  },
  update: {
    payload: {
      key: Joi.string().required().description('Key'),
      value: Joi.any().description('Value'),
      value_type: Joi.any().description('Value Type'),
      description: Joi.any().description('Description'),
      status: Joi.any().description('Status'),
      _id: Joi.string().description('MongoID')
    }
  }
};

export default {
  settingVal
}