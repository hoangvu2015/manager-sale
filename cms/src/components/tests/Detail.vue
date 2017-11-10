<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <bz-header routeList="tests" @save="save"></bz-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <vuestic-widget :headerText="titleForm">
          <form name="FormName">
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                                    
                  <!-- title -->
                  <div class="form-group">
                    <div class="input-group">
                      <input id="title" name="title" v-validate="'required'" v-model="formData.title"  @input="genaratorSlug(formData.title)" />
                      <label class="control-label" for="title">Tiêu đề</label><i class="bar"></i>
                      <small v-show="errors.has('title') && submited" class="help text-danger">
                        {{ errors.first('title') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                                      
                  <!-- slug -->
                  <div class="form-group">
                    <div class="input-group">
                      <input id="slug" name="slug" v-validate="'required'" v-model="formData.slug" />
                      <label class="control-label" for="slug">Slug</label><i class="bar"></i>
                      <small v-show="errors.has('slug') && submited" class="help text-danger">
                        {{ errors.first('slug') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                                                        
                  <!-- num -->
                  <div class="form-group">
                    <div class="input-group">
                      <input type="number" id="num" name="num" v-validate="'required'" v-model="formData.num"/>
                      <label class="control-label" for="num">Số</label><i class="bar"></i>
                      <small v-show="errors.has('num') && submited" class="help text-danger">
                        {{ errors.first('num') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                                                        
                  <!-- description -->
                  <div class="form-group">
                    <div class="input-group">
                      <froala :tag="'textarea'" :config="froalaConfig" id="description" v-model="formData.description"></froala>
                      <label class="control-label" for="description">Mô tả</label><i class="bar"></i>
                    </div>
                  </div>
                                                                                                                                                                                                                        
                  <!-- thumb -->
                  <div class="form-group">
                    <div class="input-group">
                      <bz-upload-cropper :field="'thumb'" :customUploadData="customUploadData('thumb')" :button="'Upload'" :crop="false" :cropRatio="'1:1'" :inputAccept="'image/*'" :maxFileSize="5242880" @bz:imageuploaded="onImageUploaded" ref="bzCropper" :label="'Hình Thumb'">
                        <template slot="bz:preview" >
                          <div class="preview-block" v-if="formData.thumb">
                            <div class="preview-content">
                              <img class="img img-responsive img-preview" :src="webUrl+'/'+formData.thumb" alt="" width="100px" height ="100px">
                              <span class="glyphicon glyphicon-remove remove-imgcustom" @click="removeImage('single','thumb')"></span>
                            </div>
                          </div>
                        </template>
                      </bz-upload-cropper>
                    </div>
                  </div>
                                                                                                                                                                                                                        
                  <!-- gallery -->
                  <div class="form-group">
                    <div class="input-group">
                      <bz-upload-cropper :field="'gallery'" :customUploadData="customUploadData('gallery')" :button="'Upload'" :crop="false" :multiple="true" :inputAccept="'image/*'" :uploadUrl="multiUrl" @bz:imageuploaded="onImageUploaded" :label="'Thư viện ảnh'">
                        <template slot="bz:preview" >
                          <div class="preview-block">
                            <div class="preview-content" v-for="(item, index) in formData.gallery">
                              <img class="img img-responsive img-preview" :src="webUrl+'/'+item" alt="" width="100px" height ="100px">
                              <span class="glyphicon glyphicon-remove remove-imgcustom" @click="removeImage('multi','gallery', index)"></span>
                            </div>
                          </div>
                        </template>
                      </bz-upload-cropper>
                    </div>
                  </div>
                                                                                                                                                                                                                                                            
                  <!-- date -->
                  <div class="form-group">
                    <div class="input-group">
                      <label class="typo__label">Ngày</label>
                      <div>
                        <datepicker v-model="formData.date" :config="dateOptdate" readonly></datepicker>
                      </div>
                    </div>
                  </div>
                                                                                                                                                                                                                        
                  <!-- date_range -->
                  <div class="form-group">
                    <div class="input-group">
                      <label class="typo__label">Khoảng thời gian</label>
                      <div>
                        <datepicker v-model="formData.date_range" placeholder="Selected date" :config="dateOptdate_range" readonly></datepicker>
                      </div>
                    </div>
                  </div>
                                                                                                                                                                  
                  <!-- category -->
                  <div class="form-group">
                    <div class="input-group">
                      <label class="typo__label">Danh mục</label>
                      <multiselect v-model="formData.category" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="_id" :options="categorys" :multiple="true"></multiselect>
                      <!-- <pre class="language-json"><code>{{ formData.category  }}</code></pre> -->
                    </div>
                  </div>
                                                                                                                                                                                    
                  <!-- option -->
                  <div class="form-group">
                    <div class="input-group">
                      <label class="typo__label">Loại</label>
                      <multiselect v-model="formData.option" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="value" track-by="key" :options="options"></multiselect>
                      <!-- <pre class="language-json"><code>{{ formData.option  }}vv</code></pre> -->
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
      this.getOptionSelect();                                          
      this.formatDateRange(this.selectItem.date_range, 'date_range');                      }
  },
  computed: {
    ...mapGetters({
      selectItem: 'selectItem',
      alertMessage: 'alertMessage'
    })
  },
  data () {
    return {
      titleForm: 'Add Test',
      webUrl: window.webUrl,
      multiUrl: `${window.apiUrl}/upload/multi-image`,
      froalaConfig: {
        // full document here : https://www.froala.com/wysiwyg-editor/docs/options
        imageUploadURL: `${window.apiUrl}/upload/image`,
        imageUploadParams: {type: 'wysiwyg/test'}
        // document here : https://www.froala.com/wysiwyg-editor/docs/concepts/file/upload
      },
      submited :false,
      removeImageList: [],                                                
      categorys: [],      
      options: [],                                                                                    
      dateOptdate: { enableTime: true, altFormat: 'H:m d/m/Y', altInput: true},                        
      dateOptdate_range: { altFormat: 'd/m/Y', altInput: true, mode: 'range'},                                    
      formData: {
        title: '',        
        slug: '',        
        num: 0,        
        description: '',        
        thumb: '',        
        gallery: [],        
        date: null,        
        date_range: null,                        
        status: true
      }
    };
  },
  methods: {
    genaratorSlug: function (text) {
      this.formData.slug = text2Slug(text);
    },
    customUploadData: function (fieldName) {
      return { type: `test/${fieldName}` }
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

          /* Xử lý date range time */                                                                      
          if(this.formData.date_range){
            let arr = this.formData.date_range.split(' to ');
            if(arr.length == 2)
              this.formData.date_range = { startDate: arr[0], endDate: arr[1] };
            else
              delete this.formData.date_range;
          }                              

          /* Xử lý select, multiselect */                                                                                
          this.formData.category = _.map(this.formData.category, '_id');          
          if(this.formData.option)
            this.formData.option = this.formData.option.key;          

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
            'apiUrl': UrlService.API_TEST,
            'routeDetail': '/test',
            'redirect': thenBackToList? {
              route: '/tests'
            } : null
          });
                                                                                          
          this.formatSelect(this.categorys, 'category', '_id');          
          this.formatSelect(this.options, 'option', 'key');                                                                                
          this.formatDateRange(this.formData.date_range, 'date_range');                              
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
      
      API.getItems({apiUrl:`${window.adminUrl}/category`,params:{notPaginate:true}})
      .then(res => {
        if (res.status === 200 && res.data){
          this.categorys = res.data.data;
          this.formatSelect(this.categorys, 'category', '_id');
        }
        else
          this.$toastr('error', 'Get data error', 'Error') 
      })
      
      this.options = [{key:'1', value:'option 1'},{key:'2', value:'option 2'},{key:'3', value:'option 3'}]
      this.formatSelect(this.options, 'option', 'key');
      
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
      this.titleForm = 'Edit Test';
      this.$store.dispatch("getItemById", {
        'id': this.$route.params.id,
        'apiUrl': UrlService.API_TEST
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
