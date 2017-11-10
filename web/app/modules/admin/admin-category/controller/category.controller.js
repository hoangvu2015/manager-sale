'use strict';

import mongoose from 'mongoose';
const Category = mongoose.model('Category');
import BaseApi from '../../../../utils/BaseApi';

const getAll = (request, reply) => {
  let categoryCtrl = new BaseApi(Category, request, reply);
  categoryCtrl.getAll();
};

const edit = (request, reply) => {
  let categoryCtrl = new BaseApi(Category, request, reply);
  categoryCtrl.getItem();
};

const save = (request, reply) => {
  let categoryCtrl = new BaseApi(Category, request, reply);
  categoryCtrl.saveItem();
};

const update = (request, reply) => {
  let categoryCtrl = new BaseApi(Category, request, reply);
  categoryCtrl.update();
};

const deleteItems = (request, reply) => {
  let categoryCtrl = new BaseApi(Category, request, reply);
  categoryCtrl.deleteItems();
};

const moveToTrashItems = (request, reply) => {
  let categoryCtrl = new BaseApi(Category, request, reply);
  categoryCtrl.moveToTrashItems();
};

const publishItems = (request, reply) => {
  let categoryCtrl = new BaseApi(Category, request, reply);
  categoryCtrl.publishItems();
};

const unPublishItems = (request, reply) => {
  let categoryCtrl = new BaseApi(Category, request, reply);
  categoryCtrl.unPublishItems();
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