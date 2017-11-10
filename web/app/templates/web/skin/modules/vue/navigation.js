import Vue from 'vue';
import UserService from './services/user.service';

if (document.getElementById("mod-menu")) {
    let vm = new Vue({
        el: '#mod-menu',
        data: {

        },
        methods: {
            logout: function() {
                UserService
                    .logout()
                    .then(res => {
                        if (res.status == 200) {
                            window.location.href = '/';
                        }
                    })
                    .catch(res => {
                        window.location.href = '/';
                    });
            }
        }
    });
}