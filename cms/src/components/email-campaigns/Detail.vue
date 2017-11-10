<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <bz-header routeList="posts" @save="submitFiles"></bz-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <vuestic-widget headerText="Create Campaign">
          <form>
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="title" name="title" v-validate="'required'" v-model="formData.title" @input="genaratorSlug(formData.title)" @change="genaratorSlug(formData.title)"/>
                      <label class="control-label" for="title">Title</label>
                      <i class="bar"></i>
                      <small v-show="errors.has('title')" class="help text-danger">
                        {{ errors.first('title') }}
                      </small>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <input id="input-slug" name="slug" v-model="formData.slug" v-validate="'required'" @change="genaratorSlug(formData.slug)"/>
                      <label class="control-label" for="input-slug">Slug</label>
                      <i class="bar"></i>
                      <small v-show="errors.has('slug')" class="help text-danger">
                        {{ errors.first('slug') }}
                      </small>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="input-group">
                      <vue-dropzone 
                      ref="zipFileZone" 
                      id="zipFileZone" 
                      paramName="file" 
                      acceptedFileTypes=".zip" 
                      :headers="headers" 
                      :url="fileUploadURL" 
                      :timeout="3000000" 
                      :maxFileSizeInMB="100" 
                      :maxNumberOfFiles="1" 
                      :duplicateCheck="true" 
                      :uploadMultiple="false" 
                      :withCredentials="true" 
                      :autoProcessQueue="false" 
                      :useCustomDropzoneOptions="false"
                      :dropzoneOptions="dropzoneConfig" 
                      @vdropzone-success="dropZoneSuccess" 
                      @vdropzone-file-added="dropZoneFileAdded">
                        <input type="hidden" name="type" value="email-template">
                      </vue-dropzone>
                      
                      <br>
                      <small v-show="vueDropZoneError" class="help text-danger">
                        {{ vueDropZoneError }}
                      </small>
                      <!-- <button class="btn btn-info focus btn-micro" @click.prevent="submitFiles()">Start Upload</button> -->
                      <!-- <button class="btn btn-info focus btn-micro" @click.prevent="process">Process</button> -->
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
                  <!-- <vuestic-multi-select label="Category" v-model="formData.category" v-bind:options="categoryItems"></vuestic-multi-select> -->

                  <div class="form-group">
                    <div class="input-group">
                      <bz-select2 v-model="formData.status" name="status" :options="statusesOptions" placeholder="Select a status" :required="true" @valid="valid" @invalid="invalid"></bz-select2>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </vuestic-widget>

        <vuestic-widget headerText="Send email" v-if="$route.params.id">
          <form>
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <input name="subject" v-model="formSend.subject"/>
                      <label class="control-label">Subject</label>
                      <i class="bar"></i>
                      <small v-show="formSendError.subject" class="help text-danger">{{ formSendError.subject }}</small>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <label class="control-label">Receive Email</label>
                  <multiselect :multiple="true" v-model="formSend.email" :options="allUsers"></multiselect>
                </fieldset>
                <br>

                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <v-tag-input v-model="formSend.email2"></v-tag-input>
                      <label class="control-label">OR</label>
                      <i class="bar"></i>
                      <small v-show="formSendError.email" class="help text-danger">{{ formSendError.email }}</small>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <bz-select2 v-model="formSend.template" name="template" :options="formData.templates" placeholder="Select a template" :required="true"></bz-select2>
                    </div>
                  </div>
                </fieldset>

                <div class="input-group">
                  <button :disabled="!formSendError.noErr" @click.prevent="sendEmail" type="button" class="btn btn-secondary focus btn-micro" style="width: 100%;">Send</button>
                </div>
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
  import BzSelect2 from 'components/vuebz-components/BzSelect2'

	import {mapGetters, mapActions} from 'vuex';
	import * as UrlService from 'services/url';

  import {text2Slug} from 'filters';
	import VueDropzone from 'vue2-dropzone';
  import VTagInput from 'v-tag-input'
  import Multiselect from 'vue-multiselect'

	export default {
		name: 'form-email-campaign',
		components: {
			VueFroala,
			VuesticSwitch,
			VuesticSimpleSelect,
			VuesticMultiSelect,
			BzHeader,
			BzAlert,
      BzSelect2,
      VTagInput,
      Multiselect,
      VueDropzone
		},
		watch: {
      alertMessage(newV) {
        if (newV.type == 'success' && this.$route.params.id) {
          this.$store.dispatch('getItemById', {
            'id': this.$route.params.id,
            'apiUrl': UrlService.API_EMAIL_CAMPAIGN
          });
        }
      },
			selectItem(newVal) {
				this.formData = new Object({...this.formData, ...newVal});
			},
			$route() {
        this.$refs.zipFileZone.removeAllFiles()
        this.formSend = {
          subject: String(),
          template: String(),
          email: Array(),
          email2: Array()
        }

        let id = this.$route.params.id
        if (id === undefined) {
          this.formData = {
            status: 1,
            template: Array()
          }
        } else {
          this.$store.dispatch("getItemById", {
            'id': id,
            'apiUrl': UrlService.API_EMAIL_CAMPAIGN
          })
        }
			}
		},
		computed: {
			...mapGetters({
				categoryItems: 'categoryItems',
        selectItem: 'selectItem',
				allUsers: 'allUsers',
				alertMessage: 'alertMessage'
			}),
      formSendError() {
        return {
          subject: this.formSend.subject ? false : 'Subject is required',
          email: this.getFormSendEmailError(),
          noErr: this.isFormSendNoError()
        }
      },
      vueDropZoneError() {
        return this.errors.items.reduce((err, item) => {
          return item.field == 'template' ? (err = item.msg, err) : err
        }, '')
      }
		},
		data() {
			return {
        thenBackToList: false,
        fileUploadURL: apiUrl + '/upload',
        dropzoneConfig: {
          paramName: 'file',
          method: 'post',
          url: apiUrl + '/upload',
          withCredentials: true,
          maxFiles: 1,
          maxFilesize: 100,
          timeout: 3000000,
          duplicateCheck: true,
          uploadMultiple: false,
          acceptedFiles: 'zip',
          autoProcessQueue: false,
          dictDefaultMessage: 'Click or drop to upload template',
          headers: {
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            "X-Requested-With": "XMLHttpRequest",
          },
          params: {
            type: 'email-template'
          }
        },
        headers: {
          "Accept": "application/json",
          "Cache-Control": "no-cache",
          "X-Requested-With": "XMLHttpRequest",
          // "Content-Type": "multipart/form-data"
        },
				statusesOptions: [
          { 
            id: 1, 
            name: 'Publish'
          }, { 
            id: 0, 
            name: 'UnPublish'
          }, { 
            id: 2, 
            name: 'Trash'
          }
        ],
				formData: {
					title: '',
					slug: '',
					status: 1,
          templates: Array()
				},
				config: {
					// full document here : https://www.froala.com/wysiwyg-editor/docs/options
					//fileUploadURL: '',
					//videoUploadURL: '',
					imageUploadURL: `${window.apiUrl}/upload/image`,
					//imageManagerLoadURL: '',
					// document here : https://www.froala.com/wysiwyg-editor/docs/concepts/file/upload
				},
        formSend: {
          subject: String(),
          template: String(),
          email: Array(),
          email2: Array()
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
			save(thenBackToList) {
        this.$store.dispatch('saveItem', {
          'id': this.$route.params.id,
          'formData': {...this.formData, content: this.preBodyContent},
          'apiUrl': UrlService.API_EMAIL_CAMPAIGN,
          'routeDetail': '/email-campaign',
          'redirect': thenBackToList ? { route: '/email-campaigns' } : null
        });
      },
			genaratorSlug(text) {
				this.formData.slug = text2Slug(text);
			},
      dropZoneSuccess(file, response) {
        Object.assign(this.formData, { templatePath: response.data.templatePath })
        this.save(this.thenBackToList)
      },
      dropZoneFileAdded(file) {
        this.$root.$nextTick(() => {
          let files = this.$refs.zipFileZone.getAcceptedFiles()

          if (files[0] == file && files[0].accepted) {
            this.valid('template', '__global__')
          } else {
            this.invalid('template', 'Yêu cầu tệp tin .zip và nhỏ hơn 100MB', 'required', '__global__')
            this.$refs.zipFileZone.removeFile(file)
          }
        })
      },
      submitFiles(thenBackToList) {
        this.thenBackToList = thenBackToList;
        this.$validator.validateAll();
        
        if (Array.isArray(this.$refs.zipFileZone.dropzone.files) && this.$refs.zipFileZone.dropzone.files.length && !this.errors.items.length) {
          this.$refs.zipFileZone.processQueue()

          // for (let item of this.$refs.zipFileZone.dropzone.files) {
          //   console.log(item);
          // }
        } else if ((this.$route.params.id || this.formData.templatePath)  && !this.errors.items.length) {
          this.save(thenBackToList)
        } else if (!this.$route.params.id && !this.$refs.zipFileZone.dropzone.files.length) {
          this.invalid('template', 'Template file is required', 'required', '__global__')
          // console.log(this.errors);
          // console.log(this.errors.count());
          // console.log(this.errors.has('template'));
          // console.log(this.errors.first('template'));
        }
      },
      process() {
        // console.log(this.$refs.zipFileZone);
        // let file = { size: 123, name: 'Icon' };
        // let url = 'https://myvizo.com/img/logo_sm.png';
        // this.$refs.zipFileZone.manuallyAddFile(file, url);
        // console.log(this.$refs.zipFileZone.dropzone.options.maxFiles);
      },
      sendEmail() {
        if (this.formSendError.noErr) {
          this.$store.dispatch('sendEmailCampaign', {
            'apiUrl': UrlService.API_MAILER_CAMPAIGN,
            'formData': {
              id: this.formData._id,
              subject: this.formSend.subject,
              email: this.formSend.email2.length ? this.formSend.email2 : this.formSend.email,
              template: this.formSend.template
            }
          });
        }
      },
      getFormSendEmailError() {
        if (!this.formSend.email.length && !this.formSend.email2.length) {
          return 'Email is required'
        } else if (this.formSend.email2.length) {
          this.formSend.email2.reduce((err, email) => {
            if (email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g) !== null) {
              return err;
            } else {
              err = 'Email format invalid (separated by one [space] per email)'
              return err
            }
          }, '')
        } else {
          return ''
        }

        // Rút gọn version
        // return !this.formSend.email.length && !this.formSend.email2.length ? 'Email is required' : (this.formSend.email2.length ? this.formSend.email2.reduce((err, email) => { return email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g) !== null ? err : (err = 'Email format invalid (separated by one [space] per email)', err) }, '') : '')
      },
      isFormSendNoError() {
        let isTrue = true

        if (!this.formSend.email.length && !this.formSend.email2.length) {
          isTrue = false
        } else if (this.formSend.email2.length) {
          isTrue = this.formSend.email2.reduce((done, email) => {
            if (email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g) !== null) {
              return done
            } else {
              done = false
              return done
            }
          }, true)
        }

        return this.formSend.subject && this.formSend.template && isTrue

        // Rút gọn version
        // return this.formSend.subject && this.formSend.template && (!this.formSend.email.length && !this.formSend.email2.length ? false : (this.formSend.email2.length ? this.formSend.email2.reduce((done, email) => { return email.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g) !== null ? done : (done = false, done) }, true) : true))
      }
		},
		created() {
			let id = this.$route.params.id;
			if (id !== undefined) {
				this.$store.dispatch('getItemById', {
					'id': this.$route.params.id,
					'apiUrl': UrlService.API_EMAIL_CAMPAIGN
				});
			}

      // this.dropzoneConfig.dictDefaultMessage = this.$route.params.id ? 'Click or drop to re-upload template' : 'Click or drop to upload template'

			// this.$store.dispatch('getCategoryItems');
		},
		mounted() {
			this.$validator.validateAll()

      this.$store.dispatch('getAllUsers', {
        'apiUrl': UrlService.API_USER
      })
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
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
