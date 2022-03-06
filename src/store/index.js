import {createLogger, createStore } from 'vuex'

import Account from './Account'
import Role from './Role'
import auth from './Auth'
import project from './Project'

// const auth = {
//   namespaced: true,
//   state: {
//     account: {
//       email: ''
//     }
//   },
//   getters: {

//   },
//   mutations: {
//     setAccount(state, val) {
//       state.account = val
//     }
//   },
//   actions: {
//     async login({ commit }, account) {
//       const response = await http.post('/login', account)
//       if (response.data.status == 'success') {
//         var user = response.data.data
//         commit('setAccount', user)
//         sessionStorage.setItem('USER', JSON.parse(user))
//         console.log(sessionStorage.getItem('USER'));
//       }
//     }
//   }
// }


export default createStore({
  plugins:[createLogger()],
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    Account,
    Role,
    auth,
    project
  },
})

