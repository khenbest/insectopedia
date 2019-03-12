
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
    activeBug: [],
    notes: []
  },
  mutations: {
    setBugs(state, data) {
      state.bugs = data
    },
    setId(state, data) {
      state.activeBug = data
    },
    getNotes(state, data) {
      state.notes = data
    }
  },
  actions: {
    createBug({ commit, dispatch }, payload) {
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
    },
    createNote({ commit, dispatch }) {
      let id = this.$store.state.activeBug
      api.post(`${id}/notes`)
        .then(res => {
          debugger
          console.log(res)
          dispatch('getNotes')
        })
    },
    getNotes({ commit, dispatch }) {
      let id = this.$store.state.activeBug
      api.get(`${id}/notes`)
        .then(res => {
          console.log(res)
          commit('getNotes')
        })
    },
    setId({ commit, dispatch }, payload) {
      commit('setId', payload)
    }
  }
})