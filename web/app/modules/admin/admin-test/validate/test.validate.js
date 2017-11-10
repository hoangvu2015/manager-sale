"use strict";

import Joi from 'joi';

const TestVal = {
  save: {
    payload: {
      title: Joi.any().optional().description('Tiêu đề'),
      slug: Joi.any().optional().description('Slug'),
      num: Joi.any().optional().description('Số'),
      description: Joi.any().optional().description('Mô tả'),
      thumb: Joi.any().optional().description('Hình Thumb'),
      gallery: Joi.any().optional().description('Thư viện ảnh'),
      date: Joi.any().optional().description('Ngày'),
      date_range: Joi.any().optional().description('Khoảng thời gian'),
      category: Joi.any().optional().description('Danh mục'),
      option: Joi.any().optional().description('Loại'),
      status: Joi.number().required().description('Status')
    },
    options: {
      allowUnknown: true
    }
  },
  update: {
    payload: {
      _id: Joi.string().required().description('MongoID'),
      title: Joi.any().optional().description('Tiêu đề'),
      slug: Joi.any().optional().description('Slug'),
      num: Joi.any().optional().description('Số'),
      description: Joi.any().optional().description('Mô tả'),
      thumb: Joi.any().optional().description('Hình Thumb'),
      gallery: Joi.any().optional().description('Thư viện ảnh'),
      date: Joi.any().optional().description('Ngày'),
      date_range: Joi.any().optional().description('Khoảng thời gian'),
      category: Joi.any().optional().description('Danh mục'),
      option: Joi.any().optional().description('Loại'),
      status: Joi.number().required().description('Status')
    },
    options: {
      allowUnknown: true
    }
  },
};

export default {
  TestVal
}
