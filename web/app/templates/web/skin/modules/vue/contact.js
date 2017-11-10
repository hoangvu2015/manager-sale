import Vue from 'vue';
import VueRecaptcha from 'vue-recaptcha';
import ContactService from './services/contact.service';

if (document.getElementById("contactForm")) {
    new Vue({
        el: '#contactForm',
        components: { 'vue-recaptcha': VueRecaptcha },
        data: {
            sitekey: window.reCaptchaKey,
            verifyRecaptcha: false,
            formData: {
                email: '',
                name: '',
                message: ''
            }
        },
        methods: {
            onVerify: function(response) {
                console.log('Verify: ' + response);
                if (response) {
                    this.verifyRecaptcha = true;
                }
            },
            onExpired: function() {
                console.log('Expired')
            },
            resetRecaptcha() {
                this.$refs.recaptcha.reset(); // Direct call reset method
            },
            submit: function() {
                let vm = this
                vm.$validator.validateAll().then(result => {
                    if (result && this.verifyRecaptcha) {
                        let contactData = {
                            email: this.formData.email,
                            name: this.formData.name,
                            message: this.formData.message,
                        }

                        ContactService
                            .contact(contactData)
                            .then((res) => {
                                if (res.status == 200) {
                                    alert(res.data.msg);
                                    this.formData.email = "";
                                    this.formData.name = "";
                                    this.formData.message = "";
                                }
                            });
                    }
                });
            }
        }
    });
}