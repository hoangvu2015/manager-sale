import lazyLoading from './lazyLoading.js';

export default {
  name: '<%= modelName %>s',
  hidden: false,
  meta: {
    expanded: false,
    title: '<%= modelName %>s',
    iconClass: 'glyphicon glyphicon-file'
  },
  children: [
  {
    name: 'new_<%= moduleName %>',
    path: '/<%= moduleName %>/create',
    component: lazyLoading('<%= moduleName %>s/Detail'),
    meta: {
      title: 'New <%= modelName %>'
    }
  },
  {
    name: '<%= moduleName %>_detail',
    hidden: true,
    path: '/<%= moduleName %>/:id',
    meta: {
      title: 'Edit <%= modelName %>'
    },
    component: lazyLoading('<%= moduleName %>s/Detail')
  },
  {
    name: '<%= moduleName %>s',
    path: '/<%= moduleName %>s',
    component: lazyLoading('<%= moduleName %>s/List'),
    meta: {
      title: 'List <%= modelName %>s'
    }
  }
  ]
};
