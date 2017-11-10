<template>
    <div class="form-elements">
        <div class="row">
            <div class="col-md-12">
                <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <bz-header routeList="settings" @save="save"></bz-header>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <vuestic-widget headerText="Edit Setting">
                    <form>
                        <div class="row">
                            <div class="col-md-12">
                                <fieldset>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="simple-input" required v-validate="'required'" v-model="formData.key" name="key"/>
                                            <label class="control-label" for="simple-input">Key</label><i class="bar"></i>
                                            <small v-show="errors.has('key')" class="help text-danger">
                                                {{ errors.first('key') }}
                                            </small>
                                        </div>
                                    </div>

                                     <div class="form-group">
                                        <div class="input-group">
                                             <select name="type_value" v-model="formData.value_type" id="value_type">
                                                <option v-for="item in typeOptions" :value="item">{{item}}</option>
                                            </select>
                                            <label class="control-label" for="simple-input">Value:</label><i class="bar"></i>
                                        </div>
                                    </div>

                                    <div class="form-group" v-if="formData.value_type=='string'">
                                        <div class="input-group">
                                            <input id="simple-input" required v-validate="'required'" v-model="formData.value" name="value"/>
                                            <label class="control-label" for="simple-input">Value:</label><i class="bar"></i>
                                            <small v-show="errors.has('value')" class="help text-danger">
                                                {{ errors.first('value') }}
                                            </small>
                                        </div>
                                    </div>

                                    <div class="form-group" v-else-if="formData.value_type=='textarea'">
                                        <div class="input-group">
                                            <textarea type="text" rows="10" id="simple-textarea" required v-model="formData.value"></textarea>
                                            <label class="control-label" for="simple-textarea">Value:</label><i class="bar"></i>
                                        </div>
                                    </div>

                                    <div class="form-group"  v-else-if="formData.value_type=='json'">
                                        <div class="input-group">
                                            <vue-json-editor :showBtns="false" v-model="formData.value" @json-change="onJsonChange"></vue-json-editor>
                                            <label class="control-label" for="description">JSON Value:</label><i class="bar"></i>
                                        </div>
                                    </div>

                                    <div class="form-group" v-else-if="formData.value_type=='editor'">
                                        <div class="input-group">
                                            <froala :tag="'textarea'" v-model="formData.value"></froala>
                                            <label class="control-label" for="simple-textarea">Value</label><i class="bar"></i>
                                        </div>
                                    </div>

                                    <div class="form-group" v-else-if="formData.value_type=='image'">
                                        <div class="input-group">
                                            <bz-single-image-cropper :imgUrl="initValue" label="Image" :cropRatio="'1:1'" :inputAccept="'image/*'" :maxFileSize="5242880" @bz:imageuploaded="onImageUploaded" ref="bzCropper">
                                            </bz-single-image-cropper>
                                        </div>
                                    </div>
                                    

                                    <div class="form-group" v-else-if="formData.value_type=='calendar'">
                                        <div class="input-group">
                                            <bz-datetime-picker type="min" v-model="formData.value" :init-value="initValue"></bz-datetime-picker>
                                            <i class="bar"></i>
                                        </div>
                                    </div>

                                    <div class="form-group" v-else-if="formData.value_type=='multi-day'">
                                        <div class="input-group">
                                            <bz-datetime-picker type="multi-day" v-model="formData.value" :init-value="initValue"></bz-datetime-picker>
                                            <i class="bar"></i>
                                        </div>
                                    </div>



                                    <div class="form-group">
                                        <div class="input-group">
                                            <textarea type="text" id="description" required v-model="formData.description"></textarea>
                                            <label class="control-label" for="description">Description</label><i class="bar"></i>
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
            </div>
        </div>
    </div>
</template>

<script>
    import VueFroala from 'vue-froala-wysiwyg';
    import VuesticSwitch from 'components/vuestic-components/vuestic-switch/VuesticSwitch'
    import VuesticSimpleSelect from 'components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect'
    import BzHeader from 'components/vuebz-components/BzHeader'
    import BzAlert from 'components/vuebz-components/BzAlert'
    import {mapGetters, mapActions} from 'vuex';
    import * as UrlService from 'services/url';
    import vueJsonEditor from 'vue-json-editor';

    import BzSingleImageCropper from 'components/vuebz-components/form/BzSingleImageCropper';
    import bzDatetimePicker from 'components/vuebz-components/form/bzDatetimePicker';
    import { bzDatetime } from 'filters';

    export default {
        name: 'form-elements',
        components: {
            VueFroala,
            VuesticSwitch,
            VuesticSimpleSelect,
            BzHeader,
            BzAlert,
            vueJsonEditor,
            BzSingleImageCropper,
            bzDatetimePicker,
        },
        watch: {
            selectItem(newVal){
                this.formData = this.selectItem;
                this.initValue = this.formData.value
            },
            $route(){
                let id = this.$route.params.id;
                if (id === undefined) {
                    this.formData = {};
                }
            },
            'formData.value_type': function(newVal){
                this.formData.value = '';
                if(newVal == 'json'){
                    this.formData.value = {};
                }
            },
            'formData.value': function(newVal){
                console.log('update: ', newVal)
            },
            'initValue': function(newVal){
                console.log('updated: ', newVal)
            },
        },
        computed: {
            ...mapGetters({
                selectItem: 'selectItem',
                alertMessage: 'alertMessage'
            })
        },
        data () {
            return {
                typeOptions: ['string', 'image', 'textarea', 'calendar', 'multi-day', 'editor', 'json'],
                formData: {
                    key: '',
                    value: '',
                    value_type: 'string',
                    description: '',
                    status: true
                },
                initValue: ''
            }
        },
        methods: {
            setdate(){
                this.initValue = '20/10/1995 10:04'
            },
            save(thenBackToList){
                this.$validator.validateAll()
                    .then(res => {
                        if (res) {
                            this.$store.dispatch("saveItem", {
                                'id': this.$route.params.id,
                                'formData': this.formData,
                                'apiUrl': UrlService.API_SETTING,
                                'redirect' : thenBackToList ? {
                                    route: '/settings'
                                } : null
                            });
                        }
                    });
            },
            onJsonChange (value) {
                console.log('value:', value)
            },
            onImageUploaded: function(res) {
                if (res.status === 'OK') {
                    this.formData.value = res.data.imgUrl;
                    this.initValue = res.data.imgUrl;
                    this.$refs.bzCropper.cropImgSrc = res.data.imgUrl;
                }
            },
        },
        created () {
            let id = this.$route.params.id;
            if (id !== undefined) {
                this.$store.dispatch("getItemById", {
                    'id': this.$route.params.id,
                    'apiUrl': UrlService.API_SETTING
                });
            }
        },
        mounted(){
            this.$validator.validateAll();
        },
        filters: {
            bzDatetime
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