/**
 * Created by xuantu on 8/29/17.
 */
import lazyLoading from './lazyLoading.js'

export default {
    name: 'Settings',
    meta: {
        expanded: false,
        title: 'Settings',
        iconClass: 'fa fa fa-gears'
    },
    children: [
        {
            name: 'new_setting',
            path: '/setting/create',
            component: lazyLoading('settings/Detail'),
            meta: {
                title: 'New Setting'
            }
        },
        {
            name: 'settings',
            path: '/settings',
            component: lazyLoading('settings/List'),
            meta: {
                title: 'List Settings'
            }
        },
        {
            name: 'setting_detail',
            hidden: true,
            path: '/setting/:id',
            meta: {
                title: 'Edit Setting'
            },
            component: lazyLoading('settings/Detail')
        }
    ]
}