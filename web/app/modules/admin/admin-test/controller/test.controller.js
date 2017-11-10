'use strict';

import mongoose from 'mongoose';
import BaseApi from '../../../../utils/BaseApi';
const Test = mongoose.model('Test');

const getAll = (request, reply) => {
  let testCtrl = new BaseApi(Test, request, reply, 'categories');
  testCtrl.getAll();
};

const edit = (request, reply) => {
  let testCtrl = new BaseApi(Test, request, reply);
  testCtrl.getItem();
};

const save = (request, reply) => {
  let testCtrl = new BaseApi(Test, request, reply);
  testCtrl.saveItem();
};

const update = (request, reply) => {
  let testCtrl = new BaseApi(Test, request, reply);
  testCtrl.update();
};

const deleteItems = (request, reply) => {
  let testCtrl = new BaseApi(Test, request, reply);
  testCtrl.deleteItems();
};

const moveToTrashItems = (request, reply) => {
  let testCtrl = new BaseApi(Test, request, reply);
  testCtrl.moveToTrashItems();
};

const publishItems = (request, reply) => {
  let testCtrl = new BaseApi(Test, request, reply);
  testCtrl.publishItems();
};

const unPublishItems = (request, reply) => {
  let testCtrl = new BaseApi(Test, request, reply);
  testCtrl.unPublishItems();
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
