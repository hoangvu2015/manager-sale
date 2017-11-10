/**
 * Created by xuantu on 9/7/17.
 */
import * as types from '../types';
import Auth from '../../services/auth';

export default {
	state: {
		authUser: null,
		authResult: null
	},
	mutations: {
		[types.UPDATE_AUTH](state, authInfo) {
			state.authUser = authInfo;
		},
		['USER_LOGIN'](state, result) {
			state.authResult = result;
		}
	},
	actions: {
		login({commit}, data) {
			Auth
				.login(data)
				.then(resp => {
					commit('USER_LOGIN', {
						[tokenKey]: resp.data.token,
						message: 'Login success',
						success: true
					});
				})
				.catch(err => {
					console.log(err.response);
					commit('USER_LOGIN', {
						message: err.response.data.message,
						success: false
					});
				})
		},
		isLoggedIn({commit}) {
			Auth
				.isLoggedIn()
				.then(resp => {
					if (resp) {
						commit(types.UPDATE_AUTH, resp.data);
					} else {
						commit(types.UPDATE_AUTH, false);
						commit(types.GOTO, '/auth/login');
					}
				})
				.catch(err => {
					commit(types.UPDATE_AUTH, false);
					commit(types.GOTO, '/auth/login');
				})
		}
	},
}