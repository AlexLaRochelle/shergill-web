<template>
  <div>
    <div>
      <input v-model="username" :placeholder="$t('username')">
      <p v-if="displayRequired && username.length < 1" style="color: red">{{ $t('usernameRequired') }}</p>
    </div>
    <div>
      <input type="password" v-model="password" :placeholder="$t('password')">
      <p v-if="displayRequired && password.length < 1" style="color: red">{{ $t('passwordRequired') }}</p>
    </div>
    <button @click="login">{{ $t('login') }}</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      displayRequired: false
    }
  },
  methods: {
    login () {
      if (this.validateAll(this.username, this.password)) {
        this.$store.dispatch('login', {
          username: this.username,
          password: this.password
        })
      }
    },
    validateAll (user, pass) {
      this.displayRequired = true
      return this.username.length > 0 && this.password.length > 0
    }
  }
}
</script>

<style>

</style>
