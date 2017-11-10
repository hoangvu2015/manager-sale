 'use strict';
 
 import mongoose from 'mongoose';
 const Page = mongoose.model('Page');
 import BaseApi from '../../../../utils/BaseApi';

 const getAll = (request, reply) => {
  let pageCtrl = new BaseApi(Page, request, reply);
  pageCtrl.getAll();
};

const edit = (request, reply) => {
  let pageCtrl = new BaseApi(Page, request, reply);
  pageCtrl.getItem();
};

const save = (request, reply) => {
  let pageCtrl = new BaseApi(Page, request, reply);
  pageCtrl.saveItem();
};

const update = (request, reply) => {
  let pageCtrl = new BaseApi(Page, request, reply);
  pageCtrl.update();
};

const deleteItems = (request, reply) => {
  let pageCtrl = new BaseApi(Page, request, reply);
  pageCtrl.deleteItems();
};

const moveToTrashItems = (request, reply) => {
  let pageCtrl = new BaseApi(Page, request, reply);
  pageCtrl.moveToTrashItems();
};

const publishItems = (request, reply) => {
  let pageCtrl = new BaseApi(Page, request, reply);
  pageCtrl.publishItems();
};

const unPublishItems = (request, reply) => {
  let pageCtrl = new BaseApi(Page, request, reply);
  pageCtrl.unPublishItems();
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