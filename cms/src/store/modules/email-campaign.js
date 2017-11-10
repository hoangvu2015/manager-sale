/**
 * File name: email-campaign.js
 * Created by Sublime Text 3
 * User: Le Thanh Danh
 * Date: 2017-09-25
 * Time: 10:54
 */
import * as types from '../types';
import API from '../../services/app';

export default {
	state: {
		// alertMessage: Object
	},
	mutations: {
		// sendEmailCampaignDone(state, message) {
		// 	let alertMessage = {
		// 		show: true,
		// 		title: "Success",
		// 		type: "success",
		// 		text: message
		// 	};
		// 	state.alertMessage = alertMessage;
		// }
	},
	actions: {
		sendEmailCampaign({commit}, data) {

			API
			.sendMailCampaign(data)
			.then(resp => {
				console.log(resp);
				commit(types.SEND_EMAIL_SUCCESS, resp.data.message);
			})
			.catch(err => {
				commit(types.GET_ITEMS_FAILED, err.response.data.message);
			})
		}
	},
}