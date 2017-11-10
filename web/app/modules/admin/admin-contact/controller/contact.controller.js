/**
 * Created by xuantu on 8/30/17.
 */

 'use strict';
 import mongoose from 'mongoose';
 const Contact = mongoose.model('Contact');
 import BaseApi from '../../../../utils/BaseApi';

 const getAll = (request, reply) => {
    let contactCtrl = new BaseApi(Contact, request, reply);
    contactCtrl.getAll();
};

const edit = (request, reply) => {
    let contactCtrl = new BaseApi(Contact, request, reply);
    contactCtrl.getItem();
};

const save = (request, reply) => {
    let contactCtrl = new BaseApi(Contact, request, reply);
    contactCtrl.saveItem();
};

const update = (request, reply) => {
    let contactCtrl = new BaseApi(Contact, request, reply);
    contactCtrl.update();
};

const deleteItems = (request, reply) => {
    let contactCtrl = new BaseApi(Contact, request, reply);
    contactCtrl.deleteItems();
};

const moveToTrashItems = (request, reply) => {
    let contactCtrl = new BaseApi(Contact, request, reply);
    contactCtrl.moveToTrashItems();
};

const publishItems = (request, reply) => {
    let contactCtrl = new BaseApi(Contact, request, reply);
    contactCtrl.publishItems();
};

const unPublishItems = (request, reply) => {
    let contactCtrl = new BaseApi(Contact, request, reply);
    contactCtrl.unPublishItems();
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