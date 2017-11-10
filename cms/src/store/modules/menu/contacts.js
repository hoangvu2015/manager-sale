import lazyLoading from './lazyLoading.js'

export default {
    name: 'Contacts',
    meta: {
        expanded: false,
        title: 'Contacts',
        iconClass: 'fa fa-id-card'
    },
    children: [
        {
            name: 'new_contact',
            path: '/contact/create',
            component: lazyLoading('contacts/Detail'),
            meta: {
                title: 'New Contact'
            }
        },
        {
            name: 'edit_contact',
            path: '/contact/:id',
            hidden: true,
            component: lazyLoading('contacts/Detail'),
            meta: {
                title: 'New Contact'
            }
        },
        {
            name: 'contacts',
            path: '/contacts',
            component: lazyLoading('contacts/List'),
            meta: {
                title: 'List Contacts'
            }
        }
    ]
}