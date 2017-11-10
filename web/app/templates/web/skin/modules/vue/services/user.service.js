import Axios from 'axios';

const logout = () => {
    return Axios.get(settings.services.apiUrl + '/user/logout', {
        withCredentials: true
    });
}

const myaccount = () => {
    return Axios.get(settings.services.apiUrl + '/user/account', {
        withCredentials: true
    });
}

const login = (data) => {
    return Axios.post(settings.services.apiUrl + '/user/login', data, {
        withCredentials: true
    });
}

const register = (data) => {
    return Axios.post(settings.services.apiUrl + '/user/register', data);
}

export default {
    myaccount,
    logout,
    login,
    register
}