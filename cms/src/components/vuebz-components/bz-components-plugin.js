import BzDataTable from 'src/components/vuebz-components/bz-datatable/BzDataTable';
import BzHeader from 'src/components/vuebz-components/BzHeader.vue';
import BzAlert from 'src/components/vuebz-components/BzAlert.vue';
import BzSingleImageCropper from 'src/components/vuebz-components/form/BzSingleImageCropper.vue';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import Datepicker from 'vue-bulma-datepicker';

const BzComponentsPlugin = {
    install(Vue, options) {
        Vue.component(BzDataTable.name, BzDataTable)
        Vue.component(BzHeader.name, BzHeader)
        Vue.component(BzAlert.name, BzAlert)
        Vue.component(BzSingleImageCropper.name, BzSingleImageCropper)
        Vue.component('multiselect', Multiselect)
        Vue.component('datepicker', Datepicker)
    }
}

export default BzComponentsPlugin