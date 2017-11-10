<template>
    <div class="form-elements">
        <div class="row">
            <div class="col-md-12">
                <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <bz-header routeList="pages" @save="save"></bz-header>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <vuestic-widget headerText="Create Page">
                    <form>
                        <div class="row">
                            <div class="col-md-12">
                                <fieldset>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="title-input" required v-model="formData.title" v-validate="'required'" name="title"/>
                                            <label class="control-label" for="title-input">Title</label><i class="bar"></i>
                                            <small v-show="errors.has('title')" class="help text-danger">
                                                {{ errors.first('title') }}
                                            </small>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="slug-input" required v-model="formData.slug" v-validate="'required'" name="slug"/>
                                            <label class="control-label" for="slug-input">Slug</label><i class="bar"></i>
                                            <small v-show="errors.has('slug')" class="help text-danger">
                                                {{ errors.first('slug') }}
                                            </small>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="identity-input" required v-model="formData.identity" v-validate="'required'" name="identity"/>
                                            <label class="control-label" for="identity-input">Identity</label><i class="bar"></i>
                                            <small v-show="errors.has('identity')" class="help text-danger">
                                                {{ errors.first('identity') }}
                                            </small>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <froala :tag="'textarea'" id="body-textarea"
                                                    v-model="formData.content"></froala>
                                            <label class="control-label" for="body-textarea">Body</label><i class="bar"></i>
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
                                    <vuestic-switch v-model="formData.status">
                                        <span slot="trueTitle">Publish</span>
                                        <span slot="falseTitle">Unpublish</span>
                                    </vuestic-switch>
                                </fieldset>
                            </div>
                        </div>
                    </form>
                </vuestic-widget>
                <vuestic-widget headerText="Meta">
                    <form>
                        <div class="row">
                            <div class="col-md-12">
                                <fieldset>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="meta-title-input" required/>
                                            <label class="control-label" for="meta-title-input">Meta Title</label><i
                                                class="bar"></i>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="meta-description-input" required/>
                                            <label class="control-label"
                                                   for="meta-description-input">Meta Description</label><i
                                                class="bar"></i>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <textarea type="text" id="meta-keyword-textarea" required></textarea>
                                            <label class="control-label"
                                                   for="meta-keyword-textarea">Meta Keyword</label><i class="bar"></i>
                                        </div>
                                    </div>
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
    import VueFroala from 'vue-froala-wysiwyg';
    import VuesticSwitch from 'components/vuestic-components/vuestic-switch/VuesticSwitch'
    import VuesticSimpleSelect from 'components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect'
    import VuesticMultiSelect from 'components/vuestic-components/vuestic-multi-select/VuesticMultiSelect'
    import BzHeader from 'components/vuebz-components/BzHeader'
    import BzAlert from 'components/vuebz-components/BzAlert'
    import * as UrlService from 'services/url';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Page',
        components: {
            VueFroala,
            VuesticSwitch,
            VuesticSimpleSelect,
            VuesticMultiSelect,
            BzHeader,
            BzAlert
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
        data() {
            return {
                formData: {
                    title: '',
                    slug: '',
                    identity: '',
                    teaser: '',
                    content: '',
                    status: true
                }
            }
        },
        methods: {
            save() {
                this.$validator.validateAll()
                    .then(res => {
                        if (res) {
                            this.$store.dispatch("saveItem", {
                                'id': this.$route.params.id,
                                'formData': this.formData,
                                'apiUrl': UrlService.API_PAGE
                            });
                        }
                    });
            }
        },
        created () {
            let id = this.$route.params.id;
            if (id !== undefined) {
                this.$store.dispatch("getItemById", {
                    'id': this.$route.params.id,
                    'apiUrl': UrlService.API_PAGE
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