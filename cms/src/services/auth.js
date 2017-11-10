/**
 * Created by xuantu on 8/24/17.
 */
import Vue from 'vue';
import Axios from 'axios';

const verifySysadmin = async() => {
    return await Axios.get(`${window.adminUrl}/user/sysaccount`, {
        withCredentials: true
    });
};

const isLoggedIn = async() => {
    if (Vue.cookie.get(tokenKey)) {
        return await verifySysadmin()
    } else {
        return false;
    }
};

const login = (data) => {
    "use strict";

    return Axios
        .post(`${window.apiUrl}/admin/login`, data, {
            withCredentials: true
        })
};

const logout = () => {
    "use strict";

    return Axios
        .get(`${window.apiUrl}/admin/logout`, {
            withCredentials: true
        })
        .then((res) => {
            if (res.status === 200) {
                return true;
            } else {
                return false;
            }
        })
        .catch(err => {
            return false;
        })
};

export default {
    isLoggedIn,
    login,
    logout
}