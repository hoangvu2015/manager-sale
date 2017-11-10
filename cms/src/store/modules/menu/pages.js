import lazyLoading from './lazyLoading.js';

export default {
    name: 'Pages',
    hidden: false,
    meta: {
        expanded: false,
        title: 'Pages',
        iconClass: 'glyphicon glyphicon-file'
    },
    children: [
        {
            name: 'new_page',
            path: '/page/create',
            component: lazyLoading('pages/Detail'),
            meta: {
                title: 'New Page'
            }
        },
        {
            name: 'page_detail',
            hidden: true,
            path: '/page/:id',
            meta: {
                title: 'Edit Page'
            },
            component: lazyLoading('pages/Detail')
        },
        {
            name: 'pages',
            path: '/pages',
            component: lazyLoading('pages/List'),
            meta: {
                title: 'List Pages'
            }
        }
    ]
};
