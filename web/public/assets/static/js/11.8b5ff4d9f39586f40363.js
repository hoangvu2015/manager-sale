webpackJsonp([11],{763:function(t,a,e){e(839);var s=e(1)(e(803),e(860),null,null);t.exports=s.exports},783:function(t,a,e){"use strict";var s=e(97),i=e.n(s),o=function(t){t.status?t.status=1:t.status=0;var a=t.id;return void 0!==a?i.a.post(window.apiUrl+"/setting/"+a,t,{withCredentials:!0}).then(function(t){return t}):i.a.post(window.apiUrl+"/setting",t,{withCredentials:!0}).then(function(t){return t})},n=function(t){return i.a.get(window.apiUrl+"/setting/"+t,{withCredentials:!0}).then(function(t){if(200==t.status)return t.data})},r=function(t){return i.a.delete(window.apiUrl+"/setting/"+t,{withCredentials:!0}).then(function(t){return 200==t.status})};a.a={save:o,findById:n,deleteItem:r}},803:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e(103),i=e.n(s),o=e(100),n=e.n(o),r=e(99),l=e.n(r),c=e(104),u=e.n(c),d=e(783);a.default={name:"form-elements",components:{VueFroala:i.a,VuesticSwitch:n.a,VuesticSimpleSelect:l.a,VuesticAlert:u.a},watch:{$route:function(){void 0===this.$route.params.id&&(this.formData.key="",this.formData.value="",this.formData.value_type="string",this.formData.description="",this.formData.status=!0)}},computed:{},data:function(){return{typeOptions:["string","image","textarea","calendar","editor","json"],formData:{key:"",value:"",value_type:"string",description:"",status:!0},message:{show:!1,title:"",type:"success",text:""}}},methods:{save:function(){var t=this,a=this.$route.params.id,e=this.formData;e.id=a,d.a.save(e).then(function(a){var e={};200==a.status?(t.$router.push("/setting/"+a.data._id),e={show:!0,type:"success",title:"Success",text:"Save setting successful"}):e={show:!0,type:"danger",title:"Error",text:"Something wrong!"},t.message=e})},cancel:function(){this.$router.push("/settings")}},mounted:function(){var t=this,a=this.$route.params.id;a&&d.a.findById(a).then(function(a){t.formData.key=a.key,t.formData.value=a.value,t.formData.value_type=a.value_type,t.formData.description=a.description,t.formData.status=!!a.status}),this.$validator.validateAll()}}},818:function(t,a,e){a=t.exports=e(747)(),a.push([t.i,"\n.abc-checkbox, .abc-radio {\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\ninput[type=checkbox]:disabled + label, input[type=radio]:disabled + label,\ninput[type=checkbox]:disabled, input[type=radio]:disabled {\n  cursor: not-allowed;\n}\n.non-padding-left {\n  padding-left: 0px;\n}\n.fr-box.fr-basic.fr-top {\n  margin-top: 20px;\n}\n.vuestic-switch .vuestic-switch-option.false-option.active {\n  background: #ff0000;\n  border-bottom: 0.125rem solid #ff0000;\n}\n.dropdown-item {\n  text-transform: capitalize;\n}\n","",{version:3,sources:["/Volumes/Data/Nodejs/bz-hapi-cms/cms/src/components/settings/Detail.vue"],names:[],mappings:";AACA;EACE,gCAAgC;EAChC,yBAAyB;EACzB,qBAAqB;MACjB,4BAA4B;CACjC;AACD;;EAEE,oBAAoB;CACrB;AACD;EACE,kBAAkB;CACnB;AACD;EACE,iBAAiB;CAClB;AACD;EACE,oBAAoB;EACpB,sCAAsC;CACvC;AACD;EACE,2BAA2B;CAC5B",file:"Detail.vue",sourcesContent:["\n.abc-checkbox, .abc-radio {\n  display: -ms-flexbox !important;\n  display: flex !important;\n  -ms-flex-pack: start;\n      justify-content: flex-start;\n}\ninput[type=checkbox]:disabled + label, input[type=radio]:disabled + label,\ninput[type=checkbox]:disabled, input[type=radio]:disabled {\n  cursor: not-allowed;\n}\n.non-padding-left {\n  padding-left: 0px;\n}\n.fr-box.fr-basic.fr-top {\n  margin-top: 20px;\n}\n.vuestic-switch .vuestic-switch-option.false-option.active {\n  background: #ff0000;\n  border-bottom: 0.125rem solid #ff0000;\n}\n.dropdown-item {\n  text-transform: capitalize;\n}\n"],sourceRoot:""}])},839:function(t,a,e){var s=e(818);"string"==typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);e(748)("7e35010d",s,!0)},860:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"form-elements"},[t.message.show?e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("vuestic-alert",{attrs:{type:t.message.type,withCloseBtn:!0}},[e("span",{staticClass:"badge badge-pill badge-success"},[t._v(t._s(t.message.title))]),t._v("\n                "+t._s(t.message.text)+"\n                "),e("i",{staticClass:"fa fa-close alert-close"})])],1)]):t._e(),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-sm-12"},[e("vuestic-widget",{staticClass:" color-buttons",attrs:{headerText:""}},[e("div",{staticClass:"row"},[e("div",{staticClass:".col-md-1"},[e("button",{staticClass:"btn btn-secondary focus btn-micro"},[e("div",{staticClass:"btn-with-icon-content"},[e("i",{staticClass:"glyphicon glyphicon-floppy-disk"}),t._v(" Save & List")])])]),t._v("\n                       \n                    "),e("div",{staticClass:".col-md-1"},[e("button",{staticClass:"btn btn-secondary focus btn-micro",on:{click:t.save}},[e("div",{staticClass:"btn-with-icon-content"},[e("i",{staticClass:"glyphicon glyphicon-floppy-disk"}),t._v(" Save")])])]),t._v("\n                       \n                    "),e("div",{staticClass:".col-md-1"},[e("button",{staticClass:"btn btn-secondary focus btn-micro",on:{click:t.cancel}},[e("div",{staticClass:"btn-with-icon-content"},[e("i",{staticClass:"glyphicon glyphicon-arrow-left"}),t._v(" Cancel")])])])])])],1)]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-8"},[e("vuestic-widget",{attrs:{headerText:"Edit Setting"}},[e("form",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("fieldset",[e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.key,expression:"formData.key"}],attrs:{id:"simple-input",required:""},domProps:{value:t.formData.key},on:{input:function(a){a.target.composing||(t.formData.key=a.target.value)}}}),t._v(" "),e("label",{staticClass:"control-label",attrs:{for:"simple-input"}},[t._v("Key")]),e("i",{staticClass:"bar"})])]),t._v(" "),e("vuestic-simple-select",{attrs:{label:"Type",options:t.typeOptions},model:{value:t.formData.value_type,callback:function(a){t.formData.value_type=a},expression:"formData.value_type"}}),t._v(" "),"string"==t.formData.value_type?e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.value,expression:"formData.value"}],attrs:{id:"simple-input",required:""},domProps:{value:t.formData.value},on:{input:function(a){a.target.composing||(t.formData.value=a.target.value)}}}),t._v(" "),e("label",{staticClass:"control-label",attrs:{for:"simple-input"}},[t._v("Value")]),e("i",{staticClass:"bar"})])]):"textarea"==t.formData.value_type?e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.formData.value,expression:"formData.value"}],attrs:{type:"text",rows:"10",id:"simple-textarea",required:""},domProps:{value:t.formData.value},on:{input:function(a){a.target.composing||(t.formData.value=a.target.value)}}}),t._v(" "),e("label",{staticClass:"control-label",attrs:{for:"simple-textarea"}},[t._v("Value")]),e("i",{staticClass:"bar"})])]):"editor"==t.formData.value_type?e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group"},[e("froala",{attrs:{tag:"textarea"},model:{value:t.formData.value,callback:function(a){t.formData.value=a},expression:"formData.value"}}),t._v(" "),e("label",{staticClass:"control-label",attrs:{for:"simple-textarea"}},[t._v("Value")]),e("i",{staticClass:"bar"})],1)]):t._e(),t._v(" "),e("div",{staticClass:"form-group"},[e("div",{staticClass:"input-group"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.formData.description,expression:"formData.description"}],attrs:{type:"text",id:"description",required:""},domProps:{value:t.formData.description},on:{input:function(a){a.target.composing||(t.formData.description=a.target.value)}}}),t._v(" "),e("label",{staticClass:"control-label",attrs:{for:"description"}},[t._v("Description")]),e("i",{staticClass:"bar"})])])],1)])])])])],1),t._v(" "),e("div",{staticClass:"col-md-4"},[e("vuestic-widget",{attrs:{headerText:"Extra"}},[e("form",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("fieldset",[e("vuestic-switch",{model:{value:t.formData.status,callback:function(a){t.formData.status=a},expression:"formData.status"}},[e("span",{slot:"trueTitle"},[t._v("Publish")]),t._v(" "),e("span",{slot:"falseTitle"},[t._v("Unpublish")])])],1)])])])])],1)])])},staticRenderFns:[]}}});
//# sourceMappingURL=11.8b5ff4d9f39586f40363.js.map