<template>
    <div class="login">
        <h2>Login CMS</h2>
        <form method="post" action="/auth/login" name="login">
            <div class="form-group">
                <div class="input-group">
                    <input type="text" id="email" name="email" v-validate="'required|email'" v-model="email"/>
                    <label class="control-label" for="email">Email</label><i class="bar"></i>
                    <small v-show="errors.has('email')" class="help text-danger">
                        {{ errors.first('email') }}
                    </small>
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <input type="password" id="password" name="password" v-validate="'required|min: 6'" v-model="password"/>
                    <label class="control-label" for="password">Password</label><i class="bar"></i>
                    <small v-show="errors.has('password')" class="help text-danger">
                        {{ errors.first('password') }}
                    </small>
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <button class="btn btn-primary" @click.prevent="login" type="submit">Log In</button>
                </div>
            </div>

            <div class="form-group">
                <div class="input-group">
                    <small v-show="result.message" class="alert" :class="result.success ? 'alert-success' : 'alert-danger'">
                        {{ result.message }}
                    </small>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'login',
        data() {
            return {
                email: '',
                password: '',
                result: {
                    success: Boolean,
                    message: String()
                }
            }
        },
        methods: {
            login() {
                let vm = this

                this.$validator.validateAll()
                    .then(resp => {
                        if (resp) {
                            let submitData = {
                                email: vm.email,
                                password: vm.password
                            };

                            this.$store.dispatch("login", submitData)
                        }
                    })
            }
        },
        computed: {
            ...mapGetters({
                authResult: 'authResult'
            })
        },
        watch: {
            authResult(newV) {
                Object.assign(this.result, newV)

                if (newV.success && newV[tokenKey]) {
                    this.$cookie.set(tokenKey, newV[tokenKey])
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 500)
                }
            },

            email() {
                this.result.message = String()
            },

            password() {
                this.result.message = String()
            }
        },
        mounted() {
            // this.$validator.validateAll()
        }
    }
</script>

<style lang="scss">
    @import '../../../sass/variables';
    @import '../../../../node_modules/bootstrap/scss/mixins/breakpoints';
    @import '../../../../node_modules/bootstrap/scss/variables';

    .login {
        @include media-breakpoint-down(md) {
            width: 100%;
            padding-right: 2rem;
            padding-left: 2rem;
            .down-container {
                .link {
                    margin-top: 2rem;
                }
            }
        }

        h2 {
            text-align: center;
        }
        width: 21.375rem;

        .down-container {
            margin-top: 3.125rem;
        }
    }
    .alert {
        width: 100%;
    }
</style>
