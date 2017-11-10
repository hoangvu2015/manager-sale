import lazyLoading from './lazyLoading.js';

export default {
  name: 'Tests',
  hidden: false,
  meta: {
    expanded: false,
    title: 'Tests',
    iconClass: 'glyphicon glyphicon-file'
  },
  children: [
  {
    name: 'new_test',
    path: '/test/create',
    component: lazyLoading('tests/Detail'),
    meta: {
      title: 'New Test'
    }
  },
  {
    name: 'test_detail',
    hidden: true,
    path: '/test/:id',
    meta: {
      title: 'Edit Test'
    },
    component: lazyLoading('tests/Detail')
  },
  {
    name: 'tests',
    path: '/tests',
    component: lazyLoading('tests/List'),
    meta: {
      title: 'List Tests'
    }
  }
  ]
};
