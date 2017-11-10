<template>
    <transition name="fade">
        <div class='vuestic-alert alert' :class="alertClass" v-if="show && !hidden">
            <span class="badge badge-pill badge-success">{{title}}</span>
            {{text}}
            <i class="fa fa-close alert-close"></i>
            <i class="fa fa-close alert-close" v-if="withCloseBtn" @click="hide()"></i>
        </div>
    </transition>

</template>

<script>
    export default {
        name: 'bz-alert',
        computed: {
            alertClass () {
                return {
                    'with-close': this.withCloseBtn,
                    'alert-success': this.type === 'success',
                    'alert-danger': this.type === 'danger',
                    'alert-warning': this.type === 'warning',
                    'alert-info': this.type === 'info'
                }
            }
        },
        props: {
            type: {
                type: String,
                default: 'success'
            },
            withCloseBtn: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: 'Success'
            },
            text: {
                type: String,
                default: ''
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                hidden: false
            }
        },
        methods: {
            hide () {
                this.hidden = true
            }
        }
    }
</script>

<style lang='scss' scoped>
    @import '../../sass/variables';

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
    {
        opacity: 0
    }
</style>
