<template>
  <div v-if="profile !== null">
    <table>
      <tr>
        <th>{{ $t('firstName') }}</th>
        <td><input v-model="profile.firstname"></td>
      </tr>
      <tr>
        <th>{{ $t('lastName') }}</th>
        <td><input v-model="profile.lastname"></td>
      </tr>
      <tr>
        <th>{{ $t('homeAddress') }}</th>
        <td><input v-model="profile.homeaddress"></td>
      </tr>
      <tr>
        <th>{{ $t('skills') }}</th>
        <td>
          <div v-for="(skill, index) in profile.skills" :key="'skill-' + index">
            {{ skill }} <button @click="deleteSkill">X</button>
          </div>
        </td>
      </tr>
    </table>
    <button @click="saveProfile">{{ $t('saveProfile') }}</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  computed: {
    ...mapState([
      'profile'
    ])
  },
  methods: {
    saveProfile () {
      this.$store.dispatch('updateProfile', {
        profile: this.profile
      })
    },
    deleteSkill (skill) {
      this.profile.skills.pop(skill)
    }
  },
  created () {
    this.$store.dispatch('getProfile')
  }
}
</script>

<style>

</style>
