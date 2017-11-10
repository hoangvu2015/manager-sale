<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <widget headerText="List Posts">
          <data-table
            :apiUrl="apiUrl"
            routeDetail="email-campaign"
            :tableFields="tableFields"
            :itemsPerPage="itemsPerPage"
            :sortFunctions="sortFunctions"
            :isShowFeatureOption="isShowFeatureOption"
            :cacheFilter="true"
            :exportExcel="true"
            :exportFields="tableFields"
            exportFileName="email-campaigns"
            ref="vuesticTable">

            <!-- <template slot="bz:AdditionalFilter" scope="props">
              <vuestic-simple-select
                label="Category"
                name="category"
                @input="doFilter"
                v-bind:options="categoryOptions"
                v-show="categoryOptions.length">
              </vuestic-simple-select>
            </template> -->
          </data-table>
        </widget>
      </div>
    </div>
  </div>
</template>

<script>
	import Vue from 'vue'
	import Widget from 'components/vuestic-components/vuestic-widget/VuesticWidget'
	import DataTable from 'components/vuebz-components/bz-datatable/BzDataTable'
	import FieldsDef from './data/fields'
	import ItemsPerPageDef from 'components/vuebz-components/bz-datatable/data/items-per-page-definition';
	import VuesticSimpleSelect from "components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect";
	import * as UrlService from 'services/url';
	import {mapGetters, mapActions} from 'vuex';

	export default {
		components: {
			DataTable,
			Widget,
			VuesticSimpleSelect
		},
		name: 'email-campaigns',
		watch: {
			categoryItems() {
				this.categoryOptions = this.categoryItems;
			}
		},
		computed: {
			...mapGetters({
				categoryItems: 'categoryItems',
			})
		},
		data() {
			return {
				apiUrl: UrlService.API_EMAIL_CAMPAIGN,
				tableFields: FieldsDef.tableFields,
				itemsPerPage: ItemsPerPageDef.itemsPerPage,
				isShowFeatureOption: false,
				sortFunctions: FieldsDef.sortFunctions,
				categoryOptions: []
			}
		},
		methods: {
			doFilter(option, fieldName) {
				this.$refs.vuesticTable.doFilter(option, fieldName);
			}
		},
		created() {
			this.$store.dispatch("getCategoryItems");
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
