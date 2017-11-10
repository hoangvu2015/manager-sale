'use strict';

import mongoose from 'mongoose';
const Post = mongoose.model('Post');
import BaseApi from '../../../../utils/BaseApi';

const getAll = (request, reply) => {
  let postCtrl = new BaseApi(Post, request, reply, 'category');
  postCtrl.getAll();
};

const edit = (request, reply) => {
  let postCtrl = new BaseApi(Post, request, reply);
  postCtrl.getItem();
};

const save = (request, reply) => {
  let postCtrl = new BaseApi(Post, request, reply);
  postCtrl.saveItem();
};

const update = (request, reply) => {
  let postCtrl = new BaseApi(Post, request, reply);
  postCtrl.update();
};

const deleteItems = (request, reply) => {
  let postCtrl = new BaseApi(Post, request, reply);
  postCtrl.deleteItems();
};

const moveToTrashItems = (request, reply) => {
  let postCtrl = new BaseApi(Post, request, reply);
  postCtrl.moveToTrashItems();
};

const publishItems = (request, reply) => {
  let postCtrl = new BaseApi(Post, request, reply);
  postCtrl.publishItems();
};

const unPublishItems = (request, reply) => {
  let postCtrl = new BaseApi(Post, request, reply);
  postCtrl.unPublishItems();
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