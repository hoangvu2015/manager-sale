import Axios from 'axios';

const contact = (data) => {
    return Axios.post(settings.services.apiUrl + '/contact', data);
}

export default {
    contact
}