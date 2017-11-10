import * as types from '../../types'
import dashboard from './dashboard'
import auth from '../menu/auth';
import posts from './posts'
import pages from './pages'
import users from './users'
import settings from './settings'
import banners from './banners'
import contacts from './contacts'
import emailCampaigns from './email-campaigns'
import test from './test'
/*generator import module*/
/*(không xóa 2 dòng comment này hoangvu53th@gmail.com)*/

const state = {
	items: [
		auth,
		dashboard,
		contacts,
		banners,
		pages,
		posts,
		// forms,
		// ui
		settings,
		users,
		emailCampaigns,
		/*(không xóa 2 dòng comment này hoangvu53th@gmail.com)*/
		/*generator inject module*/
		test
	]
};

const mutations = {
	[types.TOGGLE_EXPAND_MENU_ITEM](state, payload) {
		let menuItem = payload.menuItem;
		let expand = payload.expand;
		if (menuItem.children && menuItem.meta) {
			menuItem.meta.expanded = expand;
		}
	}
};

const actions = {
	toggleExpandMenuItem({commit}, payload) {
		commit(types.TOGGLE_EXPAND_MENU_ITEM, payload);
	}
};


export default {
	state,
	mutations,
	actions
}