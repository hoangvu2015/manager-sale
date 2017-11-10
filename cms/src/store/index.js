import Vue from 'vue';
import Vuex from 'vuex';

import menu from './modules/menu';
import app from './modules/app';
import user from './modules/user';
import auth from './modules/auth';
import category from './modules/category';
import emailCampaign from './modules/email-campaign';

import * as getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	strict: true, // process.env.NODE_ENV !== 'production',
	getters,
	modules: {
		menu,
		app,
		auth,
		user,
		category,
		emailCampaign
	},
	state: {},
	mutations: {}
});

export default store