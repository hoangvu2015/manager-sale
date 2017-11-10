'use strict';

import mongoose from 'mongoose';
const Setting = mongoose.model('Setting');
import BaseApi from '../../../../utils/BaseApi';

const getAll = (request, reply) => {
  let settingCtrl = new BaseApi(Setting, request, reply);
  settingCtrl.getAll();
};

const edit = (request, reply) => {
  let settingCtrl = new BaseApi(Setting, request, reply);
  settingCtrl.getItem();
};

const save = (request, reply) => {
  let settingCtrl = new BaseApi(Setting, request, reply);
  settingCtrl.saveItem();
};

const update = (request, reply) => {
  let settingCtrl = new BaseApi(Setting, request, reply);
  settingCtrl.update();
};

const deleteItems = (request, reply) => {
  let settingCtrl = new BaseApi(Setting, request, reply);
  settingCtrl.deleteItems();
};

const moveToTrashItems = (request, reply) => {
  let settingCtrl = new BaseApi(Setting, request, reply);
  settingCtrl.moveToTrashItems();
};

const publishItems = (request, reply) => {
  let settingCtrl = new BaseApi(Setting, request, reply); 
  settingCtrl.publishItems();
};

const unPublishItems = (request, reply) => {
  let settingCtrl = new BaseApi(Setting, request, reply);
  settingCtrl.unPublishItems();
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