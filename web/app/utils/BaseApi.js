'use strict';

import mongoose from 'mongoose';
import Boom from 'boom';
import _ from 'lodash';
const ErrorHandler = require(BASE_PATH + '/app/utils/error.js');

class BaseApi {

  constructor(model, request, reply, populate = '') {
    this.model = model;
    this.request = request;
    this.reply = reply;
    this._queryString = {};
    this.populate = populate;
  }

  get queryString() {
    return this._queryString;
  }

  set queryString(value) {
    this._queryString = value;
  }

  getAll() {
    let config = this.request.server.configManager;
    let page = this.request.query.page || 1;
    let itemsPerPage = parseInt(this.request.query.per_page) || config.get('web.paging.itemsPerPage');
    let numberVisiblePages = config.get('web.paging.numberVisiblePages');

    let queryString = {};
    if (!_.isEmpty(this.queryString) && this.queryString !== undefined) {
      queryString = this.queryString;
    } else {
      if (this.request.query.filter && this.request.query.filter.length > 0) {
        let re = new RegExp(this.request.query.filter, 'i');
        queryString = {$or: [{'title': re}, {'name': re}, {'email': re}, {'phone': re}, {'key': re}]};
      }
      if (this.request.query.role) {
        queryString.roles = this.request.query.role;
      }
      if (this.request.query.status) {
        queryString.status = parseInt(this.request.query.status);
      }
      if (this.request.query.feature) {
        queryString.feature = parseInt(this.request.query.feature);
      }
      if (this.request.query.category) {
        queryString.category = mongoose.Types.ObjectId(this.request.query.category);
      }
    }

    var sort = {id: 1};
    if (this.request.query.sort) {
      let sortArray = this.request.query.sort.split('|');
      sort[sortArray[0]] = sortArray[1];
    }
    
    if(this.request.query.notPaginate){
      /*lấy list không phân trang*/
      this.model
      .find(queryString)
      .sort(sort)
      .populate(this.populate)
      .then((items)=>{
        let dataRes =  {status: 1, data: items}
        return this.reply(dataRes);
      })
    }else{
      this.model
      .find(queryString)
      .sort(sort)
      .populate(this.populate)
      .paginate(page, itemsPerPage, (err, items, total) => {
        if (err)
          return this.reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
        let totalPage = Math.ceil(total / itemsPerPage);
        let dataRes = {
          current_page: parseInt(page),
          itemsPerPage: itemsPerPage,
          numberVisiblePages: numberVisiblePages,
          data: items,
          from: 1 + (itemsPerPage * (page - 1)),
          to: itemsPerPage * page,
          last_page: totalPage,
          total: total,
          next_page_url: "",
          per_page: itemsPerPage
        };
        return this.reply(dataRes);
      });
    }
  }

  getItemByIdSync() {
    const id = this.request.params.id || this.request.payload.id;
    return this.model.findOne({'_id': id});
  }

  getItemById() {
    const id = this.request.params.id || this.request.payload.id;
    return this.model.findOne({'_id': id});
  }

  async update() {
    let item = await this.getItemByIdSync();
    item = _.extend(item, this.request.payload);
    let promise = item.save();
    promise
    .then((res) => {
      let returnData = {
        data: res,
        status: 1,
        message: 'Update Item successful!'
      };
      return this.reply(returnData);
    })
    .catch((err) => {
      return this.reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
    });
  }

  getItem() {
    let item = this.getItemById();
    item
    .then(res => {
      return this.reply(res);
    })
    .catch(err => {
      return this.reply(err);
    });
  }

  saveItem() {
    let data = new this.model(this.request.payload);
    let promise = data.save();
    promise
    .then((res) => {
      let returnData = {
        data: res,
        status: 1,
        message: 'Save Item successful!'
      };
      return this.reply(returnData);
    })
    .catch((err) => {
      return this.reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
    });
  }

  updateStatus(status) {
    let filterIds = this.request.payload.ids;
    if (filterIds) {
      this.model
      .find({
        _id: {
          $in: filterIds
        }
      })
      .then((pages) => {
        _.each(pages, (page) => {
          page.status = status;
          page.save();
        });

        return this.reply({
          status: 1,
          message: 'update success'
        });
      });
    } else {
      return this.reply({
        status: 0,
        message: 'update error'
      });
    }
  }

  deleteItems() {
    let filterIds = this.request.payload.ids;
    this.model
    .find({
      _id: {
        $in: filterIds
      }
    })
    .then((items) => {
      _.each(items, (item) => {
        item.remove();
      });
      return this.reply({
        status: 1,
        data: items,
        message: 'Remove success'
      });
    });
  }

  moveToTrashItems() {
    this.updateStatus(2);
  }

  publishItems() {
    this.updateStatus(1);
  }

  unPublishItems() {
    this.updateStatus(0);
  }

  async remove() {
    let item = await this.getItemByIdSync();
    item.remove((err) => {
      if (err) {
        return this.reply(Boom.badRequest(ErrorHandler.getErrorMessage(err)));
      }
      return this.reply({
        data: item,
        status: 1,
        message: 'Remove item successful!'
      });
    });
  }

  makeSlug(slug, callback, num) {
    if (typeof callback !== 'function') {
      throw new TypeError('BaseApi:makeSlug() || callback must be a function');
    }

    let promise = this.model.findOne({ 'slug': slug + (num ? '-' + num : '') });
    promise.then(item => {
      if (item) {
        return this.makeSlug(slug, callback, num ? num + 1 : 1);
      } else {
        return callback(slug + (num ? '-' + num : ''));
      }
    })
    .catch(err => {
      this.request.log(['error'], err);
      return callback(null, err);
    })
  }
}

export default BaseApi;