import * as types from '../types';
import API from '../../services/app';
import Excel from '../../services/excel';
import router from '../../router'

const state = {
	sidebar: {
		opened: false,
		withoutAnimation: false
	},
	config: {
		windowMatchSizeLg: '(min-width: 992px)',
		palette: {
			primary: '#4ae387',
			danger: '#e34a4a',
			info: '#4ab2e3',
			success: '#db76df',
			warning: '#f7cc36',
			white: '#fff',
			black: '#000',
			fontColor: '#34495e',
			transparent: 'transparent',
			lighterGray: '#ddd'
		}
	},
	alertMessage: {
		show: false,
		title: "",
		type: "",
		text: ""
	},
	selectItem: {},
	items: Array(),
	isLoading: true,
	isReloadTable: false
};

const mutations = {
	[types.TOGGLE_SIDEBAR](state, opened) {
		state.sidebar.opened = opened
	},
	[types.TOGGLE_DROPDOWN](state) {
		if (document.documentElement.clientWidth < 992) {
			state.sidebar.opened = false;
		}
	},
	[types.TOGGLE_WITHOUT_ANIMATION](state, value) {
		state.sidebar.withoutAnimation = value
	},
	setLoading(state, isLoading) {
		state.isLoading = isLoading;
	},
	setTableReload(state, isReloadTable) {
		state.isReloadTable = isReloadTable;
	},
	[types.MOVE_TO_TRASH_ITEMS_SUCCESS](state, message) {
		state.isReloadTable = true;

		let alertMessage = {
			show: true,
			title: "Success",
			type: "success",
			text: message
		};
		state.alertMessage = alertMessage;
	},
	[types.SUCCESS](state, message) {
		state.isReloadTable = true;

		let alertMessage = {
			show: true,
			title: "Success",
			type: "success",
			text: message
		};
		state.alertMessage = alertMessage;
	},
	[types.MOVE_TO_TRASH_ITEMS_FAILED](state, message) {
		state.isReloadTable = true;

		let alertMessage = {
			show: true,
			title: "Error",
			type: "danger",
			text: message
		};

		state.alertMessage = alertMessage;
	},
	[types.DELETE_ITEMS_SUCCESS](state, message) {
		state.isReloadTable = true;

		let alertMessage = {
			show: true,
			title: "Success",
			type: "success",
			text: message
		};
		state.alertMessage = alertMessage;
	},
	[types.DELETE_ITEMS_FAILED](state, message) {
		state.isReloadTable = true;

		let alertMessage = {
			show: true,
			title: "Error",
			type: "danger",
			text: message
		};
		state.alertMessage = alertMessage;
	},
	[types.PUBLISH_ITEMS_SUCCESS](state, message) {
		state.isReloadTable = true;

		let alertMessage = {
			show: true,
			title: "Success",
			type: "success",
			text: message
		};
		state.alertMessage = alertMessage;
	},
	[types.PUBLISH_ITEMS_FAILED](state, message) {
		state.isReloadTable = true;

		let alertMessage = {
			show: true,
			title: "Error",
			type: "danger",
			text: message
		};
		state.alertMessage = alertMessage;
	},
	[types.UNPUBLISH_ITEMS_SUCCESS](state, message) {
		state.isReloadTable = true;

		let alertMessage = {
			show: true,
			title: "Success",
			type: "success",
			text: message
		};
		state.alertMessage = alertMessage;
	},
	[types.UNPUBLISH_ITEMS_FAILED](state, message) {
		state.isReloadTable = true;

		let alertMessage = {
			show: true,
			title: "Error",
			type: "danger",
			text: message
		};
		state.alertMessage = alertMessage;
	},
	[types.SAVE_ITEM_SUCCESS](state, message) {
		let alertMessage = {
			show: true,
			title: "Success",
			type: "success",
			text: message
		};
		state.alertMessage = alertMessage;
	},
	[types.SAVE_ITEM_FAILED](state, message) {
		let alertMessage = {
			show: true,
			title: "Error",
			type: "danger",
			text: message
		};
		state.alertMessage = alertMessage;
	},
	[types.GET_ITEM_SUCCESS](state, data) {
		state.selectItem = data;
	},
	[types.GET_ITEM_FAILED](state, message) {
		let alertMessage = {
			show: true,
			title: "Error",
			type: "danger",
			text: message
		};
		state.alertMessage = alertMessage;
		state.selectItem = {};
	},
	[types.GOTO](state, path) {
		router.push(`${path}`);
	},
	[types.GOTO_DETAIL](state, data) {
		router.push(`${data.routeDetail}/${data.rowData._id}`);
		state.alertMessage.show = false;
	},
	[types.GOTO_LIST](state, data) {
		router.push(`/${data.routeList}`);
		state.alertMessage.show = false;
	},
	[types.GET_DATA_FAILED](state, message) {
		let alertMessage = {
			show: true,
			title: "Error",
			type: "danger",
			text: message
		};
		state.alertMessage = alertMessage;
		state.selectItem = {};
	},
	[types.GET_ITEMS_SUCCESS](state, data) {
		state.items = data;
	},
	[types.GET_ITEMS_FAILED](state, message) {
		let alertMessage = {
			show: true,
			title: "Error",
			type: "danger",
			text: message
		};
		state.alertMessage = alertMessage;
		state.items = Array();
	},
	[types.SEND_EMAIL_SUCCESS](state, message) {
		let alertMessage = {
			show: true,
			title: "Success",
			type: "success",
			text: message
		};
		state.alertMessage = alertMessage;
	}
};

const actions = {
	toggleSidebar({ commit }, opened) {
		commit(types.TOGGLE_SIDEBAR, opened);
	},
	toggleDropdown({ commit }) {
		commit(types.TOGGLE_DROPDOWN);
	},
	isToggleWithoutAnimation({ commit }, value) {
		commit(types.TOGGLE_WITHOUT_ANIMATION, value);
	},
	moveToTrashItems({ commit }, data) {

		if (data.status == 2) {
			// Delete Permanent
			API
			.deleteItems(data.rowData, data.apiUrl)
			.then(res => {

				if (res.status == 200) {
					commit(types.DELETE_ITEMS_SUCCESS, res.data.message);
				} else {
					commit(types.DELETE_ITEMS_FAILED, res.data.message);
				}
			})
			.catch(err => {
				commit(types.DELETE_ITEMS_FAILED, err.response.data.message);
			});
		} else {
			// Move to trash
			API
			.moveToTrashItems(data.rowData, data.apiUrl)
			.then(res => {
				if (res.status == 200) {
					commit(types.MOVE_TO_TRASH_ITEMS_SUCCESS, res.data.message);
				} else {
					commit(types.MOVE_TO_TRASH_ITEMS_FAILED, res.data.message);
				}
			})
			.catch(err => {
				commit(types.MOVE_TO_TRASH_ITEMS_FAILED, err.response.data.message);
			});
		}
	},
	publishItems({ commit }, data) {
		API
		.publishItems(data.rowData, data.apiUrl)
		.then(res => {
			if (res.status == 200) {
				commit(types.PUBLISH_ITEMS_SUCCESS, res.data.message);
			} else {
				commit(types.PUBLISH_ITEMS_FAILED, res.data.message);
			}
		})
		.catch(err => {
			commit(types.PUBLISH_ITEMS_FAILED, err.response.data.message);

		});
	},
	unPublishItems({ commit }, data) {
		API
		.unPublishItems(data.rowData, data.apiUrl)
		.then(res => {
			if (res.status === 200) {
				commit(types.UNPUBLISH_ITEMS_SUCCESS, res.data.message);
			} else {
				commit(types.UNPUBLISH_ITEMS_FAILED, res.data.message);
			}
		})
		.catch(err => {
			commit(types.UNPUBLISH_ITEMS_FAILED, err.response.data.message);
		});
	},
	goto({ commit }, path) {
		commit(types.GOTO, path);
	},
	gotoDetail({ commit }, data) {
		commit(types.GOTO_DETAIL, data);
	},
	goToList({ commit }, data) {
		commit(types.GOTO_LIST, data);
	},
	saveItem({ commit }, data) {
		API.saveItem(data)
		.then(res => {
			if (res.status === 200 && res.data) {
				commit(types.SAVE_ITEM_SUCCESS, res.data.message);

				if (data.redirect) {
					commit(types.GOTO, data.redirect.path || data.redirect.route);
				} else {
					if (data.routeDetail && typeof res.data.data == 'object' && res.data.data._id) {
						setTimeout(() => {
							commit(types.GOTO_DETAIL, { 
								routeDetail: data.routeDetail,
								rowData: res.data.data
							})
						}, 1000)
					}
				}
			} else {
				commit(types.SAVE_ITEM_FAILED, res.data.message);
			}
		})
		.catch(err => {
			console.log(err);
			commit(types.SAVE_ITEM_FAILED, err.response.data.message);
		})
	},
	getItemById({ commit }, data) {
		API.getItemById(data)
		.then(res => {
			if (res.status === 200 && res.data) {
				commit(types.GET_ITEM_SUCCESS, res.data);
			} else {
				commit(types.GET_ITEM_FAILED, res.data.message);
			}
		})
		.catch(err => {
			commit(types.GET_ITEM_FAILED, err.response.data.message);
		})
	},
	getItems({ commit }, data) {
		API.getItems(data)
		.then(res => {
			if (res.status === 200 && res.data) {
				commit(types.GET_ITEMS_SUCCESS, res.data.items);
			} else {
				commit(types.GET_ITEMS_FAILED, res.data.message);
			}
		})
		.catch(err => {
			commit(types.GET_ITEMS_FAILED, err.response.data.message);
		})
	},
	exportExcel({ commit }, data) {
		API.getExcelData(data)
		.then(resp => {
			let excel = new Excel(data.fields, resp.data.data, data.vm, data.fileName)
			excel.export()
			commit(types.SUCCESS, 'Export success');
		})
		.catch(err => {
			commit(types.GET_ITEMS_FAILED, err.response.data.message);
		})
	},
	sendMail({ commit }, data) {
		API
		.sendMail(data)
		.then(res => {
			if (res.status === 200 && res.data.status) {
				commit(types.SEND_EMAIL_SUCCESS, res.data.message);
			} else {
				commit(types.SEND_EMAIL_FAILED, res.data.message);
			}
		})
		.catch(err => {
			commit(types.SEND_EMAIL_FAILED, err.response.data.message);
		});
	},
	removeImage({ commit }, data) {
		API.removeFile(data)
	}
};

export default {
	state,
	mutations,
	actions
}