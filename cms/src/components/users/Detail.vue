<template>
    <div class="form-elements">
        <div class="row">
            <div class="col-md-12">
                <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <bz-header routeList="users" @save="save"></bz-header>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <vuestic-widget headerText="User">
                    <form autocomplete="off">
                        <div class="row">
                            <div class="col-md-12">
                                <fieldset>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="input-name" v-validate="'required'" v-model="formData.name" name="name"/>
                                            <label class="control-label" for="input-name">Name</label><i class="bar"></i>
                                            <small v-show="errors.has('name')" class="help text-danger">
                                                {{ errors.first('name') }}
                                            </small>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="input-email" v-validate="'required|email'" v-model="formData.email" name="email"/>
                                            <label class="control-label" for="input-email">Email</label><i class="bar"></i>
                                            <small v-show="errors.has('email')" class="help text-danger">
                                                {{ errors.first('email') }}
                                            </small>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="password" id="input-password" v-model="formData.password" name="password" v-validate="{ rules: { required: false, min: 6 } }"/>
                                            <label class="control-label" for="input-password">Password</label>
                                            <i class="bar"></i>
                                            <small v-show="errors.has('password')" class="help text-danger">
                                                {{ errors.first('password') }}
                                            </small>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <input type="password" id="input-cfpassword" v-model="formData.cfpassword" name="password confirm" v-validate="{ rules: { required: formData.password ? true : false, min: 6, confirmed: 'password' } }"/>
                                            <label class="control-label" for="input-cfpassword">Confirm password</label>
                                            <i class="bar"></i>
                                            <small v-show="errors.has('password confirm')" class="help text-danger">
                                                {{ errors.first('password confirm') }}
                                            </small>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="input-phone" v-validate="{ rules: { required: true, regex: /^(\+84|0|84)\d{9,10}$/ } }" v-model="formData.phone" name="phone"/>
                                            <label class="control-label" for="input-phone">Phone</label><i class="bar"></i>
                                            <small v-show="errors.has('phone')" class="help text-danger">
                                                {{ errors.first('phone') }}
                                            </small>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="input-address" v-model="formData.address" name="address" v-validate="{ rules: { required: false } }"/>
                                            <label class="control-label" for="input-address">Address</label><i class="bar"></i>
                                            <small v-show="errors.has('address')" class="help text-danger">
                                                {{ errors.first('address') }}
                                            </small>
                                        </div>
                                    </div>

                                    <bz-select2 v-model="formData.province" name="province" :options="provinces" placeholder="Select a province" :required="false"></bz-select2>

                                    <bz-select2 v-model="formData.district" name="district" :options="districts" placeholder="Select a district" :required="false"></bz-select2>

                                    <!-- <pre>{{ errors }}</pre> -->
                                </fieldset>
                            </div>
                        </div>
                    </form>
                </vuestic-widget>
            </div>
            <div class="col-md-4">
                <vuestic-widget headerText="Extra">
                    <form>
                        <div class="row">
                            <div class="col-md-12">
                                <fieldset>
                                    <bz-select2 v-model="formData.status" name="status" :options="statusOptions" placeholder="Select a status" :required="true" @valid="valid" @invalid="invalid"></bz-select2>

                                    <vuestic-multi-select label='Select roles' v-model="formData.roles" :options="['user', 'admin']" :required="true" name="roles"></vuestic-multi-select>
                                </fieldset>
                            </div>
                        </div>
                    </form>
                </vuestic-widget>
            </div>

            <!-- <div class="col-md-4">
                <pre>{{ formData }}</pre>
                <pre>{{ districts }}</pre>
                <pre>{{ provinces }}</pre>
            </div> -->
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import VueFroala from 'vue-froala-wysiwyg'
    import VuesticSwitch from 'components/vuestic-components/vuestic-switch/VuesticSwitch'
    import VuesticSimpleSelect from 'components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect'
    import VuesticMultiSelect from 'components/vuestic-components/vuestic-multi-select/VuesticMultiSelect'
    import BzSelect2 from 'components/vuebz-components/BzSelect2'
    import BzHeader from 'components/vuebz-components/BzHeader'
    import BzAlert from 'components/vuebz-components/BzAlert'
    import {mapGetters, mapActions} from 'vuex'
    import * as UrlService from 'services/url'

    export default {
        name: 'form-elements',
        components: {
            VueFroala,
            VuesticSwitch,
            VuesticSimpleSelect,
            VuesticMultiSelect,
            BzSelect2,
            BzHeader,
            BzAlert
        },
        watch: {
            selectItem() {
                // Object.assign(this.formData, this.selectItem)
                // Object.assign(this.formData, ...sources)
                // this.formData = _.clone(this.selectItem)

                // Khắc phục tình trạng danh sách tỉnh chưa lấy được nhưng thông tin user được trả về trước → form không update select value khi chưa có options
                let count = 0
                let interval = setInterval(() => {
                    if (this.provinces.length && this.$route.params.id) {
                        // setTimeout(() => {
                            count++
                            Object.assign(this.formData, this.selectItem)
                            this.formData.password = String()
                            if (count == 2) clearInterval(interval)
                        // }, 500)

                        // setTimeout(() => {
                            // this.formData.district = this.selectItem.district
                        // }, 1000)
                    }
                }, 100)
            },
            $route() {
                let id = this.$route.params.id
                if (id === undefined) {
                    this.formData = {
                        status: Number(),
                        roles: Array(),
                        name: String(),
                        email: String(),
                        phone: String(),
                        address: String(),
                        district: String(),
                        province: String(),
                        password: String(),
                        cfpassword: String()
                    }
                } else {
                    this.$store.dispatch("getItemById", {
                        'id': id,
                        'apiUrl': UrlService.API_USER
                    })
                }
            },
            ['formData.province'](newV) {
                this.districts = Array();

                this.provinces.map((province, i) => {
                    if (newV == province._id) {
                        this.districts = province.districts
                    }
                })
            }
        },
        computed: {
            ...mapGetters({
                selectItem: 'selectItem',
                provinces: 'items',
                alertMessage: 'alertMessage'
            })
        },
        data() {
            return {
                statusOptions: [{ 
                    text: 'Publish', 
                    value: 1 
                }, { 
                    text: 'Unpublish', 
                    value: 0 
                }, { 
                    text: 'Trash', 
                    value: 2 
                }],
                firstTime: true,
                districts: Array(),
                formData: {
                    status: Number(),
                    roles: Array(),
                    name: String(),
                    email: String(),
                    phone: String(),
                    address: String(),
                    district: String(),
                    province: String(),
                    password: String(),
                    cfpassword: String()
                }
            }
        },
        methods: {
            // Validate BzSelect2 componenet
            valid(field, scope) {
                this.errors.remove(field, scope)
            },
            invalid(field, msg, rule, scope) {
                this.errors.add(field, msg, rule, scope)
            },
            // End validate BzSelect2 componenet
            
            // changeProvince(value, data) {
            //     this.districts = data.districts
            //     // this.formData.province = value
            //     // this.$set(this.formData, 'province', value)
            // },
            
            save(goList) {
                if (this.errors.errors.length == 0) {
                    this.$store.dispatch("saveItem", {
                        'id': this.$route.params.id,
                        'formData': this.formData,
                        'apiUrl': UrlService.API_USER,
                        'redirect': !goList ? false : {
                            action: 'goToList',
                            route: '/users'
                        }
                    })
                }
            }
        },
        created() {
            let id = this.$route.params.id
            if (id !== undefined) {
                this.$store.dispatch("getItemById", {
                    'id': this.$route.params.id,
                    'apiUrl': UrlService.API_USER
                })
            }

            this.$store.dispatch("getItems", {
                'apiUrl': UrlService.API_PROVINCE_WITH_DISTRICT,
                'params': {
                    example: 'example'
                }
            })
        },
        mounted() {
            this.$validator.validateAll()
        }
    }
</script>

<style lang="scss">
    .abc-checkbox, .abc-radio {
        display: flex !important;
        justify-content: flex-start;
    }

    input[type=checkbox]:disabled + label, input[type=radio]:disabled + label,
    input[type=checkbox]:disabled, input[type=radio]:disabled {
        cursor: not-allowed;
    }

    .non-padding-left {
        padding-left: 0px;
    }

    .fr-box.fr-basic.fr-top {
        margin-top: 20px;
    }

    .vuestic-switch .vuestic-switch-option.false-option.active {
        background: #ff0000;
        border-bottom: 0.125rem solid #ff0000;
    }

    .dropdown-item {
        text-transform: capitalize;
    }
</style>