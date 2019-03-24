import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var api = axios.create({
  baseURL: 'http://10.202.13.163:3000'
})

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    profileId: '',
    profile: null
  },
  mutations: {
    login (state, data) {
      state.isLoggedIn = data.isValid
      state.profileId = data.id
    },
    logout (state) {
      state.isLoggedIn = false
      state.profileId = ''
    },
    setProfile (state, profile) {
      profile.skills = profile.skills.split(',')
      state.profile = profile
    }
  },
  actions: {
    async login (context, { username, password }) {
      const response = await api.post('/login', {
        username: username,
        password: password
      })
      context.commit('login', response.data)
      return response
    },
    async getProfile (context) {
      const response = await api.get('/users/' + context.state.profileId)
      context.commit('setProfile', response.data)
      return response
    },
    async updateProfile (context, { profile }) {
      profile.skills = profile.skills.join(',')
      const response = await api.put('/users/' + context.state.profileId)
      context.commit('setProfile', profile)
      return response
    }
  }
})
