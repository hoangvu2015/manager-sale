<template>
    <div class="form-elements">
        <div class="row">
            <div class="col-sm-12">
                <bz-header routeList="banners" @save="save"></bz-header>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <vuestic-widget headerText="Create Banner">
                    <form>
                        <div class="row">
                            <div class="col-md-12">
                                <fieldset>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="simple-input" @input="genaratorSlug(formData.title)" required v-model="formData.title" v-validate="'required'" name="title"/>
                                            <label class="control-label" for="simple-input">Title</label><i class="bar"></i>
                                            <small v-show="errors.has('title')" class="help text-danger">
                                                {{ errors.first('title') }}
                                            </small>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="simple-input" required v-model="formData.subtitle" />
                                            <label class="control-label" for="simple-input">subtitle</label><i class="bar"></i>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="simple-input" @change="genaratorSlug(formData.link)" required v-model="formData.link" />
                                            <label class="control-label" for="simple-input">Link</label><i class="bar"></i>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <froala :tag="'textarea'" v-model="formData.description"></froala>
                                            <label class="control-label" for="simple-textarea">Description</label><i class="bar"></i>
                                        </div>
                                    </div>

                                    <div class="form-group">
                                        <div class="input-group">
                                            <bz-single-image-cropper crop-ratio="2:1" :imgUrl="imageInit" label="Image" :cropRatio="'1:1'" :inputAccept="'image/*'" :maxFileSize="5242880" @bz:imageuploaded="onImageUploaded" ref="bzCropper">
                                            </bz-single-image-cropper>
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
                                    <vuestic-multi-select
                                            label="Category"
                                            v-model="formData.category"
                                            v-bind:options="categoryItems">
                                    </vuestic-multi-select>
                                    
                                    <br/>
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
                                            <select name="position" id="position">
                                                <option v-for="(item, index) in listPositions" :key="index" :value="item">{{item}}</option>
                                            </select>
                                            <label class="control-label" for="simple-textarea">Position</label><i class="bar"></i>
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
    import * as UrlService from 'services/url';
    import {mapGetters, mapActions} from 'vuex';
    import BzSingleImageCropper from 'components/vuebz-components/form/BzSingleImageCropper';
	import {text2Slug} from 'filters';

    export default {
        name: 'Banner',
        components: {
            VueFroala,
            VuesticSwitch,
            VuesticSimpleSelect,
            VuesticMultiSelect,
            BzHeader,
            BzSingleImageCropper
        },
        watch: {
            // categoryItems(){
            //     this.categoryOptions = this.categoryItems;
            // },
            selectItem(newVal){
                this.formData = { ... newVal };
                this.imageInit = this.formData.image;
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
                categoryItems: 'categoryItems',
                selectItem: 'selectItem',
                alertMessage: 'alertMessage'
            })
        },
        data () {
            return {
                imageInit: null,
                listPositions: ['top', 'bottom', 'right', 'left', 'middle', 'home'],
                categoryOptions: [],
                formData: {
                    title: '',
                    subtitle: '',
                    description: '',
                    category: [],
                    status: 1,
                    link: '',
                    image: '',
                    position: 'top',
                }
            }
        },
        methods: {
            save(thenBackToList){
                this.$validator.validateAll()
                    .then(res => {
                        if (res) {
                            this.$store.dispatch("saveItem", {
                                'id': this.$route.params.id,
                                'formData': this.formData,
                                'apiUrl': UrlService.API_BANNER,
                                'redirect' : thenBackToList ? {
                                    route: '/banners'
                                } : null
                            });
                        }
                    });
            },
             onImageUploaded: function(res) {
                if (res.status === 'OK') {
                    this.formData.image = res.data.imgUrl;
                    this.imageInit = res.data.imgUrl;
                    this.$refs.bzCropper.cropImgSrc = res.data.imgUrl;
                }
            },
            genaratorSlug: function (text) {
				this.formData.link = text2Slug(text);
			}
        },
        created () {
            let id = this.$route.params.id;
            if (id !== undefined) {
                this.$store.dispatch("getItemById", {
                    'id': this.$route.params.id,
                    'apiUrl': UrlService.API_BANNER
                });
            }

            this.$store.dispatch("getCategoryItems");

        },
        mounted () {
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