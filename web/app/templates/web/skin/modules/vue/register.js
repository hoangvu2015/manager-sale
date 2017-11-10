import Vue from 'vue';
import UserService from './services/user.service';

if (document.getElementById("registerForm")) {
    new Vue({
        el: '#registerForm',
        data: function() {
            return {
                loading: false,
                formData: {
                    name: 'test',
                    email: 'test2@gmail.com',
                    password: '12345678',
                    cfpassword: '12345678'
                }
            }
        },
        methods: {
            register: function() {
                let vm = this
                if (vm.loading == true) return;
                vm.loading = true;

                if (!vm.errors.any()) {
                    let submitData = {
                        name: vm.formData.name,
                        email: vm.formData.email,
                        password: vm.formData.password,
                        cfpassword: vm.formData.cfpassword
                    };
                    UserService
                        .register(submitData)
                        .then((res) => {
                            vm.loading = false;
                            if (res.status == 200) {
                                window.location.href = '/';
                            }
                        }, (res) => {
                            vm.error = res.data
                        })
                        .finally((res) => {
                            console.log('res', res);
                        });

                }

            }
        }
    });
}