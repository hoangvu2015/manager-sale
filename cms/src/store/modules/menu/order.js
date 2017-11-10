import lazyLoading from './lazyLoading.js';

export default {
  name: 'Orders',
  hidden: false,
  meta: {
    expanded: false,
    title: 'Orders',
    iconClass: 'glyphicon glyphicon-file'
  },
  children: [
  {
    name: 'new_order',
    path: '/order/create',
    component: lazyLoading('orders/Detail'),
    meta: {
      title: 'New Order'
    }
  },
  {
    name: 'order_detail',
    hidden: true,
    path: '/order/:id',
    meta: {
      title: 'Edit Order'
    },
    component: lazyLoading('orders/Detail')
  },
  {
    name: 'orders',
    path: '/orders',
    component: lazyLoading('orders/List'),
    meta: {
      title: 'List Orders'
    }
  }
  ]
};
