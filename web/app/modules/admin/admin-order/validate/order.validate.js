"use strict";

import Joi from 'joi';

const OrderVal = {
  save: {
    payload: {
      id_order: Joi.any().optional().description('id tăng tự động'),
      name: Joi.any().optional().description('Tên khách hàng'),
      link_facebook: Joi.any().optional().description('Link Facebook'),
      phone: Joi.any().optional().description('Số điện thoại'),
      address: Joi.any().optional().description('Địa chỉ'),
      total: Joi.any().optional().description('Tổng tiền'),
      ship_fee: Joi.any().optional().description('Tiền ship'),
      id_ship: Joi.any().optional().description('Mã đơn của bưu điện'),
      content: Joi.any().optional().description('Nội dung mua hàng'),
      date_order: Joi.any().optional().description('Ngày đặt hàng'),
      province: Joi.any().optional().description('Tỉnh thành'),
      status: Joi.number().required().description('Status')
    },
    options: {
      allowUnknown: true
    }
  },
  update: {
    payload: {
      _id: Joi.string().required().description('MongoID'),
      id_order: Joi.any().optional().description('id tăng tự động'),
      name: Joi.any().optional().description('Tên khách hàng'),
      link_facebook: Joi.any().optional().description('Link Facebook'),
      phone: Joi.any().optional().description('Số điện thoại'),
      address: Joi.any().optional().description('Địa chỉ'),
      total: Joi.any().optional().description('Tổng tiền'),
      ship_fee: Joi.any().optional().description('Tiền ship'),
      id_ship: Joi.any().optional().description('Mã đơn của bưu điện'),
      content: Joi.any().optional().description('Nội dung mua hàng'),
      date_order: Joi.any().optional().description('Ngày đặt hàng'),
      province: Joi.any().optional().description('Tỉnh thành'),
      status: Joi.number().required().description('Status')
    },
    options: {
      allowUnknown: true
    }
  },
};

export default {
  OrderVal
}
