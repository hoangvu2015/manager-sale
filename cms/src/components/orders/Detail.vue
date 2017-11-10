<template>
  <div class="form-elements">
    <div class="row">
      <div class="col-md-12">
        <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <bz-header routeList="orders" @save="save"></bz-header>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8">
        <vuestic-widget :headerText="titleForm">
          <form name="FormName">
            <div class="row">
              <div class="col-md-12">
                <fieldset>
                                                      
                  <!-- id_order -->
                  <div class="form-group">
                    <div class="input-group">
                      <input type="number" id="id_order" name="id_order" v-validate="'required'" v-model="formData.id_order"/>
                      <label class="control-label" for="id_order">id tăng tự động</label><i class="bar"></i>
                      <small v-show="errors.has('id_order') && submited" class="help text-danger">
                        {{ errors.first('id_order') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                    
                  <!-- name -->
                  <div class="form-group">
                    <div class="input-group">
                      <input id="name" name="name" v-validate="'required'" v-model="formData.name" />
                      <label class="control-label" for="name">Tên khách hàng</label><i class="bar"></i>
                      <small v-show="errors.has('name') && submited" class="help text-danger">
                        {{ errors.first('name') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                                      
                  <!-- link_facebook -->
                  <div class="form-group">
                    <div class="input-group">
                      <input id="link_facebook" name="link_facebook" v-validate="'required'" v-model="formData.link_facebook" />
                      <label class="control-label" for="link_facebook">Link Facebook</label><i class="bar"></i>
                      <small v-show="errors.has('link_facebook') && submited" class="help text-danger">
                        {{ errors.first('link_facebook') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                                      
                  <!-- phone -->
                  <div class="form-group">
                    <div class="input-group">
                      <input id="phone" name="phone" v-validate="'required'" v-model="formData.phone" />
                      <label class="control-label" for="phone">Số điện thoại</label><i class="bar"></i>
                      <small v-show="errors.has('phone') && submited" class="help text-danger">
                        {{ errors.first('phone') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                                      
                  <!-- address -->
                  <div class="form-group">
                    <div class="input-group">
                      <input id="address" name="address" v-validate="'required'" v-model="formData.address" />
                      <label class="control-label" for="address">Địa chỉ</label><i class="bar"></i>
                      <small v-show="errors.has('address') && submited" class="help text-danger">
                        {{ errors.first('address') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                                                        
                  <!-- total -->
                  <div class="form-group">
                    <div class="input-group">
                      <input type="number" id="total" name="total" v-validate="'required'" v-model="formData.total"/>
                      <label class="control-label" for="total">Tổng tiền</label><i class="bar"></i>
                      <small v-show="errors.has('total') && submited" class="help text-danger">
                        {{ errors.first('total') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                                      
                  <!-- ship_fee -->
                  <div class="form-group">
                    <div class="input-group">
                      <input type="number" id="ship_fee" name="ship_fee" v-validate="'required'" v-model="formData.ship_fee"/>
                      <label class="control-label" for="ship_fee">Tiền ship</label><i class="bar"></i>
                      <small v-show="errors.has('ship_fee') && submited" class="help text-danger">
                        {{ errors.first('ship_fee') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                    
                  <!-- id_ship -->
                  <div class="form-group">
                    <div class="input-group">
                      <input id="id_ship" name="id_ship" v-validate="'required'" v-model="formData.id_ship" />
                      <label class="control-label" for="id_ship">Mã đơn của bưu điện</label><i class="bar"></i>
                      <small v-show="errors.has('id_ship') && submited" class="help text-danger">
                        {{ errors.first('id_ship') }}
                      </small>
                    </div>
                  </div>
                                                                                                                                                                                                                                          
                  <!-- content -->
                  <div class="form-group">
                    <div class="input-group">
                      <froala :tag="'textarea'" :config="froalaConfig" id="content" v-model="formData.content"></froala>
                      <label class="control-label" for="content">Nội dung mua hàng</label><i class="bar"></i>
                    </div>
                  </div>
                                                                                                                                                                                                                                                                                                
                  <!-- date_order -->
                  <div class="form-group">
                    <div class="input-group">
                      <label class="typo__label">Ngày đặt hàng</label>
                      <div>
                        <datepicker v-model="formData.date_order" :config="dateOptdate_order" readonly></datepicker>
                      </div>
                    </div>
                  </div>
                                                                                                                                                                  
                  <!-- province -->
                  <div class="form-group">
                    <div class="input-group">
                      <label class="typo__label">Tỉnh thành</label>
                      <multiselect v-model="formData.province" tag-placeholder="Add this as new tag" placeholder="Search or add a tag" label="name" track-by="_id" :options="provinces"></multiselect>
                      <!-- <pre class="language-json"><code>{{ formData.province  }}vv</code></pre> -->
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
      this.getOptionSelect();                                                                      }
  },
  computed: {
    ...mapGetters({
      selectItem: 'selectItem',
      alertMessage: 'alertMessage'
    })
  },
  data () {
    return {
      titleForm: 'Add Order',
      webUrl: window.webUrl,
      multiUrl: `${window.apiUrl}/upload/multi-image`,
      froalaConfig: {
        // full document here : https://www.froala.com/wysiwyg-editor/docs/options
        imageUploadURL: `${window.apiUrl}/upload/image`,
        imageUploadParams: {type: 'wysiwyg/order'}
        // document here : https://www.froala.com/wysiwyg-editor/docs/concepts/file/upload
      },
      submited :false,
      removeImageList: [],                                                            
      provinces: [],                                                                                                                        
      dateOptdate_order: { altFormat: 'd/m/Y', altInput: true},                              
      formData: {
        id_order: 0,        
        name: '',        
        link_facebook: '',        
        phone: '',        
        address: '',        
        total: 0,        
        ship_fee: 0,        
        id_ship: '',        
        content: '',        
        date_order: null,                
        status: true
      }
    };
  },
  methods: {
    genaratorSlug: function (text) {
      this.formData.slug = text2Slug(text);
    },
    customUploadData: function (fieldName) {
      return { type: `order/${fieldName}` }
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

          /* Xử lý select, multiselect */                                                                                                    
          if(this.formData.province)
            this.formData.province = this.formData.province._id;          

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
            'apiUrl': UrlService.API_ORDER,
            'routeDetail': '/order',
            'redirect': thenBackToList? {
              route: '/orders'
            } : null
          });
                                                                                                              
          this.formatSelect(this.provinces, 'province', '_id');                                                                                                                        
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
      
      API.getItems({apiUrl:`${window.adminUrl}/province`,params:{notPaginate:true}})
      .then(res => {
        if (res.status === 200 && res.data){
          this.provinces = res.data.data;
          this.formatSelect(this.provinces, 'province', '_id');
        }
        else
          this.$toastr('error', 'Get data error', 'Error') 
      })
      
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
      this.titleForm = 'Edit Order';
      this.$store.dispatch("getItemById", {
        'id': this.$route.params.id,
        'apiUrl': UrlService.API_ORDER
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
