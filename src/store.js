import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router.js'

Vue.use(Vuex)
let api = Axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/kenny/bugs'
})
export default new Vuex.Store({
  state: {
    bugs: [],  
  },
  mutations: {
    setBugs(state, data) {
      state.bugs = data
    }
  },
  actions: {
    createBug({commit, dispatch}, payload) {
      api.post('', payload)
        .then(res => {
          console.log(res)
          dispatch('getAllBugs')
      })
    },
    getAllBugs({ commit, dispatch }) {
      api.get('')
        .then(res => {
          console.log(res)
          commit('setBugs', res.data.results)
      })
    }
  }
})
