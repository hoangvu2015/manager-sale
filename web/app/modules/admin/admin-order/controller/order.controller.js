'use strict';

import mongoose from 'mongoose';
import BaseApi from '../../../../utils/BaseApi';
const Order = mongoose.model('Order');

const getAll = (request, reply) => {
  let orderCtrl = new BaseApi(Order, request, reply, 'categories');
  orderCtrl.getAll();
};

const edit = (request, reply) => {
  let orderCtrl = new BaseApi(Order, request, reply);
  orderCtrl.getItem();
};

const save = (request, reply) => {
  let orderCtrl = new BaseApi(Order, request, reply);
  orderCtrl.saveItem();
};

const update = (request, reply) => {
  let orderCtrl = new BaseApi(Order, request, reply);
  orderCtrl.update();
};

const deleteItems = (request, reply) => {
  let orderCtrl = new BaseApi(Order, request, reply);
  orderCtrl.deleteItems();
};

const moveToTrashItems = (request, reply) => {
  let orderCtrl = new BaseApi(Order, request, reply);
  orderCtrl.moveToTrashItems();
};

const publishItems = (request, reply) => {
  let orderCtrl = new BaseApi(Order, request, reply);
  orderCtrl.publishItems();
};

const unPublishItems = (request, reply) => {
  let orderCtrl = new BaseApi(Order, request, reply);
  orderCtrl.unPublishItems();
};

export default {
  getAll,
  edit,
  save,
  update,
  deleteItems,
  moveToTrashItems,
  unPublishItems,
  publishItems
}
