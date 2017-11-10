import lazyLoading from './lazyLoading.js';

export default {
    name: 'Posts',
    meta: {
        expanded: false,
        title: 'Posts',
        iconClass: 'glyphicon glyphicon-book'
    },
    children: [
        {
            name: 'new_post',
            path: '/post/create',
            component: lazyLoading('posts/Detail'),
            meta: {
                title: 'New Post'
            }
        },
        {
            name: 'post_detail',
            path: '/post/:id',
            hidden: true,
            meta: {
                title: 'Edit Post'
            },
            component: lazyLoading('posts/Detail')
        },
        {
            name: 'posts',
            path: '/posts',
            component: lazyLoading('posts/List'),
            meta: {
                title: 'List Posts'
            }
        },
        {
            name: 'categories',
            path: '/categories',
            component: lazyLoading('category/List'),
            meta: {
                title: 'Category'
            }
        },
        {
            name: 'new_category',
            hidden: true,
            path: '/category/create',
            component: lazyLoading('category/Detail'),
            meta: {
                title: 'New Category'
            }
        },
        {
            name: 'category_detail',
            hidden: true,
            path: '/category/:id',
            meta: {
                title: 'Edit Category'
            },
            component: lazyLoading('category/Detail')
        }
    ]
};
