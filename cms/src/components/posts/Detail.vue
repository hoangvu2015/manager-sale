<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <bz-header routeList="posts" @save="save"></bz-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <vuestic-widget headerText="Create Post">
          <form>
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="title" name="title" v-validate="'required'" v-model="formData.title" @input="genaratorSlug(formData.title)"/>
                      <label class="control-label" for="title-input">Title</label>
                      <i class="bar"></i>
                      <small v-show="errors.has('title')" class="help text-danger">
                        {{ errors.first('title') }}






                      </small>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="input-slug" name="slug" v-model="formData.slug" v-validate="'required'" @change="genaratorSlug(formData.slug)"/>
                      <label class="control-label" for="nput-slug">Slug</label>
                      <i class="bar"></i>
                      <small v-show="errors.has('slug')" class="help text-danger">
                        {{ errors.first('slug') }}






                      </small>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <textarea type="text" id="intro-textarea" required v-model="formData.teaser"></textarea>
                      <label class="control-label" for="intro-textarea">Introtext</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <froala :tag="'textarea'" :config="config" id="body-textarea" v-model="preBodyContent"></froala>
                      <label class="control-label" for="body-textarea">Body</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <!--<div class="form-group form-group-w-btn">-->
                  <!--<div class="btn btn-micro btn-primary">UPLOAD</div>-->
                  <!--</div>-->
                  <div class="form-group">
                    <bz-multi-uploader :maxFileSizeInMB="1.5"
                                       :maxNumberOfFiles="4"
                                       :preDefineData="preMultiImgs"
                                       @bzDropZone:dropZoneSuccess="uploadedGerally"
                                       @bzDropZone:dropzoneRemovedFile="removeImageGallery">
                    </bz-multi-uploader>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <bz-cropper :imgUrl="preImg" :cropRatio="'1:1'" :inputAccept="'image/*'" :maxFileSize="5242880" @bz:imageuploaded="onImageUploaded" ref="bzCropper">
                      </bz-cropper>
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
                  <vuestic-multi-select label="Category" v-model="formData.category" v-bind:options="categoryItems">
                  </vuestic-multi-select>
                  <vuestic-switch v-model="formData.feature">
                    <span slot="trueTitle">Featured</span>
                    <span slot="falseTitle">Not Feature</span>
                  </vuestic-switch>
                  <br/>
                  <div class="form-group">
                    <div class="input-group">
                      <select name="status" v-model="formData.status" id="status" required>
                        <option v-for="item in statusesOptions" :value="item.id">{{item.name}}</option>
                      </select>
                      <label class="control-label" for="status-textarea">Status</label>
                      <i class="bar"></i>
                    </div>
                  </div>
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
                      <input id="meta-title-input" v-model="formData.attrs.title" required/>
                      <label class="control-label" for="meta-title-input">Meta Title</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="meta-description-input" v-model="formData.attrs.description" required/>
                      <label class="control-label" for="meta-description-input">Meta Description</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="input-group">
                      <textarea type="text" id="meta-keyword-textarea" v-model="formData.attrs.keyword" required></textarea>
                      <label class="control-label" for="meta-keyword-textarea">Meta Keyword</label>
                      <i class="bar"></i>
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
	import VuesticSwitch from 'components/vuestic-components/vuestic-switch/VuesticSwitch';
	import VuesticSimpleSelect from 'components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect';
	import VuesticMultiSelect from 'components/vuestic-components/vuestic-multi-select/VuesticMultiSelect';

	import BzHeader from 'components/vuebz-components/BzHeader';
	import BzAlert from 'components/vuebz-components/BzAlert';

	import BzSingleImageCropper from 'components/vuebz-components/form/BzSingleImageCropper';
	import BzMultiImageUploader from 'components/vuebz-components/form/BzMultiImageUploader';

	import {mapGetters, mapActions} from 'vuex';
	import * as UrlService from 'services/url';

	import {text2Slug} from 'filters';


	export default {
		name: 'form-elements',
		components: {
			VueFroala,
			VuesticSwitch,
			VuesticSimpleSelect,
			VuesticMultiSelect,
			BzHeader,
			BzAlert,
			'bz-multi-uploader': BzMultiImageUploader,
			'bz-cropper': BzSingleImageCropper
		},
		watch: {
			selectItem(newVal) {
				this.formData = new Object({...this.formData, ...newVal});
				;
				this.status = this.formData.status;
				this.preImg = newVal.image;
				this.preBodyContent = newVal.content;
				this.preMultiImgs = this.formData.gallery.map(item => {
					return {
						url: `${window.webUrl}/files/${item.subFolder}/${item.filename}`,
						name: item.filename
					}
				});
			},
			$route() {
				let id = this.$route.params.id;
				if (id === undefined) {
					this.formData = {};
				}
			},
			status(newVal) {
				this.formData.status = newVal.id;
			}
		},
		computed: {
			...mapGetters({
				categoryItems: 'categoryItems',
				selectItem: 'selectItem',
				alertMessage: 'alertMessage'
			})
		},
		data() {
			return {
				preImg: '',
				preBodyContent: '',
				preMultiImgs: [],
				statusesOptions: [
					{id: 1, name: 'Publish'},
					{id: 0, name: 'UnPublish'},
					{id: 2, name: 'Trash'}
				],
				formData: {
					title: '',
					slug: '',
					teaser: '',
					category: [],
					content: '',
					status: 1,
					feature: false,
					image: '',
					gallery: [],
					attrs: {
						title: '',
						description: '',
						keyword: ''
					},
				},
				message: {
					show: false,
					title: "",
					type: "success",
					text: ""
				},
				config: {
					// full document here : https://www.froala.com/wysiwyg-editor/docs/options
					//fileUploadURL: '',
					//videoUploadURL: '',
					imageUploadURL: `${window.apiUrl}/upload/image`,
          imageUploadParams: {type: 'wysiwyg/post'}
					//imageManagerLoadURL: '',
					// document here : https://www.froala.com/wysiwyg-editor/docs/concepts/file/upload
				}
			}
		},
		methods: {
			save(thenBackToList) {
				this.$validator.validateAll()
					.then(res => {
						if (res) {
							this.$store.dispatch("saveItem", {
								'id': this.$route.params.id,
								'formData': {...this.formData, content: this.preBodyContent},
								'apiUrl': UrlService.API_POST,
								'redirect': thenBackToList ? {
									route: '/posts'
								} : null
							});
						}
					})
			},
			onImageUploaded: function (res) {
				if (res.status === 'OK') {
					this.formData.image = res.data.imgUrl;
					this.preImg = res.data.imgUrl;
					console.log('bzCropper', this.$refs.bzCropper);
					this.$refs.bzCropper.cropImgSrc = res.data.imgUrl;
				}
			},
			uploadedGerally: function (data) {
				var newImgUploaded = data.map(fileInfo => {
					return {
						filename: fileInfo.filename,
						subFolder: fileInfo.subFolder
					}
				});

				this.formData.gallery = this.formData.gallery.concat(newImgUploaded);
			},
			removeImageGallery: function (filename, error) {
				this.formData.gallery = this.formData.gallery.filter(item => {
					return item.filename != filename;
				})
			},
			genaratorSlug: function (text) {
				this.formData.slug = text2Slug(text);
			}
		},
		created() {
			let id = this.$route.params.id;
			if (id !== undefined) {
				this.$store.dispatch("getItemById", {
					'id': this.$route.params.id,
					'apiUrl': UrlService.API_POST
				});
			}

			this.$store.dispatch("getCategoryItems");
		},
		mounted() {
			this.$validator.validateAll();
		},
		filters: {
			text2Slug
		}
	}
</script>

<style lang="scss">
  .abc-checkbox,
  .abc-radio {
    display: flex !important;
    justify-content: flex-start;
  }

  input[type=checkbox]:disabled + label,
  input[type=radio]:disabled + label,
  input[type=checkbox]:disabled,
  input[type=radio]:disabled {
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