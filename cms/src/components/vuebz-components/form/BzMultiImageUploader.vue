<template>
  <div class="input-group">
    <dropzone 
    id="myVueDropzone" 
    ref="dropzone" 
    :url="uploadUrl" 
    :duplicateCheck="true" 
    :useFontAwesome="true" 
    :acceptedFileTypes="'image/*'"
     :maxFileSizeInMB="maxFileSizeInMB" 
     :maxNumberOfFiles="maxNumberOfFiles" 
     :uploadMultiple="true" 
     :autoProcessQueue="false" 
     :paramName="'files'" 
     :headers="headers" 
     :confirm="dropZoneConfirm" 
     :preview-template="dropZoneTemplate"
     @vdropzone-success="dropZoneSuccess" 
     @vdropzone-error="dropZoneError" 
     @vdropzone-file-added="dropZoneFileAdded" 
     @duplicate-file="dropZoneDupicate"
     @vdropzone-removed-file="dropzoneRemovedFile" 
     @vdropzone-file-added-manually="dropzoneFileAddedManually"
     :withCredentials="true">
      <!-- Optional parameters if any! -->
      <!-- <input type="hidden" name="token" value="xxx"> -->
    </dropzone>

    <label class="control-label" for="myVueDropzone">Gallery</label>
    <i class="bar"></i>
    <div class="div-btn-upload">
      <button class="btn btn-info focus btn-micro" @click="uploadAllMultiImages">
        <div class="btn-with-icon-content">
          <i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload all
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone';
const eventPrefix = 'bzDropZone:';

XMLHttpRequest.prototype.wrappedSetRequestHeader =
  XMLHttpRequest.prototype.setRequestHeader;

// Override the existing setRequestHeader function so that it stores the headers
XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
  // Call the wrappedSetRequestHeader function first
  // so we get exceptions if we are in an erronous state etc.
  this.wrappedSetRequestHeader(header, value);

  // Create a headers map if it does not exist
  if (!this.headers) {
    this.headers = {};
  }

  // Create a list for the header that if it does not exist
  if (!this.headers[header]) {
    this.headers[header] = [];
  }

  // Add the value to the header
  this.headers[header].push(value);
}

function dataURItoBlob(dataURI) {
  'use strict'
  var byteString,
    mimestring

  if (dataURI.split(',')[0].indexOf('base64') !== -1) {
    byteString = atob(dataURI.split(',')[1])
  } else {
    byteString = decodeURI(dataURI.split(',')[1])
  }

  mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0]

  var content = new Array();
  for (var i = 0; i < byteString.length; i++) {
    content[i] = byteString.charCodeAt(i)
  }

  return new Blob([new Uint8Array(content)], { type: mimestring });
}

export default {
  components: {
    Dropzone
  },
  watch: {
    preDefineData: function(newVal) {
      if (this.$options.propsData.preDefineData.length) {
        for (let i = 0; i < this.$options.propsData.preDefineData.length; i++) {
          this.$refs.dropzone.manuallyAddFile(this.$options.propsData.preDefineData[i], this.$options.propsData.preDefineData[i].url, null, null, {});
        }
        this.$refs.dropzone.setOption('maxFiles', this.$refs.dropzone.dropzone.options.maxFiles + this.$options.propsData.preDefineData.length);
      }
    }
  },
  props: {
    uploadUrl: {
      type: String,
      default() {
        return `${window.apiUrl}/upload/multi-image`;
      }
    },
    maxFileSizeInMB: {
      type: Number,
      default() {
        return 1.5;
      }
    },
    maxNumberOfFiles: {
      type: Number,
      default() {
        return 4;
      }
    },
    preDefineData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      headers: {
        "Accept": "application/json",
        "Cache-Control": "no-cache",
        "X-Requested-With": "XMLHttpRequest",
        // "Content-Type": "multipart/form-data"
      }
    }
  },
  methods: {
    // for upload files "Dropzone" : https://github.com/rowanwins/vue-dropzone
    dropZoneSuccess(file, response) {
      console.log('Files was successfully uploaded');
      // console.log('res', response);
      var data = response.data.map(item=>{
        return {
          url: item.imgUrl,
          filename: item.filename,
          subFolder: item.subFolder
        }
      })
      this.$emit(eventPrefix + 'dropZoneSuccess', data, file );
    },
    dropZoneError(file, e) {
      this.$emit(eventPrefix + 'dropZoneError', file);
      // console.log('dropZoneError', file);
    },
    dropZoneDupicate(file) {
      this.$emit(eventPrefix + 'dropZoneDupicate', file);
      // alert('trùng file rồi chế ơi');
      // console.log('dropZoneDupicate', file);
    },
    dropZoneConfirm(question, accepted, rejected) {
      this.$emit(eventPrefix + 'dropZoneConfirm', question, accepted, rejected);
      // console.log('dropZoneConfirm question', question);
      // console.log('dropZoneConfirm accepted', accepted);
      // console.log('dropZoneConfirm rejected', rejected);
    },
    dropZoneFileAdded(file) {
      // console.log('A file was successfully added', file);

      let previewElm = $(file.previewElement).find('[data-dz-thumbnail]');
      let parentWidth = previewElm.parent().width();
      let parentHeight = previewElm.parent().height();

      setTimeout(function() {
        if (previewElm.width() != parentWidth || previewElm.height() != parentHeight) {
          previewElm.css('width', '100%');
          if (previewElm.height() < parentHeight) {
            previewElm.css('width', 'auto');
            previewElm.css('height', '100%');
            setTimeout(function() {
              previewElm.css('margin-left', -1 * Math.abs((previewElm.width() - parentWidth) / 2));
            });
          } else if (previewElm.height() > parentHeight) {
            setTimeout(function() {
              previewElm.css('margin-top', -1 * Math.abs((previewElm.height() - parentHeight) / 2));
            });
          }
        }

      }, 500);

    },
    dropZoneTemplate: function() {
      return `
                  <div class="dz-preview dz-file-preview">
                      <div class="dz-image" style="width: 200px;height: 200px;">
                          <img data-dz-thumbnail /></div>
                      <div class="dz-details">
                        <div class="dz-filename"><span data-dz-name></span></div>
                      </div>
                      <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
                      <div class="dz-error-message" style="width: 177px;font-size: 11px;top: 96%;left: 12%;"><span data-dz-errormessage></span></div>
                      <div class="dz-success-mark"><i class="fa fa-check"></i></div>
                      <div class="dz-error-mark" style="top: 0!important;"><i class="fa fa-close" style="right: 50%;margin-right: -50px;top: 0;position: absolute;color: red!important;font-size: 8rem!important;"></i></div>
                  </div>
              `;
    },
    uploadAllMultiImages() {
      this.$refs.dropzone.dropzone.processQueue();
    },
    dropzoneRemovedFile(file, error, xhr){
      this.$emit(eventPrefix + 'dropzoneRemovedFile', file.name, error);
    },
    dropzoneFileAddedManually(files){
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">
  .div-btn-upload{
    text-align: right;
    margin-top: 2%;
    button{
        text-transform: initial
    }
  }
  .dz-image
  {
    border: solid 0.5px darkseagreen;
  }
</style>