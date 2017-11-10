<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <widget headerText="List Users">
                    <data-table :apiUrl="apiUrl"
                                routeDetail="user"
                                :tableFields="tableFields"
                                :itemsPerPage="itemsPerPage"
                                :sortFunctions="sortFunctions"
                                :cacheFilter="true"
                                :exportExcel="true"
                                :exportFields="tableFields"
                                exportFileName="users"
                    >
                    </data-table>
                </widget>
            </div>
        </div>
    </div>
</template>

<script>

    import Widget from 'components/vuestic-components/vuestic-widget/VuesticWidget'
    import DataTable from 'components/vuebz-components/bz-datatable/BzDataTable'
    import FieldsDef from './data/fields'
    import ItemsPerPageDef from 'components/vuebz-components/bz-datatable/data/items-per-page-definition';
    import * as UrlService from 'services/url';
    
    export default {
        name: 'User',
        components: {
            DataTable,
            Widget
        },
        data () {
            return {
                apiUrl: UrlService.API_USER,
                tableFields: FieldsDef.tableFields,
                itemsPerPage: ItemsPerPageDef.itemsPerPage,
                sortFunctions: FieldsDef.sortFunctions,
                // exportFields: {
                //     _id: 'ID',
                //     name: 'Name',
                //     email: 'Email',
                //     status: 'Trạng thái',
                //     createdAt: 'Ngày tạo'
                // }
            }
        }
    }
</script>

<style lang="scss">

    .color-icon-label-table {
        td:first-child {
            width: 1rem;
        }
    }
</style>
