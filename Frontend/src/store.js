import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

var api = axios.create({
  baseURL: 'http://10.202.13.163:3000'
})

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    login (state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn
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
    }
  }
})
