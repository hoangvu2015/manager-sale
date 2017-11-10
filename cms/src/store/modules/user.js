/**
 * Created by xuantu on 9/7/17.
 */
import * as types from '../types';
import API from '../../services/app';

export default {
	state: {
		items: []
	},
	mutations: {
		[types.GET_USERS_SUCCESS](state, data){
			state.items = data;
		}
	},
	actions: {
		getAllUsers({commit}, data){
			API.getItems(data)
				.then(res => {
					if (res.status === 200 && res.data) {
						commit(types.GET_USERS_SUCCESS, res.data.data);
					} else {
						commit(types.GET_USERS_FAILED, res.data.message);
					}
				})
				.catch(err => {
					commit(types.GET_ITEMS_FAILED, err.response.data.message);
				})
		}
	},
}