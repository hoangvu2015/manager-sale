<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <widget headerText="List Settings">
                    <data-table
                            :apiUrl="apiUrl"
                            routeDetail="setting"
                            :tableFields="tableFields"
                            :itemsPerPage="itemsPerPage"
                            :sortFunctions="sortFunctions"
                            :titleLabel="'key'">
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
        name: 'Setting',
        components: {
            DataTable,
            Widget
        },
        data () {
            return {
                apiUrl: UrlService.API_SETTING,
                itemsPerPage: ItemsPerPageDef.itemsPerPage,
                tableFields: FieldsDef.tableFields,
                sortFunctions: FieldsDef.sortFunctions
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
