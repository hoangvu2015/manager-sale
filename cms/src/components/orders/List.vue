<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <vuestic-widget headerText="List Orders">
          <bz-data-table :apiUrl="apiUrl"
          routeDetail="order"
          :tableFields="tableFields"
          :itemsPerPage="itemsPerPage"
          :sortFunctions="sortFunctions">
        </bz-data-table>
      </vuestic-widget>
    </div>
  </div>
</div>
</template>

<script>
import FieldsDef from './data/fields'
import ItemsPerPageDef from 'components/vuebz-components/bz-datatable/data/items-per-page-definition';
import * as UrlService from 'services/url';

export default {
  name: 'Order',
  data () {
    return {
      apiUrl: UrlService.API_ORDER,
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