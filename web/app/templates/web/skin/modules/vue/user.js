import Vue from 'vue';
import profile from './components/user.component';
import myUpload from './components/crop_upload.component.vue';
import UserService from './services/user.service';

let loginVue = null;
if (document.getElementById("mod-login")) {
    loginVue = new Vue({
        el: '#mod-login',
        components: {
            profile,
            'my-upload': myUpload
        },
        created: function() {

        },
        mounted: function() {
            let vm = this
            window.addEventListener('fb-sdk-get-login-status-success', function(evt) {
                vm.statusChangeCallback(evt.detail)
            });

            UserService
                .myaccount()
                .then((res) => {
                    if (res.status = 200) {
                        let data = res.data;
                        vm.formData.email = data.email;
                        vm.formData.name = data.name;
                    }
                })
        },
        data: function() {
            return {
                validateMsg: Vue.customeConfig.formInvalidMessages,
                loading: false,
                header: 'Đăng nhập',
                formData: {
                    name: '',
                    email: 'admin@gmail.com',
                    password: 'iii3studi1'
                },
                profile: {},
                ready: false,
                authorized: false,

                show: false,
                params: {
                    token: '123456798',
                    name: 'avatar'
                },
                headers: {
                    'Content-Type': undefined
                },
                imgDataUrl: '' // the datebase64 url of created image
            }
        },
        methods: {
            login: function() {
                let vm = this
                if (vm.loading == true) return;
                vm.loading = true;

                if (!vm.errors.any()) {
                    let submitData = {
                        email: vm.formData.email,
                        password: vm.formData.password
                    };
                    UserService
                        .login(submitData)
                        .then((res) => {
                            vm.loading = false;
                            if (res.status == 200) {
                                if (res.data.token) {
                                    window.location.href = '/';
                                }
                            }
                        }, (res) => {
                            vm.error = res.data
                        })
                        .finally((res) => {
                            console.log('res', res);
                        });

                }

            },
            loginGG: function() {

            },
            getProfile: function() {
                let vm = this
                FB.Api('/me', function(response) {
                    console.log(response)
                    vm.$set(vm, 'profile', response)
                })
            },
            loginFB: function() {
                let vm = this
                FB.login(function(response) {
                    vm.statusChangeCallback(response)
                }, { scope: 'publish_actions' })
            },
            logoutFB: function() {
                let vm = this
                FB.logout(function(response) {
                    vm.statusChangeCallback(response)
                })
            },
            statusChangeCallback: function(response) {
                let vm = this
                vm.ready = true
                console.log('statusChangeCallback')
                console.log(response)
                if (response.status === 'connected') {
                    vm.authorized = true
                    vm.getProfile()
                } else if (response.status === 'not_authorized') {
                    vm.authorized = false
                } else {
                    vm.authorized = false
                }
            },
            validateBeforeSubmit: function() {
                let vm = this
                vm.$validator.validateAll().then(result => {
                    if (result) {
                        // console('Form Submitted!');
                        vm.login();
                        return;
                    }
                    // console('Correct the errors!');
                });
            },
            toggleShow() {
                this.show = !this.show;
            },
            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccess(imgDataUrl, field) {
                console.log('-------- crop success --------');
                this.imgDataUrl = imgDataUrl;
            },
            /**
             * upload success
             *
             * [param] jsonData
             * [param] field
             */
            cropUploadSuccess(jsonData, field) {
                console.log('-------- upload success --------');
                console.log(jsonData);
                console.log('field: ' + field);
            },
            /**
             * upload fail
             *
             * [param] status    server api return error status, like 500
             * [param] field
             */
            cropUploadFail(status, field) {
                console.log('-------- upload fail --------');
                console.log(status);
                console.log('field: ' + field);


                // $scope.$on('t:CropperImageSuccess', function(e, data) {
                //   var files = document.getElementById('demoFile').files;
                //   $http({
                //     url: 'https://16hnt2oosb.execute-api.us-east-1.amazonaws.com/dev/cropImage?w=' +
                //     data.cropParams.width +
                //     '&h=' +
                //     data.cropParams.height +
                //     '&x=' +
                //     data.cropParams.x +
                //     '&y=' +
                //     data.cropParams.y,
                //     method: 'POST',
                //     data: files[0],
                //     headers: { 'Content-Type': undefined }
                //   }).then(function(resp) {
                //     document
                //       .getElementById('imgPreview')
                //       .setAttribute('src', resp.data.url);
                //   });
                // });



            }
        }
    });
}

export default loginVue;
window.loginVue = loginVue;