webpackJsonp([11],{641:function(t,n,e){"use strict";function i(t){e(734)}Object.defineProperty(n,"__esModule",{value:!0});var a=e(736),r=e(738),s=e(1),o=i,c=s(a.a,r.a,!1,o,null,null);n.default=c.exports},651:function(t,n,e){"use strict";e.d(n,"i",function(){return i}),e.d(n,"a",function(){return a}),e.d(n,"c",function(){return r}),e.d(n,"b",function(){return s}),e.d(n,"d",function(){return o}),e.d(n,"h",function(){return c}),e.d(n,"g",function(){return l}),e.d(n,"l",function(){return u}),e.d(n,"j",function(){return d}),e.d(n,"e",function(){return m}),e.d(n,"f",function(){return f}),e.d(n,"k",function(){return w});var i=window.apiUrl+"/provinces",a=window.adminUrl+"/banner",r=window.adminUrl+"/contact",s=window.adminUrl+"/category",o=window.adminUrl+"/email-campaign",c=window.adminUrl+"/post",l=window.adminUrl+"/page",u=window.adminUrl+"/user",d=window.adminUrl+"/setting",m=window.apiUrl+"/sendmail2",f=window.apiUrl+"/email-campaign/send",w=window.adminUrl+"/test"},652:function(t,n,e){"use strict";n.a={itemsPerPage:[{value:5},{value:20},{value:50},{value:100}]}},734:function(t,n,e){var i=e(735);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(624)("7b6a72b5",i,!0)},735:function(t,n,e){n=t.exports=e(623)(!0),n.push([t.i,"\n.color-icon-label-table td:first-child {\n  width: 1rem;\n}\n","",{version:3,sources:["/Volumes/Data/Nodejs/bz-hapi-cms/cms/src/components/pages/List.vue"],names:[],mappings:";AACA;EACE,YAAY;CACb",file:"List.vue",sourcesContent:["\n.color-icon-label-table td:first-child {\n  width: 1rem;\n}\n"],sourceRoot:""}])},736:function(t,n,e){"use strict";var i=e(52),a=e(80),r=e(737),s=e(652),o=e(651);n.a={name:"Page",components:{DataTable:a.default,Widget:i.default},data:function(){return{apiUrl:o.g,tableFields:r.a.tableFields,itemsPerPage:s.a.itemsPerPage,sortFunctions:r.a.sortFunctions}}}},737:function(t,n,e){"use strict";n.a={tableFields:[{name:"__checkbox"},{name:"title",sortField:"title"},{name:"status",sortField:"status",callback:"status"},{name:"createdAt",title:"createdAt",callback:"formatDate|D/MM/Y"},"__slot:actions"],sortFunctions:{name:function(t,n){return t>=n?1:-1},status:function(t,n){return t>=n?1:-1}}}},738:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("widget",{attrs:{headerText:"List Page"}},[e("data-table",{attrs:{apiUrl:t.apiUrl,routeDetail:"page",tableFields:t.tableFields,itemsPerPage:t.itemsPerPage,sortFunctions:t.sortFunctions}})],1)],1)])])},a=[],r={render:i,staticRenderFns:a};n.a=r}});
//# sourceMappingURL=11.526fbfe5107d322d3f4f.js.map