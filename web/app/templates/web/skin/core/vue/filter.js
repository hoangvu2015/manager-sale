/*--- custom filter ---*/
import Vue from 'vue';
import formInvalidMessages from './configs/_inValidMessage';
const _ = require('lodash');

Vue.filter('showInvalidMsg', function (value, moreArgs) {
  if (_.isEmpty(value) || _.isEmpty(value.errors)) {
    return '';
  }

  value = value.errors;
  for (var i = 0; i < value.length; i++) {
    if (value[i].field == moreArgs) {
      if (formInvalidMessages[moreArgs][value[i].rule]) {
        return formInvalidMessages[moreArgs][value[i].rule];
      }
    }
  }

  return '';
});

Vue.customeConfig = {
  formInvalidMessages
};