webpackJsonp([9],{645:function(t,n,e){"use strict";function i(t){e(760)}Object.defineProperty(n,"__esModule",{value:!0});var a=e(762),r=e(764),s=e(1),o=i,l=s(a.a,r.a,!1,o,null,null);n.default=l.exports},651:function(t,n,e){"use strict";e.d(n,"i",function(){return i}),e.d(n,"a",function(){return a}),e.d(n,"c",function(){return r}),e.d(n,"b",function(){return s}),e.d(n,"d",function(){return o}),e.d(n,"h",function(){return l}),e.d(n,"g",function(){return u}),e.d(n,"l",function(){return c}),e.d(n,"j",function(){return d}),e.d(n,"e",function(){return f}),e.d(n,"f",function(){return m}),e.d(n,"k",function(){return w});var i=window.apiUrl+"/provinces",a=window.adminUrl+"/banner",r=window.adminUrl+"/contact",s=window.adminUrl+"/category",o=window.adminUrl+"/email-campaign",l=window.adminUrl+"/post",u=window.adminUrl+"/page",c=window.adminUrl+"/user",d=window.adminUrl+"/setting",f=window.apiUrl+"/sendmail2",m=window.apiUrl+"/email-campaign/send",w=window.adminUrl+"/test"},652:function(t,n,e){"use strict";n.a={itemsPerPage:[{value:5},{value:20},{value:50},{value:100}]}},760:function(t,n,e){var i=e(761);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(624)("3699a824",i,!0)},761:function(t,n,e){n=t.exports=e(623)(!0),n.push([t.i,"\n.color-icon-label-table td:first-child {\n  width: 1rem;\n}\n","",{version:3,sources:["/Volumes/Data/Nodejs/bz-hapi-cms/cms/src/components/settings/List.vue"],names:[],mappings:";AACA;EACE,YAAY;CACb",file:"List.vue",sourcesContent:["\n.color-icon-label-table td:first-child {\n  width: 1rem;\n}\n"],sourceRoot:""}])},762:function(t,n,e){"use strict";var i=e(52),a=e(80),r=e(763),s=e(652),o=e(651);n.a={name:"Setting",components:{DataTable:a.default,Widget:i.default},data:function(){return{apiUrl:o.j,itemsPerPage:s.a.itemsPerPage,tableFields:r.a.tableFields,sortFunctions:r.a.sortFunctions}}}},763:function(t,n,e){"use strict";n.a={tableFields:[{name:"__checkbox"},{name:"key",sortField:"key"},{name:"value_type",title:"Type",sortField:"value_type"},{name:"status",sortField:"status",callback:"status"},"__slot:actions"],sortFunctions:{key:function(t,n){return t>=n?1:-1},value_type:function(t,n){return t>=n?1:-1}}}},764:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("widget",{attrs:{headerText:"List Settings"}},[e("data-table",{attrs:{apiUrl:t.apiUrl,routeDetail:"setting",tableFields:t.tableFields,itemsPerPage:t.itemsPerPage,sortFunctions:t.sortFunctions,titleLabel:"key"}})],1)],1)])])},a=[],r={render:i,staticRenderFns:a};n.a=r}});
//# sourceMappingURL=9.e7fad1ae00916c9e3bb3.js.map