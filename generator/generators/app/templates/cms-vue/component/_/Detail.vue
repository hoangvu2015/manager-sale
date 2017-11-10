<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <bz-header routeList="<%= moduleName %>s" @save="save"></bz-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <vuestic-widget :headerText="titleForm">
          <form name="FormName">
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                  <% for (key in formInfo) { -%>
                  <% if (formInfo[key].type == 'text') { %>
                  <!-- <%= key %> -->
                  <div class="form-group">
                    <div class="input-group">
                      <input id="<%= key %>" name="<%= key %>" v-validate="'required'" v-model="formData.<%= key %>" <% if (formInfo[key].slug) { %> @input="genaratorSlug(formData.<%= key %>)" <% } %>/>
                      <label class="control-label" for="<%= key %>"><%= formInfo[key].label%></label><i class="bar"></i>
                      <small v-show="errors.has('<%= key %>') && submited" class="help text-danger">
                        {{ errors.first('<%= key %>') }}
                      </small>
                    </div>
                  </div>
                  <% } -%>
                  <% if (formInfo[key].type == 'number') { %>
                  <!-- <%= key %> -->
                  <div class="form-group">
                    <div class="input-group">
                      <input type="number" id="<%= key %>" name="<%= key %>" v-validate="'required'" v-model="formData.<%= key %>"/>
                      <label class="control-label" for="<%= key %>"><%= formInfo[key].label%></label><i class="bar"></i>
                      <small v-show="errors.has('<%= key %>') && submited" class="help text-danger">
                        {{ errors.first('<%= key %>') }}
                      </small>
                    </div>
                  </div>
                  <% } -%>
                  <% if (formInfo[key].type == 'ckeditor') { %>
                  <!-- <%= key %> -->
                  <div class="form-group">
                    <div class="input-group">
                      <froala :tag="'textarea'" :config="froalaConfig" id="<%= key %>" v-model="formData.<%= key %>"></froala>
                      <label class="control-label" for="<%= key %>"><%= formInfo[key].label%></label><i class="bar"></i>
                    </div>
                  </div>
                  <% } -%>
                  <% if (formInfo[key].type == 'image') { %>
                  <!-- <%= key %> -->
                  <div class="form-group">
                    <div class="input-group">
                      <bz-upload-cropper :field="'<%= key %>'" :customUploadData="customUploadData('<%= key %>')" :button="'Upload'" :crop="false" :cropRatio="'1:1'" :inputAccept="'image/*'" :maxFileSize="5242880" @bz:imageuploaded="onImageUploaded" ref="bzCropper" :label="'<%= formInfo[key].label%>'">
                        <template slot="bz:preview" >
                          <div class="preview-block" v-if="formData.<%= key %>">
                            <div class="preview-content">
                              <img class="img img-responsive img-preview" :src="webUrl+'/'+formData.<%= key %>" alt="" width="100px" height ="100px">
                              <span class="glyphicon glyphicon-remove remove-imgcustom" @click="removeImage('single','<%= key %>')"></span>
                            </div>
                          </div>
                        </template>
                      </bz-upload-cropper>
                    </div>
                  </div>
                  <% } -%>
                  <% if (formInfo[key].type == 'images') { %>
                  <!-- <%= key %> -->
                  <div class="form-group">
                    <div class="input-group">
                      <bz-upload-cropper :field="'<%= key %>'" :customUploadData="customUploadData('<%= key %>')" :button="'Upload'" :crop="false" :multiple="true" :inputAccept="'image/*'" :uploadUrl="multiUrl" @bz:imageuploaded="onImageUploaded" :label="'<%= formInfo[key].label%>'">
                        <template slot="bz:preview" >
                          <div class="preview-block">
                            <div class="preview-content" v-for="(item, index) in formData.<%= key %>">
                              <img class="img img-responsive img-preview" :src="webUrl+'/'+item" alt="" width="100px" height ="100px">
                              <span class="glyphicon glyphicon-remove remove-imgcustom" @click="removeImage('multi','<%= key %>', index)"></span>
                            </div>
                          </div>
                        </template>
                      </bz-upload-cropper>
                    </div>
                  </div>
                  <% } -%>
                  <% if (formInfo[key].type == 'select') { %>
                  <!-- <%= key %> -->
                  <div class="form-group">
                    <div class="input-group">
                      <label class="typo__label"><%= formInfo[key].label%></label>
                      <multiselect v-model="formData.<%= key %>" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="<% if (formInfo[key].service && formInfo[key].service.name && formInfo[key].service.value) { %><%= formInfo[key].service.value%><% }else{ %>value<% } %>" track-by="<% if (formInfo[key].service && formInfo[key].service.module && formInfo[key].service.key) { %><%= formInfo[key].service.key%><% }else{ %>key<% } %>" :options="<%= key %>s"></multiselect>
                      <!-- <pre class="language-json"><code>{{ formData.<%= key %>  }}vv</code></pre> -->
                    </div>
                  </div>
                  <% } -%>
                  <% if (formInfo[key].type == 'multi_select') { %>
                  <!-- <%= key %> -->
                  <div class="form-group">
                    <div class="input-group">
                      <label class="typo__label"><%= formInfo[key].label%></label>
                      <multiselect v-model="formData.<%= key %>" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="<% if (formInfo[key].service && formInfo[key].service.name && formInfo[key].service.value) { %><%= formInfo[key].service.value%><% }else{ %>value<% } %>" track-by="<% if (formInfo[key].service && formInfo[key].service.module && formInfo[key].service.key) { %><%= formInfo[key].service.key%><% }else{ %>key<% } %>" :options="<%= key %>s" :multiple="true"></multiselect>
                      <!-- <pre class="language-json"><code>{{ formData.<%= key %>  }}</code></pre> -->
                    </div>
                  </div>
                  <% } -%>
                  <% if (formInfo[key].type == 'date') { %>
                  <!-- <%= key %> -->
                  <div class="form-group">
                    <div class="input-group">
                      <label class="typo__label"><%= formInfo[key].label%></label>
                      <div>
                        <datepicker v-model="formData.<%= key %>" :config="dateOpt<%= key %>" readonly></datepicker>
                      </div>
                    </div>
                  </div>
                  <% } -%>
                  <% if (formInfo[key].type == 'date_range') { %>
                  <!-- <%= key %> -->
                  <div class="form-group">
                    <div class="input-group">
                      <label class="typo__label"><%= formInfo[key].label%></label>
                      <div>
                        <datepicker v-model="formData.<%= key %>" placeholder="Selected date" :config="dateOpt<%= key %>" readonly></datepicker>
                      </div>
                    </div>
                  </div>
                  <% } -%>
                  <% } %>
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
import _ from 'lodash';
import API from '../../services/app';
import * as UrlService from 'services/url';
import {mapGetters} from 'vuex';
import {text2Slug} from 'filters';

export default {
  name: 'form-elements',
  components: {},
  watch: {  
    selectItem(){
      this.formData = this.selectItem;
      this.getOptionSelect();<%for(key in formInfo){%><%if(formInfo[key].type == 'date_range'){%>
      this.formatDateRange(this.selectItem.<%= key %>, '<%= key %>');<%}-%>
      <%}-%>
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
      titleForm: 'Add <%= modelName %>',
      webUrl: window.webUrl,
      multiUrl: `${window.apiUrl}/upload/multi-image`,
      froalaConfig: {
        // full document here : https://www.froala.com/wysiwyg-editor/docs/options
        imageUploadURL: `${window.apiUrl}/upload/image`,
        imageUploadParams: {type: 'wysiwyg/<%= moduleName %>'}
        // document here : https://www.froala.com/wysiwyg-editor/docs/concepts/file/upload
      },
      submited :false,
      removeImageList: [],<% for (key in formInfo) { %><% if (formInfo[key].type == 'select' || formInfo[key].type == 'multi_select') { %>
      <%= key %>s: [],<% } -%>
      <% } -%>
      <%for(key in formInfo){%><%if(formInfo[key].type == 'date'){%>
      <%if(formInfo[key].timePicker == true){%>dateOpt<%= key %>: { enableTime: true, altFormat: 'H:m d/m/Y', altInput: true},<%}else{-%>dateOpt<%= key %>: { altFormat: 'd/m/Y', altInput: true},<%}-%>
      <%}-%>
      <%if(formInfo[key].type == 'date_range'){%>
      <%if(formInfo[key].timePicker == true){%>dateOpt<%= key %>: { enableTime: true, altFormat: 'H:m d/m/Y', altInput: true, mode: 'range'},<%}else{-%>dateOpt<%= key %>: { altFormat: 'd/m/Y', altInput: true, mode: 'range'},<%}-%>
      <%}-%>
      <%}%>
      formData: {<%for(key in formInfo){%><%if(formInfo[key].type == 'text' || formInfo[key].type == 'ckeditor' || formInfo[key].type == 'image'){%>
        <%= key %>: '',<%}-%><%if(formInfo[key].type == 'number'){%>
        <%= key %>: 0,<%}-%><%if(formInfo[key].type == 'date' || formInfo[key].type == 'date_range'){%>
        <%= key %>: null,<%}-%><%if(formInfo[key].type == 'images'){%>
        <%= key %>: [],<%}-%>
        <%}%>
        status: true
      }
    };
  },
  methods: {
    genaratorSlug: function (text) {
      this.formData.slug = text2Slug(text);
    },
    customUploadData: function (fieldName) {
      return { type: `<%= moduleName %>/${fieldName}` }
    },
    onImageUploaded: function (res,fieldName) {
      if (res.status === 'OK') {
        this.$toastr('success', 'Upload image success', 'Success') 
        if(fieldName){
          if(Array.isArray(res.data)){
            if(!this.formData[fieldName] || this.formData[fieldName].length == 0)
              this.formData[fieldName] = [];
            for (let prop in res.data) {
              this.formData[fieldName].push(res.data[prop].imgUrl);
            }
          }else{
            if(this.formData[fieldName]){
              // delete file old
              this.removeImage('single', fieldName)
            }
            this.formData[fieldName] = res.data.imgUrl;
          }
        }
      }
    },
    save(thenBackToList) {
      this.submited = true;
      this.$validator.validateAll()
      .then(res => {
        if (res) {

          /* Xử lý date range time */<%for(key in formInfo){%><%if(formInfo[key].type == 'date_range'){%>
          if(this.formData.<%= key %>){
            let arr = this.formData.<%= key %>.split(' to ');
            if(arr.length == 2)
              this.formData.<%= key %> = { startDate: arr[0], endDate: arr[1] };
            else
              delete this.formData.<%= key %>;
          }<%}-%>
          <%}%>

          /* Xử lý select, multiselect */<% for (key in formInfo) { %><% if (formInfo[key].type == 'select') { %>
          if(this.formData.<%= key %>)
            this.formData.<%= key %> = this.formData.<%= key %>.<% if (formInfo[key].service && formInfo[key].service.module && formInfo[key].service.key) { %><%= formInfo[key].service.key%><% }else{ %>key<% } %>;<% } -%><% if (formInfo[key].type == 'multi_select') { %>
          this.formData.<%= key %> = _.map(this.formData.<%= key %>, '<% if (formInfo[key].service && formInfo[key].service.module && formInfo[key].service.key) { %><%= formInfo[key].service.key%><% }else{ %>key<% } %>');<% } -%>
          <% } %>

          /* Delete image in removeImageList */
          for (let prop in this.removeImageList) {
            let filePath = this.removeImageList[prop].substring(6, this.removeImageList[prop].length)
            this.$store.dispatch("removeImage", {data:{filePath}});
          }
          /* Save Doc */
          delete this.formData.__v;
          this.$store.dispatch("saveItem", {
            'id': this.$route.params.id,
            'formData': this.formData,
            'apiUrl': UrlService.API_<%= moduleNameUpper %>,
            'routeDetail': '/<%= moduleName %>',
            'redirect': thenBackToList? {
              route: '/<%= moduleName %>s'
            } : null
          });
          <% for (key in formInfo) { %><% if (formInfo[key].type == 'select' || formInfo[key].type == 'multi_select') { %>
          this.formatSelect(this.<%= key %>s, '<%= key %>', '<% if (formInfo[key].service && formInfo[key].service.module && formInfo[key].service.key) { %><%= formInfo[key].service.key%><% }else{ %>key<% } %>');<% } -%>
          <% } %><%for(key in formInfo){%><%if(formInfo[key].type == 'date_range'){%>
          this.formatDateRange(this.formData.<%= key %>, '<%= key %>');<%}-%>
          <%}%>
        }
      })
    },
    removeImage: function (type, fieldName, key) {
      let link = ''
      if(type == 'single'){
        link = this.formData[fieldName]
        this.formData[fieldName] = '';
      }
      if(type == 'multi'){
        link = this.formData[fieldName][key];
        this.formData[fieldName].splice(key,1);
      }

      if(this.$route.params.id){
        // add vào list delete file
        this.removeImageList.push(link);
      }else{
        // Service delete file
        let filePath = link.substring(6, link.length)
        this.$store.dispatch("removeImage", {data:{filePath}});
      }
    },
    getOptionSelect: function(){
      /* Start Get Option */
      <% for (key in formInfo) { %><% if (formInfo[key].type == 'select' || formInfo[key].type == 'multi_select') { %><% if (formInfo[key].service && formInfo[key].service.module) { %>
      API.getItems({apiUrl:`${window.adminUrl}/<%= formInfo[key].service.module %>`,params:{notPaginate:true}})
      .then(res => {
        if (res.status === 200 && res.data){
          this.<%= key %>s = res.data.data;
          this.formatSelect(this.<%= key %>s, '<%= key %>', '<% if (formInfo[key].service && formInfo[key].service.module && formInfo[key].service.key) { %><%= formInfo[key].service.key%><% }else{ %>key<% } %>');
        }
        else
          this.$toastr('error', 'Get data error', 'Error') 
      })<% }else{ %>
      this.<%= key %>s = [{key:'1', value:'option 1'},{key:'2', value:'option 2'},{key:'3', value:'option 3'}]
      this.formatSelect(this.<%= key %>s, '<%= key %>', '<% if (formInfo[key].service && formInfo[key].service.module && formInfo[key].service.key) { %><%= formInfo[key].service.key%><% }else{ %>key<% } %>');<% } %>
      <% } -%><% } %>
      /* End Get Option*/
    },
    formatSelect: function(list, fielname, key){
      if(Array.isArray(this.formData[fielname])){
        let tmp = [];
        for (let prop in this.formData[fielname]) {
          let filter = {};
          filter[key] = this.formData[fielname][prop];
          let a = _.partition(list, filter);
          if(a[0][0])
            tmp.push(a[0][0]);
        }
        this.formData[fielname] = tmp;
      }else{
        let filter = {};
        filter[key] = this.formData[fielname];
        let a = _.partition(list, filter);
        if(a[0][0])
          this.formData[fielname] = a[0][0];
      }
    },
    formatDateRange: function(dateRange, fieldname){
      if(dateRange && !_.isEmpty(dateRange))
        this.formData[fieldname] = dateRange.startDate+' to '+dateRange.endDate;
    }
  },
  created () {
    let id = this.$route.params.id;
    if (id !== undefined) {
      this.titleForm = 'Edit <%= modelName %>';
      this.$store.dispatch("getItemById", {
        'id': this.$route.params.id,
        'apiUrl': UrlService.API_<%= moduleNameUpper %>
      });
    }else{
      this.getOptionSelect();
    }
  },
  mounted(){
    this.$validator.validateAll();
  }
}
</script>

<style lang="scss"></style>
