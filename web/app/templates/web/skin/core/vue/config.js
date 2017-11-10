import Vue from 'vue';
import VueFB from './configs/_facebook';
import formInvalidMessages from './configs/_inValidMessage';

import VeeValidate, { Validator } from 'vee-validate';
import en from 'vee-validate/dist/locale/en';
import vi from 'vee-validate/dist/locale/vi';

// Add locale helper.
Validator.addLocale(vi);

// Install the Plugin and set the locale.
Vue.use(VeeValidate, {
  locale: 'vi'
});


Vue.use(VueFB, {
  appId: '1382283735152598',
  autoLogAppEvents: true,
  xfbml: true,
  version: 'v2.9'
});
