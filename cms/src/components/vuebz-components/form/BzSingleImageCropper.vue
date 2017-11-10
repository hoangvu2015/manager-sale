<template>
  <div class="form-elements">
    <label class="control-label-cus" for="file">{{label}}</label>
    <div class="preview">
      <img v-if="imgUrl" class="img img-responsive img-preview" :src="webUrl+'/'+imgUrl" alt="" width="100px" height ="100px">
    </div>
    <slot name="bz:preview"></slot>
    <vue-core-image-upload
    class="btn btn-info focus btn-micro v-core-img-upload"
    :cropBtn="{'ok':'Upload Now','cancel':'Cancel'}"
    :crop="crop"
    :cropRatio="cropRatio"
    :inputOfFile="'file'"
    @imageuploaded="imageuploaded"
    :data="customUploadData"
    :inputAccept="inputAccept"
    :max-file-size="maxFileSize"
    :url="uploadUrl" 
    :text="button"
    :multiple="multiple"
    >
  </vue-core-image-upload>
  <i class="bar line-bar"></i>
</div>
</template>

<script>
//  https://github.com/Vanthink-UED/vue-core-image-upload
import VueCoreImageUpload from 'vue-core-image-upload'
import Axios from 'axios';

export default {
  name: 'bz-upload-cropper',
  data() {
    return {  
      cropImgSrc: ''
    }
  },
  props:{
    field: {
      type: String
    },
    multiple:{
      type: Boolean,
      default() {
        return false;
      }
    },
    customUploadData:{
      default() {
        return {
          type: '',
          filename: '',
          old_filename: ''
        }
      }
    },
    uploadUrl:{
      type: String,
      default() {
        return `${window.apiUrl}/upload/image`;
      }
    },
    webUrl:{
      type: String,
      default() {
        return window.webUrl;
      }
    },
    imgUrl: {
      type: String
    },
    cropRatio:{
      type: String,
      default() {
        return '1:1';
      }
    },
    crop:{
      default() {
        return 'local';
      }
    },
    inputAccept:{
      type: String,
      default() {
        return 'image/*';
      }
    },
    maxFileSize:{
      type: Number
    },
    label:{
      type: String,
      default() {
        return 'Image';
      }
    },
    button:{
      type: String,
      default() {
        return 'Upload & Crop';
      }
    }
  },
  components: {
    'vue-core-image-upload': VueCoreImageUpload,
  },
  methods: {
    imageuploaded(res) {
      if (res.status === 'OK') {
      }
      this.$emit('bz:imageuploaded', res, this.field);
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">
.g-core-image-upload-btn{
  margin-top: 2%;
  text-transform: initial
}
.preview{
  margin: 40px 10px 0 10px;
  .img-preview{
    border: solid 0.5px #4ae387;
  }
}
.v-core-img-upload{
  margin-bottom: 7px;
}
.line-bar{
  margin-top: 7px;
}
.control-label-cus {
  font-size: 0.6rem;
  color: #4ae387;
  font-weight: 600;
  text-transform: uppercase;
  top: -0.6rem;
  left: 0;
}
</style>