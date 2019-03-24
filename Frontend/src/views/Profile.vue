<template>
  <div v-if="profile !== null">
    <h3>{{ profile.firstname + ' ' + profile.lastname }}</h3>
    <p>{{ profile.homeaddress }}</p>
    <h4>{{ $t('skills') }}</h4>
    <ul>
      <li v-for="(skill, index) in skills" :key="'skill-' + index">{{ skill }}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapState([
      'profile'
    ]),
    skills () {
      return this.profile !== null && this.profile.skills !== undefined ? this.profile.skills.split(',') : []
    }
  },
  created () {
    this.$store.dispatch('getProfile')
  }
}
</script>

<style>

</style>
