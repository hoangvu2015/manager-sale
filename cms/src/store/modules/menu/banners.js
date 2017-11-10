import lazyLoading from './lazyLoading.js'

export default {
    name: 'Banners',
    meta: {
        expanded: false,
        title: 'Banners',
        iconClass: 'vuestic-icon vuestic-icon-ui-elements'
    },
    children: [
        {
            name: 'new_banner',
            path: '/banner/create',
            component: lazyLoading('banners/Detail'),
            meta: {
                title: 'New Banner'
            }
        }, {
            name: 'banners',
            path: '/banners',
            component: lazyLoading('banners/List'),
            meta: {
                title: 'List Banners'
            }
        },{
            name: 'banner',
            path: '/banner/:id',
            hidden: true,
            component: lazyLoading('banners/Detail'),
            meta: {
                title: 'Edit Banner'
            }
        }
    ]
}
