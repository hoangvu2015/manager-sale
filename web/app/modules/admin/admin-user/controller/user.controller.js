'use strict';

import Boom from 'boom';
import mongoose from 'mongoose';
import _ from 'lodash';

const User = mongoose.model('User');
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');
const regexp = require(BASE_PATH + '/app/utils/regexp');
import BaseApi from '../../../../utils/BaseApi';

const getAll = (request, reply) => {
  let userCtrl = new BaseApi(User, request, reply);
  userCtrl.getAll();
};

const edit = (request, reply) => {
  let userCtrl = new BaseApi(User, request, reply);
  userCtrl.getItem();
};

const save = (request, reply) => {
  if (request.pre.userByEmail) {
    return reply(Boom.badRequest('Email taken'));
  }
  if (request.payload.password != request.payload.cfpassword) {
    return reply(Boom.badRequest('Confirm new password does not match'));
  }
  delete request.payload.cfpassword;

  let user = new User(request.payload);
  user.provider = 'local';
  user.hashPassword(request.payload.password, (err, hash) => {
    user.password = hash;
    // const token = crypto.randomBytes(20).toString('hex');
    // user.activeToken = token;
    const promise = user.save();
    promise.then(user => {
      user = user.toObject();
      delete user.password;
      //@TODOsend email welcome here
      return reply({
        data: user,
        status: 1,
        message: 'Save Item successful!'
      });
    }).catch(err => {
      return reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
    });
  });
};

const update = (request, reply) => {
  let user = request.pre.user;
  if (!request.payload.password || request.payload.password == user.password) {
    delete request.payload.password;
  } else if (request.payload.password !== request.payload.cfpassword) {
    return reply(Boom.badRequest('Confirm new password does not match'));
  }
  delete request.payload.cfpassword;

  user = _.assignIn(user, request.payload);
  let saveUser = user => {
    let promise = user.save();

    promise
    .then(user => {
      return reply({
        data: user,
        status: 1,
        message: 'Update Item successful!'});
    })
    .catch(err => {
      return reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
    });
  }

  if (request.payload.password) {
    user.hashPassword(request.payload.password, (err, hash) => {
      user.password = hash;
      saveUser(user);
    });
  } else {
    saveUser(user);
  }
};

const sysAccount = (request, reply) => {
  let user = request.pre.user;

  if (user) {
    if (user.status == 1 && user.roles.indexOf('admin') !== -1) {
      return reply(user);
    }

    return reply(Boom.unauthorized('Permission denied'));
  }
  return reply(Boom.notFound('User is not found'));
};

const moveToTrashItems = (request, reply) => {
  let userCtrl = new BaseApi(User, request, reply);
  userCtrl.moveToTrashItems();
};

const publishItems = (request, reply) => {
  let settingCtrl = new BaseApi(User, request, reply);
  settingCtrl.publishItems();
};

const unPublishItems = (request, reply) => {
  let userCtrl = new BaseApi(User, request, reply);
  userCtrl.unPublishItems();
};

const deleteItems = (request, reply) => {
  let userCtrl = new BaseApi(User, request, reply);
  userCtrl.deleteItems();
};

export default {
  getAll,
  edit,
  save,
  update,
  sysAccount,
  moveToTrashItems,
  publishItems,
  unPublishItems,
  deleteItems
};