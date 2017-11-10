<template>
    <div class="form-elements">
        <div class="row">
            <div class="col-md-12">
                <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <bz-header routeList="categories" @save="save"></bz-header>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <vuestic-widget headerText="Create Category">
                    <form>
                        <div class="row">
                            <div class="col-md-12">
                                <fieldset>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="simple-input" @input="genaratorSlug(formData.name)" required v-model="formData.name"/>
                                            <label class="control-label" for="simple-input">Name</label><i class="bar"></i>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input  @change="genaratorSlug(formData.name)" id="simple-input" required v-model="formData.slug"/>
                                            <label class="control-label" for="simple-input">Slug</label><i class="bar"></i>
                                        </div>
                                    </div>
                                    
                                    <div class="form-group">
                                        <div class="input-group">
                                            <textarea type="text" id="simple-textarea" required v-model="formData.description"></textarea>
                                            <label class="control-label" for="simple-textarea">Description</label><i class="bar"></i>
                                        </div>
                                    </div>
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
                                    <div class="form-group">
                                        <div class="input-group">
                                            <select name="type" id="type"  v-model="formData.type">
                                                <option v-for="item in typeOptions" :key="item" :value="item">{{item}}</option>
                                            </select>
                                            <label class="control-label" for="type">Type</label><i class="bar"></i>
                                        </div>
                                    </div>
                                
                                    <vuestic-switch v-model="formData.status">
                                        <span slot="trueTitle">Publish</span>
                                        <span slot="falseTitle">Unpublish</span>
                                    </vuestic-switch>
                                </fieldset>
                            </div>
                        </div>
                    </form>
                </vuestic-widget>
            </div>
        </div>
    </div>
</template>

<script>
    import VuesticSwitch from 'components/vuestic-components/vuestic-switch/VuesticSwitch'
    import VuesticSimpleSelect from 'components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect'
    import VuesticMultiSelect from 'components/vuestic-components/vuestic-multi-select/VuesticMultiSelect'
    import BzHeader from 'components/vuebz-components/BzHeader'
    import BzAlert from 'components/vuebz-components/BzAlert'
    import * as UrlService from 'services/url';
    import {mapGetters, mapActions} from 'vuex';
	import {text2Slug} from 'filters';

    export default {
        name: 'form-elements',
        components: {
            VuesticSwitch,
            VuesticSimpleSelect,
            BzAlert,
            BzHeader
        },
        watch: {
            selectItem(){
                this.formData = this.selectItem;
            },
            $route(){
                let id = this.$route.params.id;
                if (id === undefined) {
                    this.formData = {};
                }
            }
        },
        computed: {
            ...mapGetters({
                selectItem: 'selectItem',
                alertMessage: 'alertMessage'
            })
        },
        data () {
            return {
                typeOptions: ['product', 'post'],
                formData: {
                    name: '',
                    slug: '',
                    type: 'post',
                    description: '',
                    status: true
                }
            }
        },
        methods: {
            save(thenBackToList) {
                this.$store.dispatch("saveItem", {
                    'id': this.$route.params.id,
                    'formData': this.formData,
                    'apiUrl': UrlService.API_CATEGORY,
                    'redirect': thenBackToList ? {
                        route: '/categories'
                    } : null
                });
            },
            genaratorSlug: function (text) {
				this.formData.slug = text2Slug(text);
			}
        },
        created () {
            let id = this.$route.params.id;
            if (id !== undefined) {
                this.$store.dispatch("getItemById", {
                    'id': this.$route.params.id,
                    'apiUrl': UrlService.API_CATEGORY
                });
            }
        },
        mounted(){
            this.$validator.validateAll();
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
</style>