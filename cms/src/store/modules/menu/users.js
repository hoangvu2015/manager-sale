import lazyLoading from './lazyLoading.js'

export default {
    name: 'Users',
    meta: {
        expanded: false,
        title: 'Users',
        iconClass: 'fa fa-users'
    },
    children: [
        {
            name: 'new_user',
            path: '/user/create',
            component: lazyLoading('users/Detail'),
            meta: {
                title: 'New User'
            }
        },
        {
            name: 'user',
            path: '/user/:id',
            hidden: true,
            component: lazyLoading('users/Detail'),
            meta: {
                title: 'New User'
            }
        },
        {
            name: 'users',
            path: '/users',
            component: lazyLoading('users/List'),
            meta: {
                title: 'List Users'
            }
        }
    ]
}