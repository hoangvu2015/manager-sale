webpackJsonp([7],{647:function(t,n,e){"use strict";function i(t){e(769)}Object.defineProperty(n,"__esModule",{value:!0});var a=e(771),r=e(773),s=e(1),l=i,o=s(a.a,r.a,!1,l,null,null);n.default=o.exports},651:function(t,n,e){"use strict";e.d(n,"i",function(){return i}),e.d(n,"a",function(){return a}),e.d(n,"c",function(){return r}),e.d(n,"b",function(){return s}),e.d(n,"d",function(){return l}),e.d(n,"h",function(){return o}),e.d(n,"g",function(){return c}),e.d(n,"l",function(){return u}),e.d(n,"j",function(){return d}),e.d(n,"e",function(){return m}),e.d(n,"f",function(){return f}),e.d(n,"k",function(){return w});var i=window.apiUrl+"/provinces",a=window.adminUrl+"/banner",r=window.adminUrl+"/contact",s=window.adminUrl+"/category",l=window.adminUrl+"/email-campaign",o=window.adminUrl+"/post",c=window.adminUrl+"/page",u=window.adminUrl+"/user",d=window.adminUrl+"/setting",m=window.apiUrl+"/sendmail2",f=window.apiUrl+"/email-campaign/send",w=window.adminUrl+"/test"},652:function(t,n,e){"use strict";n.a={itemsPerPage:[{value:5},{value:20},{value:50},{value:100}]}},769:function(t,n,e){var i=e(770);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);e(624)("2a92c3d5",i,!0)},770:function(t,n,e){n=t.exports=e(623)(!0),n.push([t.i,"\n.color-icon-label-table td:first-child {\n  width: 1rem;\n}\n","",{version:3,sources:["/Volumes/Data/Nodejs/bz-hapi-cms/cms/src/components/tests/List.vue"],names:[],mappings:";AACA;EACE,YAAY;CACb",file:"List.vue",sourcesContent:["\n.color-icon-label-table td:first-child {\n  width: 1rem;\n}\n"],sourceRoot:""}])},771:function(t,n,e){"use strict";var i=e(772),a=e(652),r=e(651);n.a={name:"Test",data:function(){return{apiUrl:r.k,tableFields:i.a.tableFields,itemsPerPage:a.a.itemsPerPage,sortFunctions:i.a.sortFunctions}}}},772:function(t,n,e){"use strict";n.a={tableFields:[{name:"__checkbox"},{name:"title",title:"Tiêu đề"},{name:"slug",title:"Slug"},{name:"num",title:"Số"},{name:"thumb",title:"Hình Thumb",callback:"image"},{name:"gallery",title:"Thư viện ảnh",callback:"gallery"},{name:"date",title:"Ngày",callback:"formatDate|D/MM/Y"},{name:"status",sortField:"status",callback:"status"},{name:"createdAt",title:"createdAt",callback:"formatDate|D/MM/Y"},"__slot:actions"],sortFunctions:{title:function(t,n){return t>=n?1:-1},status:function(t,n){return t>=n?1:-1}}}},773:function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-12"},[e("vuestic-widget",{attrs:{headerText:"List Tests"}},[e("bz-data-table",{attrs:{apiUrl:t.apiUrl,routeDetail:"test",tableFields:t.tableFields,itemsPerPage:t.itemsPerPage,sortFunctions:t.sortFunctions}})],1)],1)])])},a=[],r={render:i,staticRenderFns:a};n.a=r}});
//# sourceMappingURL=7.c8dba61c68b538223e1d.js.map