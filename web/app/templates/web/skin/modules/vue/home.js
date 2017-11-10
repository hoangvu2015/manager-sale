import Vue from 'vue';
import myUpload from './components/crop_upload_2.component.vue';
// import VueCoreImageUpload from 'vue-core-image-upload';

let homeVue = null;
if (document.getElementById("home")) {
  homeVue = new Vue({
    el: '#home',
    // components: {
    //   'vue-core-image-upload': VueCoreImageUpload,
    // },
    data() {
      return {
        uploadUrl : settings.services.apiUrl + '/upload/image',
        src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
        headers: {
          'Content-Type':'multipart/form-data'
        },
        uploadData: {

        }
      }
    },
    methods: {
      errorhandle(res){
        console.log('res', res)
      },
      imagechanged(e) {
        console.log('e', e);
        this.step += 1;
      },

      imageuploading(e) {
        this.step += 1;
      },

      imageuploaded(res) {
        this.step += 1;
        // this.src = res.data.src;
        console.log('res', res);
      }
    }
  });
}

export default homeVue;
window.homeVue = homeVue;