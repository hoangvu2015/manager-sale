'use strict';

import mongoose from 'mongoose';
import BaseApi from '../../../../utils/BaseApi';
const <%= modelName %> = mongoose.model('<%= modelName %>');

const getAll = (request, reply) => {
  let <%= moduleName %>Ctrl = new BaseApi(<%= modelName %>, request, reply, 'categories');
  <%= moduleName %>Ctrl.getAll();
};

const edit = (request, reply) => {
  let <%= moduleName %>Ctrl = new BaseApi(<%= modelName %>, request, reply);
  <%= moduleName %>Ctrl.getItem();
};

const save = (request, reply) => {
  let <%= moduleName %>Ctrl = new BaseApi(<%= modelName %>, request, reply);
  <%= moduleName %>Ctrl.saveItem();
};

const update = (request, reply) => {
  let <%= moduleName %>Ctrl = new BaseApi(<%= modelName %>, request, reply);
  <%= moduleName %>Ctrl.update();
};

const deleteItems = (request, reply) => {
  let <%= moduleName %>Ctrl = new BaseApi(<%= modelName %>, request, reply);
  <%= moduleName %>Ctrl.deleteItems();
};

const moveToTrashItems = (request, reply) => {
  let <%= moduleName %>Ctrl = new BaseApi(<%= modelName %>, request, reply);
  <%= moduleName %>Ctrl.moveToTrashItems();
};

const publishItems = (request, reply) => {
  let <%= moduleName %>Ctrl = new BaseApi(<%= modelName %>, request, reply);
  <%= moduleName %>Ctrl.publishItems();
};

const unPublishItems = (request, reply) => {
  let <%= moduleName %>Ctrl = new BaseApi(<%= modelName %>, request, reply);
  <%= moduleName %>Ctrl.unPublishItems();
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
