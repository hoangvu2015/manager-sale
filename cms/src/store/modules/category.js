/**
 * Created by xuantu on 9/7/17.
 */
import * as types from '../types';
import API from '../../services/app';

const state = {
    categoryitems: {}
};

const mutations = {
    [types.GET_CATEGORY_SUCCESS](state, data) {
        state.categoryitems = data;
    }
};

const actions = {
    getCategoryItems({commit}, data){
        API.getCategoryItems(data)
        .then(res => {
            if (res.status == 200) {
                let items = res.data.data;
                let cats = [];
                items.forEach((item) => {
                    cats.push({id: item._id, name: item.name});
                });
                commit(types.GET_CATEGORY_SUCCESS, cats);
            } else {
                commit(types.GET_CATEGORY_FAILED, res.data.message);
            }
        })
        .catch(err => {
            commit(types.GET_ITEM_FAILED, err.response.message);
        });
    }
};

export default {
    state,
    mutations,
    actions
}