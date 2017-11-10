export default {
  tableFields: [
  {
    name: '__checkbox'
  },<% for (key in formInfo) { %>
  <% if (formInfo[key].list) { %><% if (formInfo[key].type == 'text' || formInfo[key].type == 'number' || formInfo[key].type == 'ckeditor') { %>
  {
    name: '<%= key%>',
    title: '<%= formInfo[key].label %>'
  },<% } -%><% if (formInfo[key].type == 'date') { %>
  {
    name: '<%= key%>',
    title: '<%= formInfo[key].label %>',
    callback: 'formatDate|D/MM/Y'
  },<% } -%><% if (formInfo[key].type == 'image') { %>
  {
    name: '<%= key%>',
    title: '<%= formInfo[key].label %>',
    callback: 'image'
  },<% } -%><% if (formInfo[key].type == 'images') { %>
  {
    name: '<%= key%>',
    title: '<%= formInfo[key].label %>',
    callback: 'gallery'
  },<% } -%>
  <% } -%>
  <% } -%>
  
  {
    name: 'status',
    sortField: 'status',
    callback: 'status',
  },
  {
    name: 'createdAt',
    title: 'createdAt',
    callback: 'formatDate|D/MM/Y'
  },
  '__slot:actions'
  ],
  sortFunctions: {
    'title': function (item1, item2) {
      return item1 >= item2 ? 1 : -1;
    },
    'status': function (item1, item2) {
      return item1 >= item2 ? 1 : -1;
    }
  }
}
