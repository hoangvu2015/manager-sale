<template>
  <div id="app" class="app">
    <auth-layout v-if="isAuth"></auth-layout>
    <layout v-else></layout>
  </div>
</template>

<script>
	import Auth from './services/auth';
	import Layout from 'components/layout/Layout'
	import AuthLayout from './components/layout/AuthLayout'
	import VuesticPreLoader from './components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'
	import {mapGetters, mapActions} from 'vuex'

	export default {
		name: 'app',
		components: {
			VuesticPreLoader,
			AuthLayout,
			Layout
		},
		created() {

		},
		watch: {
			$route() {
				this.$store.dispatch("isLoggedIn", {})
			}
		},
		mounted() {

		},
		computed: {
			...mapGetters({
				authUser: 'authUser'
			}),
			isAuth () {
				return this.$route.path.match('auth')
			}
		}
	}
</script>

<style lang="scss">
  @import "sass/main";
  @import 'sass/_override-my-custom.scss';

  body {
    height: 100%;
    .app {
      height: 100%;
    }
  }
</style>