<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <widget headerText="List Categories">
                    <data-table :apiUrl="apiUrl"
                                :create-router="{name: 'new_category'}"
                                routeDetail="category"
                                :tableFields="tableFields"
                                :itemsPerPage="itemsPerPage"
                                :sortFunctions="sortFunctions">
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
        name: 'Category',
        components: {
            DataTable,
            Widget
        },
        data () {
            return {
                apiUrl: UrlService.API_CATEGORY,
                tableFields: FieldsDef.tableFields,
                itemsPerPage: ItemsPerPageDef.itemsPerPage,
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
