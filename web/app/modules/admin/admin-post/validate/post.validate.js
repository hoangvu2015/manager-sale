"use strict";

import Joi from 'joi';

const postValidate = {
  save: {
    payload: {
      title: Joi.string().required().description('Title'),
      teaser: Joi.string().description('Teaser'),
      content: Joi.string().required().description('Content'),
      status: Joi.number().required().description('Status'),
      slug: Joi.string().description('Slug'),
      category: Joi.any().description('Category'),
      feature: Joi.any().description('Feature'),
      thumb: Joi.any().description('Thumms'),
      image: Joi.any().description('Image'),
      gallery: Joi.any().description('Gallery'),
      attrs: Joi.any().description('Meta')
    }
  },
  update: {
    payload: {
      title: Joi.string().required().description('Title'),
      teaser: Joi.string().description('Teaser'),
      content: Joi.string().required().description('Content'),
      status: Joi.number().required().description('Status'),
      slug: Joi.string().description('Slug'),
      _id: Joi.string().required().description('MongoID'),
      category: Joi.any().description('Category'),
      feature: Joi.any().description('Feature'),
      thumb: Joi.any().description('Thumms'),
      image: Joi.any().description('Image'),
      gallery: Joi.any().description('Gallery'),
      attrs: Joi.any().description('Meta'),
    },
    options: {
      allowUnknown: true
    }
  },
}

export default postValidate;
