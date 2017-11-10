/**
 * Created by xuantu on 8/24/17.
 */

export default {
    tableFields: [
        {
            name: '__checkbox'
        },
        {
            name: 'title',
            sortField: 'title'
        },
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
        'name': function (item1, item2) {
            return item1 >= item2 ? 1 : -1;
        },
        'status': function (item1, item2) {
            return item1 >= item2 ? 1 : -1;
        }
    }
}