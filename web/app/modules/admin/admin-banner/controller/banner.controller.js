'use strict';

import mongoose from 'mongoose';
const Banner = mongoose.model('Banner');
import BaseApi from '../../../../utils/BaseApi';

const getAll = (request, reply) => {
  let bannerCtrl = new BaseApi(Banner, request, reply, 'category');
  bannerCtrl.getAll();
};

const edit = (request, reply) => {
  let bannerCtrl = new BaseApi(Banner, request, reply);
  bannerCtrl.getItem();
};

const save = (request, reply) => {
  let bannerCtrl = new BaseApi(Banner, request, reply);
  bannerCtrl.saveItem();
};

const update = (request, reply) => {
  let bannerCtrl = new BaseApi(Banner, request, reply);
  bannerCtrl.update();
};

const deleteItems = (request, reply) => {
  let bannerCtrl = new BaseApi(Banner, request, reply);
  bannerCtrl.deleteItems();
};

const moveToTrashItems = (request, reply) => {
  let bannerCtrl = new BaseApi(Banner, request, reply);
  bannerCtrl.moveToTrashItems();
};

const publishItems = (request, reply) => {
  let bannerCtrl = new BaseApi(Banner, request, reply);
  bannerCtrl.publishItems();
};

const unPublishItems = (request, reply) => {
  let bannerCtrl = new BaseApi(Banner, request, reply);
  bannerCtrl.unPublishItems();
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