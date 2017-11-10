/**
* Created by xuantu on 9/5/17.
*/

import Axios from 'axios';

const getItems = (data) => {
	"use strict";
	let apiUrl = data.apiUrl;
	let {params} = data || {};
	return Axios.get(`${apiUrl}`,
	{
		params,
		withCredentials: true
	}
	);
};

const deleteItems = (ids, apiUrl) => {
	"use strict";
	return Axios.put(`${apiUrl}/deleteItems`, {ids: ids},
	{
		withCredentials: true
	});
};

const moveToTrashItems = (ids, apiUrl) => {
	"use strict";
	return Axios.put(`${apiUrl}/moveToTrashItems`, {ids: ids}, {
		withCredentials: true
	});
};

const publishItems = (ids, apiUrl) => {
	"use strict";
	return Axios.put(`${apiUrl}/publishItems`, {ids: ids}, {
		withCredentials: true
	});
};

const unPublishItems = (ids, apiUrl) => {
	"use strict";
	return Axios.put(`${apiUrl}/unPublishItems`, {ids: ids}, {
		withCredentials: true
	});
};

const saveItem = (data) => {
	"use strict";
	let formData = Object.assign({}, data.formData);
	let id = data.id;
	let apiUrl = data.apiUrl;

	// Fix trường hợp dùng switch chỉ có true và false detect reset value
	if (typeof formData.status == 'boolean') {
		if (formData.status) {
			formData.status = 1;
		} else {
			formData.status = 0;
		}
	}
	
	if (id !== undefined) {
		// UPDATE
		return Axios.put(`${apiUrl}/${id}`, formData,
		{
			withCredentials: true
		}
		);
	} else {
		// SAVE NEW
		return Axios.post(`${apiUrl}`, formData,
		{
			withCredentials: true
		}
		);
	}
};

const getItemById = (data) => {
	let id = data.id;
	let apiUrl = data.apiUrl;
	return Axios.get(`${apiUrl}/${id}`,
	{
		withCredentials: true
	}
	);
};

const getCategoryItems = (data) => {
	return Axios.get(`${adminUrl}/category`,
	{
		withCredentials: true
	}
	);
};

const getExcelData = (data) => {
	return Axios.get(`${data.apiUrl}`,
	{
		withCredentials: true,
		params: data.params
	}
	);
};

const sendMail = (data) => {
	return Axios.post(`${data.apiUrl}`, data.formData,
	{
		withCredentials: true,
		params: data.params
	}
	);
};

const sendMailCampaign = (data) => {
	return Axios.post(`${data.apiUrl}`, data.formData,
	{
		withCredentials: true,
		params: data.params
	}
	);
};

const removeFile = (data) => {
	return Axios.post(`${window.apiUrl}/upload/removeFile`, data,
	{
		withCredentials: true
	}
	);
};

export default  {
	getItems,
	deleteItems,
	moveToTrashItems,
	publishItems,
	unPublishItems,
	saveItem,
	getItemById,
	getCategoryItems,
	getExcelData,
	sendMail,
	sendMailCampaign,
	removeFile
}