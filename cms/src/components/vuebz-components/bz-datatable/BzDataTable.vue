<template>
    <div class="table-responsive">
        <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>

        <div class="d-flex flex-md-row flex-column justify-content-md-between align-items-center">

            <filter-bar @filter="onFilterSet" v-model="moreParams.filter"></filter-bar>

            <vuestic-simple-select
                    label="Status"
                    name="status"
                    @input="doFilter"
                    v-model="statusFilter"
                    v-bind:options="yesNoOptions">
            </vuestic-simple-select>
            <vuestic-simple-select
                    v-if="isShowFeatureOption"
                    label="Is Feature"
                    name="feature"
                    @input="doFilter"
                    v-bind:options="featureOptions">
            </vuestic-simple-select>

            <slot name="bz:AdditionalFilter"></slot>

            <items-per-page :options="itemsPerPage"
                            :defaultPerPage="perPage"
                            @items-per-page="onItemsPerPage"></items-per-page>
            
            <div class="form-group with-icon-right dropdown select-form-group">
                <button class="btn btn-warning btn-micro" v-if="cacheFilter" @click.prevent="resetFilter">Reset</button>
                <button class="btn btn-info btn-micro" v-if="exportExcel" @click.prevent="doExport">Export</button>
            </div>
        </div>
        <div class="clear-fix"></div>


        <!-- TODO: Like what the name says, this place contains additional filter, add this template to the parent component :

            <template slot="bz:AdditionalFilter" >
                <div class="container">
                    <div>
                        -- filter1 here --
                    </div

                    <div>
                        -- filter2 here --
                    </div
                </div>
            </template>

         -->

        <div class="clear-fix"></div>
        <div class="d-flex flex-md-row flex-column justify-content-md-between align-items-center pull-left">
            <div class="col-md-12">
                <button class="btn btn-primary btn-micro" :disabled="!checkedItemIds.length" @click="publishItems">Publish Items</button>
                <button class="btn btn-warning btn-micro" :disabled="!checkedItemIds.length" @click="unpublishItems">Unpublish Items</button>
                <button class="btn btn-danger btn-micro" v-if="this.statusFilter.id != 2" :disabled="!checkedItemIds.length" @click="moveToTrash">Move To Trash</button>
                <button class="btn btn-danger btn-micro" v-if="this.statusFilter.id == 2" :disabled="!checkedItemIds.length" @click="deleteItems">Delete Permanent Items</button>
                <button class="btn btn-info btn-micro" v-if="createRouter" @click="gotoNew">Add new</button>
            </div>
        </div>
        <br/><br/><br/>
        <vuetable ref="vuetable"
                  :apiUrl="apiUrl"
                  :apiMode="apiMode"
                  :fields="tableFields"
                  :data="tableData"
                  :dataTotal="dataCount"
                  :dataManager="dataManager"
                  :css="css.table"
                  dataPath="data"
                  :paginationPath="paginationPath"
                  :appendParams="moreParams"
                  :perPage="perPage"
                  :httpOptions="httpOptions"
                  :trackBy="'_id'"
                  @vuetable:pagination-data="onPaginationData"
                  @vuetable:checkbox-toggled="onCheckboxChange"
                  @vuetable:checkbox-toggled-all="onAllCheckboxChange">

            <template slot="actions" scope="props">
                <div class="btn-group">
                    <button class="btn btn-primary btn-micro" @click="editRow(props)"><i class="fa fa-edit"></i> Edit</button>&nbsp;&nbsp;
                    <button class="btn btn-danger btn-micro" @click="deleteRow(props)"><i class="fa fa-remove"></i> Delete</button>&nbsp;&nbsp;
                </div>
            </template>

        </vuetable>

        <div class="justify-content-center mb-4">
            <vuetable-pagination ref="pagination"
                                 :css="css.pagination"
                                 :onEachSide="onEachSide"
                                 @vuetable-pagination:change-page="onChangePage">
            </vuetable-pagination>
        </div>
        <modal :show.sync="show" ref="confirmModal" @ok="confirmDeleteRow">
            <div slot="title">Confirm</div>
            <div> Do you want to remove this item?</div>
        </modal>
        <modal :show.sync="show" ref="confirmMoveToTrashItemsModal" @ok="confirmMoveToTrashItems">
            <div slot="title">Confirm</div>
            <div> Do you want to move to trash these {{checkedItems.length}} items?</div>
            <div>
                <u>
                    <li v-for="delit in checkedItems"> {{delit[titleLabel] || delit.key || delit.name || delit._id}} </li>
                </u>
            </div>
        </modal>
        <modal :show.sync="show" ref="confirmDeleteItemsModal" @ok="confirmDeleteItems">
            <div slot="title">Confirm</div>
            <div> Do you want to remove these {{checkedItems.length}} items?</div>
            <div>
                <u>
                    <li v-for="delit in checkedItems"> {{delit[titleLabel] || delit.key || delit.name || delit._id}} </li>
                </u>
            </div>
        </modal>
        <modal :show.sync="show" ref="confirmPublishItemsModal" @ok="confirmPublishItems">
            <div slot="title">Confirm</div>
            <div> Do you want to publish these {{checkedItems.length}} items?</div>
            <div>
                <u>
                    <li v-for="delit in checkedItems"> {{delit[titleLabel] || delit.key || delit.name || delit._id}}</li>
                </u>
            </div>
        </modal>
        <modal :show.sync="show" ref="confirmUnpublishItemsModal" @ok="confirmUnpublishItems">
            <div slot="title">Confirm</div>
            <div> Do you want to unpublish these {{checkedItems.length}} items?</div>
            <div>
                <u>
                    <li v-for="delit in checkedItems"> {{delit[titleLabel] || delit.key || delit.name || delit._id}}</li>
                </u>
            </div>
        </modal>
    </div>
</template>

<script>
    import stringify from 'json-stable-stringify';
    import Vue from 'Vue';
    import {mapGetters, mapActions} from 'vuex';
    import moment from 'moment';
    import Vuetable from 'vuetable-2/src/components/Vuetable'
    import VuetablePagination from 'vuetable-2/src/components/VuetablePagination'
    import FilterBar from './datatable-components/FilterBar.vue'
    import ItemsPerPage from './datatable-components/ItemsPerPage.vue'
    import LocalData from './data/local-data';
    import DataTableStyles from './data/data-table-styles'
    import Modal from 'components/vuestic-components/vuestic-modal/VuesticModal'
    import VuesticSimpleSelect from "components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect";
    import BzAlert from 'components/vuebz-components/BzAlert'

    const originalData = LocalData.data;

    export default {
        name: 'bz-data-table',
        components: {
            VuesticSimpleSelect,
            Modal,
            FilterBar,
            Vuetable,
            VuetablePagination,
            BzAlert,
            ItemsPerPage
        },
        watch: {
            isReloadTable(){
                Vue.nextTick(() => this.$refs.vuetable.refresh());
                this.$store.commit("setTableReload", false);
            },
            'moreParams': {
                handler(val, oldVal) {
                    if (stringify(val) != this.$localStorage.get(localStoragePrefix + this.$route.path)) {
                        this.$localStorage.set(localStoragePrefix + this.$route.path, stringify(val));
                        Vue.nextTick(() => this.$refs.vuetable.refresh());
                    }
                },
                deep: true
            }
        },
        computed: {
            ...mapGetters({
                isReloadTable: 'isReloadTable',
                alertMessage: 'alertMessage'
            })
        },
        props: {
            apiUrl: {
                type: String
            },
            routeDetail: {
                type: String
            },
            createRouter: {
                type: [String, Object],
                default: null
            },
            tableFields: {
                type: Array,
                required: true
            },
            itemsPerPage: {
                type: Array,
                required: true
            },
            onEachSide: {
                type: Number,
                default() {
                    return 2
                }
            },
            reloadTable: {
                type: Boolean,
                default() {
                    return false
                }
            },
            isShowFeatureOption: {
                type: Boolean,
                default() {
                    return false
                }
            },
            apiMode: {
                type: Boolean,
                default() {
                    return true
                }
            },
            data: {
                type: Array
            },
            httpOptions: {
                type: Object,
                default() {
                    return {
                        withCredentials: true
                    }
                }
            },
            sortFunctions: {
                type: Object
            },
            paginationPath: {
                type: String,
                default() {
                    return ''
                }
            },
            titleLabel: {
                type: String,
                default() {
                    return 'title'
                }
            },

            // For reset filter
            cacheFilter: {
                type: Boolean,
                default: true
            },

            // For export excel
            exportExcel: {
                type: Boolean,
                default: true
            },
            exportFileName: { 
                type: String,
                default() {
                    return 'data'
                }
            },

            // Format key:header (key of item and header show in excel)
            exportFields: { 
                type: [Object, Array],
                default() {
                    return {
                        "_id" : "ID"
                    }
                }
            }
        },
        data() {
            return {
                message: {
                    show: false,
                    title: "Success",
                    type: "success",
                    text: "test message"
                },
                yesNoOptions: [
                    {
                        id: '',
                        name: 'All'
                    },
                    {
                        id: 1,
                        name: 'Yes'
                    },
                    {
                        id: 0,
                        name: 'No'
                    }, {
                        id: 2,
                        name: 'Trash'
                    }
                ],
                featureOptions: [
                    {
                        id: '',
                        name: 'All'
                    },
                    {
                        id: 1,
                        name: 'Yes'
                    },
                    {
                        id: 0,
                        name: 'No'
                    }
                ],
                selectItem: {},
                show: true,
                tableData: LocalData,
                perPage: 10,
                colorClasses: {},
                moreParams: {},
                dataCount: 0,
                css: DataTableStyles,
                checkedItems: [],
                statusFilter: '',
                checkedItemIds: []
            }
        },
        methods: {
            doFilter(option, fieldName) {
                if (option && fieldName) {
                    let tmpMoreParams = this.moreParams;
                    let value = option;
                    if (typeof option == 'object') {
                        value = option.id;
                    }
                    if (value !== undefined && value !== "All" && value !== "" && value !== "*" && value !== null) {
                        tmpMoreParams[fieldName] = value;
                    } else {
                        delete tmpMoreParams[fieldName];
                    }
                    this.moreParams = {};
                    this.moreParams = tmpMoreParams;
                }
            },
            resetFilter() {
                this.statusFilter = ''
                this.moreParams = {
                    status: ''
                }
            },
            image(value) {
                if(value && value.substr(0, 1) == '/')
                    return `<img style="max-width: 100px" src="${window.webUrl}${value}">`;
                else
                    return `<img style="max-width: 100px" src="${window.webUrl}/${value}">`;
            },
            gallery(value) {
                let result = '';
                for (let k in value) {
                    if(value[k]){
                        if(value[k].substr(0, 1) == '/')
                            result += `<img style="max-width: 50px" src="${window.webUrl}${value[k]}">`;
                        else
                            result += `<img style="max-width: 50px" src="${window.webUrl}/${value[k]}">`;
                    }
                }
                return result;
            },
            formatDate(value, fmt) {
                if (value == null) {
                    return '';
                }
                fmt = (typeof fmt == 'undefined') ? 'D MMM YYYY' : fmt;
                return moment(value, 'YYYY-MM-DD').format(fmt)
            },
            feature(value) {
                return value ? "<span class='badge badge-pill badge-info'>Feature</span>" : "<span class='badge badge-pill badge-danger'>Not Feature</span>";
            },
            status(value) {
                switch (value) {
                    case 1:
                        return "<span class='badge badge-pill badge-info'>Publish</span>";
                        break;
                    case 2:
                        return "<span class='badge badge-pill badge-danger'>Trashed</span>";
                        break;
                    default:
                        return "<span class='badge badge-pill badge-warning'>Unpublish</span>";
                        break;
                }
            },
            editRow(props) {
                this.$store.dispatch("gotoDetail", {
                    "rowData": props.rowData,
                    "routeDetail": this.routeDetail
                })
            },
            deleteRow(props) {
                this.$refs.confirmModal.open();
                this.selectItem = props.rowData;
            },
            confirmDeleteRow() {
                this.$store.dispatch("moveToTrashItems", {
                        "rowData": [this.selectItem._id],
                        "apiUrl": this.apiUrl,
                        "status": this.selectItem.status
                    }
                );
                this.selectItem = [];
            },
            onFilterSet(filterText)
            {
                if (this.apiMode) {
                    let tmpMoreParams = this.moreParams;
                    if (filterText) {
                        tmpMoreParams.filter = filterText;
                    } else {
                        delete tmpMoreParams.filter;
                    }
                    this.moreParams = {};
                    this.moreParams = tmpMoreParams;
                } else {
                    const txt = new RegExp(filterText, 'i');
                    this.tableData.data = originalData.filter(function (item) {
                        return item.name.search(txt) >= 0 || item.email.search(txt) >= 0
                    })
                }
//                Vue.nextTick(() => this.$refs.vuetable.refresh())
            },
            onItemsPerPage(itemsPerPageValue)
            {
                this.perPage = itemsPerPageValue;
                Vue.nextTick(() => this.$refs.vuetable.refresh())
            },
            onPaginationData(paginationData)
            {
                let page = this.$route.query.page;
                if (page) {
//                    paginationData.current_page = parseInt(page);
                    this.$refs.vuetable.changePage(page);
                }
                this.$refs.pagination.setPaginationData(paginationData)
            },
            onChangePage(page)
            {
                this.$router.replace({query: {page: page}});
                this.$refs.vuetable.changePage(page);
            },
            dataManager(sortOrder, pagination)
            {
                let data = this.tableData.data;
                let sortFunctions = this.sortFunctions;

                if (sortOrder.length > 0) {
                    data.sort(function (item1, item2) {
                        const sortField = sortOrder[0].sortField;
                        let fn = sortFunctions[sortField];
                        if (fn) {
                            return fn(item1[sortField], item2[sortField])
                        }
                    });

                    if (sortOrder[0].direction === 'desc') {
                        data.reverse()
                    }
                }

                pagination = this.$refs.vuetable.makePagination(data.length)

                return {
                    pagination: pagination,
                    data: data.slice(pagination.from - 1, pagination.to)
                }
            },
            onCheckboxChange(isChecked, dataItem)
            {
                this.checkedItemIds = this.$refs.vuetable.selectedTo;
                let tableData = this.$refs.vuetable.tableData;
                let tmpCheckedItems = [];
                for (let i = 0; i < tableData.length; i++) {
                    if (this.checkedItemIds.indexOf(tableData[i]._id) >= 0) {
                        tmpCheckedItems.push(tableData[i]);
                    }
                }
                this.checkedItems = tmpCheckedItems;
            },
            onAllCheckboxChange(isChecked)
            {
                this.checkedItemIds = this.$refs.vuetable.selectedTo;
                if (isChecked) {
                    this.checkedItems = this.$refs.vuetable.tableData;
                } else {
                    this.checkedItems = [];
                }
            },
            deleteItems()
            {
                this.$refs.confirmDeleteItemsModal.open();
            },
            moveToTrash()
            {
                this.$refs.confirmMoveToTrashItemsModal.open();
            },
            confirmDeleteItems()
            {
                // delete all of this.checkedItems and this.checkedItemIds
                this.$store.dispatch("moveToTrashItems", {
                    "rowData": this.checkedItemIds,
                    "apiUrl": this.apiUrl,
                    "status": 2
                })

            },
            confirmMoveToTrashItems()
            {
                // delete all of this.checkedItems and this.checkedItemIds
                this.$store.dispatch("moveToTrashItems", {
                    "rowData": this.checkedItemIds,
                    "apiUrl": this.apiUrl
                })

            },
            publishItems()
            {
                this.$refs.confirmPublishItemsModal.open();
            },
            confirmPublishItems()
            {
                // publish all of this.checkedItems and this.checkedItemIds
                this.$store.dispatch("publishItems", {
                    "rowData": this.checkedItemIds,
                    "apiUrl": this.apiUrl
                });
            },
            unpublishItems()
            {
                this.$refs.confirmUnpublishItemsModal.open();
            },
            confirmUnpublishItems()
            {
                // unpublish all of this.checkedItems and this.checkedItemIds
                this.$store.dispatch("unPublishItems", {
                    "rowData": this.checkedItemIds,
                    "apiUrl": this.apiUrl
                });
            },
            doExport() {
                // let params = Object.defineProperty({}, 'per_page', {
                //   value: 0,
                //   writable: false
                // }); // target.foo is a read-only property

                this.$store.dispatch("exportExcel", {
                    vm: Object.assign({}, this),
                    apiUrl: this.$props.apiUrl,
                    fileName: this.$props.exportFileName + '.xls',
                    fields: Object.assign({}, this.$props.exportFields),
                    params: Object.assign({}, this.$refs.vuetable.getAllQueryParams(), { per_page: 0 })
                });
            },
            gotoNew(){
                if(this.createRouter){
                    this.$router.push(this.createRouter);
                }
            }
        },
        mounted() {
            if (this.$props.cacheFilter) {
                this.moreParams = Object.assign({}, JSON.parse(this.$localStorage.get(localStoragePrefix + this.$route.path)))
            }
        }
    }
</script>

<style lang="scss">
    @import "../../../sass/variables";

    @media (max-width: 1258px) {
        .pagination-link-btn:first-child, .pagination-link-btn:last-child {
            display: none;
        }

        .pagination-link-btn:nth-child(2) {
            border-top-left-radius: $btn-border-radius !important;
            border-bottom-left-radius: $btn-border-radius !important;
        }

        .pagination-link-btn:nth-last-child(2) {
            border-top-right-radius: $btn-border-radius !important;
            border-bottom-right-radius: $btn-border-radius !important;
        }
    }

    @media (max-width: 576px) {
        .hide-not-focused-btn:not(.focus) {
            display: none;
        }
    }
</style>
