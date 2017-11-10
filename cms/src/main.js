// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
window.adminUrl = 'http://localhost:9002/admin';
window.apiUrl = 'http://localhost:9001/v1/api';
window.webUrl = 'http://localhost:9006';

window.localStoragePrefix = 'bzcms-';
window.tokenKey = 'bzcms-admin-token';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
import VueCookie from 'vue-cookie';
import App from './App';
import store from './store';
import router from './router';
import { sync } from 'vuex-router-sync';
import VuesticPlugin from 'src/components/vuestic-components/vuestic-components-plugin';
import BzPlugin from 'src/components/vuebz-components/bz-components-plugin';
import VueLocalStorage from 'vue-localstorage';
require('froala-editor/js/froala_editor.pkgd.min');
// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css');
require('font-awesome/css/font-awesome.css');
require('froala-editor/css/froala_style.min.css');

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg';

import VueToastr from '@deveodk/vue-toastr';
// You need a specific loader for CSS files like https://github.com/webpack/css-loader
// If you would like custom styling of the toastr the css file can be replaced
import '@deveodk/vue-toastr/dist/@deveodk/vue-toastr.css';

Vue.use(VueToastr)
Vue.use(VueFroala);
Vue.use(VuesticPlugin);
Vue.use(BzPlugin);
Vue.use(BootstrapVue);
Vue.use(VeeValidate, { fieldsBagName: 'formFields' });
Vue.use(VueCookie);
Vue.use(VueLocalStorage);

sync(store, router);

let mediaHandler = () => {
    if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
        store.dispatch('toggleSidebar', true);
    } else {
        store.dispatch('toggleSidebar', false);
    }
};

router.beforeEach((to, from, next) => {
    store.commit('setLoading', true);
    next();
});

router.afterEach((to, from) => {
    mediaHandler();
    setTimeout(() => {
        "use strict";
        store.commit('setLoading', false);
    }, 200);
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});