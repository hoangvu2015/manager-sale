<template>
  <div class="hello">
    <h1 v-html="msg"></h1>
    <img :src="profilePicture" alt="profile" class="profile-picture"/>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    props: ['profile'],
    computed: {
      msg () {
        return 'Welcome <b><i>' + this.profile.name + '</i></b> to Vue.js'
      },
      profilePicture () {
        return (this.profile.id)
          ? 'https://graph.facebook.com/' + this.profile.id + '/picture?width=300' : '/static/man.gif'
      }
    }
  }
</script>
