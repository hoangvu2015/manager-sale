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
      <div class="col-md-12">
        <vuestic-widget headerText="Create Template Email">
          <form>
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <input id="title" name="subject" v-validate="'required'" v-model="formData.subject"/>
                      <label class="control-label" for="title-input">Subject</label>
                      <i class="bar"></i>
                      <small v-show="errors.has('subject')" class="help text-danger">{{ errors.first('subject') }}</small>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <label class="control-label" for="title-input">Receive Email</label>
                  <multiselect
                    :multiple="true"
                    v-model="formData.email"
                    :options="allUsers">
                  </multiselect>
                </fieldset>
                <br/>
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <v-tag-input v-model="formData.email2"></v-tag-input>
                      <label class="control-label" for="title-input">OR</label>
                      <i class="bar"></i>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </vuestic-widget>
      </div>
      <div class="col-md-6">
        <vuestic-widget headerText="Message">
          <form>
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                  <div class="form-group">
                    <div class="input-group">
                      <small v-show="errors.has('content')" class="help text-danger">{{ errors.first('content') }}</small>
                      <textarea name="content" v-validate="'required'" v-model="formData.content" rows="10" cols="50">
                      </textarea>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </form>
        </vuestic-widget>
      </div>
      <div class="col-md-6">
        <vuestic-widget headerText="View">
          <form>
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                  <div v-html="formData.content"></div>
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
	import BzHeader from 'components/vuebz-components/BzHeader';
	import BzAlert from 'components/vuebz-components/BzAlert';
	import Multiselect from 'vue-multiselect'
	import {mapGetters, mapActions} from 'vuex';
	import * as UrlService from 'services/url';
	import VTagInput from 'v-tag-input'

	export default {
		name: 'email-test',
		components: {
			BzHeader,
			BzAlert,
			Multiselect,
			VTagInput
		},
		watch: {
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
				alertMessage: 'alertMessage',
				allUsers: 'allUsers'
			})
		},
		data() {
			return {
				formData: {
					subject: '',
					email: [],
					email2: [],
					content: ''
				}
			}
		},
		methods: {
			save() {
				this.$validator.validateAll()
					.then(res => {
						if (res) {
							this.$store.dispatch('sendMail', {
								'formData': this.formData,
								'apiUrl': UrlService.API_MAILER
							});
						}
					})
			}
		},
		created() {
			this.$store.dispatch('getAllUsers', {
				'apiUrl': UrlService.API_USER
			})
		},
		mounted() {
			this.$validator.validateAll();
		}
	}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>