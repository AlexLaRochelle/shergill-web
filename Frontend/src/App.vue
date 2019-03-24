<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">{{ $t('home') }}</router-link> |
      <router-link to="/about">{{ $t('about') }}</router-link> |
      <span v-if="isLoggedIn">
        <router-link to="/jobs">{{ $t('jobs') }}</router-link> |
      </span>
      <span v-if="!isLoggedIn">
        <router-link to="/login">{{ $t('login') }}</router-link> |
      </span>
      <span v-else>
        <router-link to="/profile">{{ $t('profile') }}</router-link> |
        <button @click="logout">{{ $t('logout') }}</button> |
      </span>
      <select v-model="$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang.toUpperCase() }}</option>
      </select>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      langs: ['en', 'fr']
    }
  },
  computed: {
    ...mapState([
      'isLoggedIn'
    ])
  },
  methods: {
    logout () {
      this.$store.commit('logout')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
