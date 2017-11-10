<template>
    <div class="form-elements">
        <div class="row">
            <div class="col-md-12">
                <bz-alert :type="alertMessage.type" :show="alertMessage.show" :title="alertMessage.title" :text="alertMessage.text"></bz-alert>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <bz-header routeList="contacts" @save="save"></bz-header>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <vuestic-widget headerText="Create Contact">
                    <form>
                        <div class="row">
                            <div class="col-md-12">
                                <fieldset>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="simple-input" v-validate="'required'" required v-model="formData.name" name="name"/>
                                            <label class="control-label" for="simple-input">Title</label><i class="bar"></i>
                                            <small v-show="errors.has('name')" class="help text-danger">
                                                {{ errors.first('name') }}
                                            </small>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="simple-input" required v-model="formData.email" v-validate="'required|email'" name="email"/>
                                            <label class="control-label" for="simple-input">Email</label><i class="bar"></i>
                                            <small v-show="errors.has('email')" class="help text-danger">
                                                {{ errors.first('email') }}
                                            </small>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <input id="simple-input" required v-model="formData.phone"/>
                                            <label class="control-label" for="simple-input">Phone</label><i class="bar"></i>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <textarea type="text" id="simple-textarea" required v-model="formData.address"></textarea>
                                            <label class="control-label" for="simple-textarea">Adrress</label><i class="bar"></i>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <textarea type="text" id="simple-textarea" required v-model="formData.message" v-validate="'required'" name="message"></textarea>
                                            <label class="control-label" for="simple-textarea">Message</label><i class="bar"></i>
                                            <small v-show="errors.has('message')" class="help text-danger">
                                                {{ errors.first('message') }}
                                            </small>
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
    import VuesticSwitch from 'components/vuestic-components/vuestic-switch/VuesticSwitch'
    import VuesticSimpleSelect from 'components/vuestic-components/vuestic-simple-select/VuesticSimpleSelect'
    import VuesticMultiSelect from 'components/vuestic-components/vuestic-multi-select/VuesticMultiSelect'
    import BzHeader from 'components/vuebz-components/BzHeader'
    import BzAlert from 'components/vuebz-components/BzAlert';
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Contact',
        components: {
            VuesticSwitch,
            VuesticSimpleSelect,
            VuesticMultiSelect,
            BzHeader,
            BzAlert
        },
        watch: {
            selectItem(){
                this.formData = this.selectItem;
            },
            $route(){
                let id = this.$route.params.id;
                if (id === undefined) {
                    this.formData = {};
                }
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
                formData: {
                    name: '',
                    email: '',
                    phone: '',
                    address: '',
                    message: '',
                    status: true
                }
            }
        },
        methods: {
            save(){
                this.$validator.validateAll()
                    .then(res => {
                        if (res) {
                            this.$store.dispatch("saveItem", {
                                'id': this.$route.params.id,
                                'formData': this.formData,
                                'apiUrl': window.apiUrl + '/contact'
                            });
                        }
                    });
            }
        },
        created () {
            let id = this.$route.params.id;
            if (id !== undefined) {
                this.$store.dispatch("getItemById", {
                    'id': this.$route.params.id,
                    'apiUrl': window.apiUrl + '/contact'
                });
            }
        },
        mounted(){
            this.$validator.validateAll();
        }
    }
</script>

<style lang="scss">
    .abc-checkbox, .abc-radio {
        display: flex !important;
        justify-content: flex-start;
    }

    input[type=checkbox]:disabled + label, input[type=radio]:disabled + label,
    input[type=checkbox]:disabled, input[type=radio]:disabled {
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