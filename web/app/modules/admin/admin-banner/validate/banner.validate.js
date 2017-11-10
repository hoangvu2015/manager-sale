"use strict";

import Joi from 'joi';

const bannerValidate = {
  save: {
    payload: {
      title: Joi.string().required().description('Title'),
      subtitle: Joi.any().description('subtitle'),
      link: Joi.any().description('link'),
      image: Joi.any().description('Image'),
      description: Joi.any().description('Description'),
      category: Joi.any().description('Category'),
      status: Joi.any().description('Status'),
      position: Joi.any().description('Position'),
    }
  },
  update: {
    payload: {
      title: Joi.string().required().description('Title'),
      subtitle: Joi.any().description('subtitle'),
      link: Joi.any().description('link'),
      image: Joi.any().description('Image'),
      description: Joi.any().description('Description'),
      category: Joi.any().description('Category'),
      status: Joi.any().description('Status'),
      position: Joi.any().description('Position'),
      _id: Joi.string().description('MongoID')
    },
    options: {
      allowUnknown: true
    }
  }
}

export default bannerValidate;