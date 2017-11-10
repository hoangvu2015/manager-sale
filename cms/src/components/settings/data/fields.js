/**
 * Created by xuantu on 8/24/17.
 */

export default {
    tableFields: [
        {
            name: '__checkbox'
        },
        {
            name: 'key',
            sortField: 'key'
        },
        {
            name: 'value_type',
            title: 'Type',
            sortField: 'value_type'
        },
        {
            name: 'status',
            sortField: 'status',
            callback: 'status'
        },
        '__slot:actions'
    ],
    sortFunctions: {
        'key': function (item1, item2) {
            return item1 >= item2 ? 1 : -1;
        },
        'value_type': function (item1, item2) {
            return item1 >= item2 ? 1 : -1;
        }
    }
}