
import Vue from 'vue'
import Vuex from 'vuex'
// import Axios from 'axios'
import router from './router.js'
import firebase from 'firebase'
import db from '../utils/firebaseInit'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: {},
    bugs: [],
    activeBug: {},
    notes: [],
    observers: () => { }
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    },
    setBugs(state, data) {
      state.bugs = data
    },
    setActiveBug(state, data) {
      state.activeBug = data
    },
    setNotes(state, data) {
      Vue.set(state.notes, data.bugId, data.notes)
    },
    setObservers(state, data) {
      state.observers()
      state.observers = data
    }
  },
  actions: {
    //#region --AUTH--
    googleLogin({ commit }) {
      const google = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(google)
        .then(res => {
          commit('setUser', { uid: res.user.uid, name: res.user.displayName, email: res.user.email })
          router.push({
            name: 'BugLog',

          })
        }).catch(e => console.error(e))
    },
    githubLogin({ commit }) {
      const github = new firebase.auth.GithubAuthProvider()
      firebase.auth().signInWithPopup(github)
        .then(res => {
          commit('setUser', { uid: res.user.uid, name: res.user.displayName, email: res.user.email })
          router.push({
            name: 'BugLog'
          })
        }).catch(e => console.error(e))
    },
    emailLogin({ commit }, user) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          commit('setUser', { uid: res.user.uid, name: res.user.displayName, email: res.user.email })
          router.push({ name: 'BugLog' })
        })
        .catch(e => console.error(e))
    },
    register({ dispatch }, user) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          firebase.auth().currentUser.updateProfile({ displayName: user.displayName })
          dispatch('validateEmail')
        })
    },
    logout({ commit }) {
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', {})
          router.push({ name: 'home' })

        })
        .catch(e => console.error(e))
    },
    //#endregion --AUTH--

    //#region --Bugs--
    getAllBugs({ commit, dispatch }) {
      db.collection('bugs').get()
        .then(snap => {
          let bugs = []
          snap.docs.forEach(doc => {
            let bug = doc.data()
            bug.id = doc.id
            bugs.push(bug)
          })
          commit('setBugs', bugs)
        }).catch(e => console.log(e))
    },
    createBug({ dispatch }, payload) {
      db.collection('bugs').add(payload)
        .then(res => {
          console.log(res)
          dispatch('getAllBugs')
        }).catch(e => console.log(e))
    },
    setActiveBug({ commit, dispatch }, bugId) {
      db.doc('bugs/' + bugId).get()
        .then(snap => {
          console.log(snap.data())
          commit('setActiveBug', snap.data())
          dispatch('getNotes', bugId)
          router.push({ name: 'ActiveBug', params: { bugId: bugId } })
        }).catch(e => console.log(e))
    },
    editBugStatus({ commit, dispatch }, payload) {
      db.doc('bugs/' + payload.id).update({ status: payload.status })
        .then(() => {
          dispatch('getAllBugs')
        }).catch(e => console.log(e))
    },
    deleteBug({ commit, dispatch }, payload) {
      db.doc('bugs/' + payload).delete()
        .then(() => {
          dispatch('getAllBugs')
        }).catch(e => console.log(e))
    },

    //#endregion --Bugs--

    //#region  -- Notes --
    getNotes({ commit }, payload) {
      commit('setObservers', db.collection('bugs/' + payload + '/notes').onSnapshot(snap => {
        let notes = []
        snap.forEach(doc => { notes.push({ ...doc.data(), id: doc.id }) })
        commit('setNotes', { notes, bugId: payload })
      }))
    },
    createNote({ dispatch }, payload) {
      db.collection('bugs/' + payload.bugId + '/notes').add(payload)
        .then(() => {
          dispatch('getNotes', payload.bugId)
        }).catch(e => console.log(e))
    },

    deleteNote({ dispatch }, payload) {
      db.collection('bugs').doc(payload.bugId).collection('notes').doc(payload.id).delete()
        .then(() => {
          dispatch('getNotes', payload.bugId)
        }).catch(e => console.log(e))
    },
    //#endregion  -- Notes --

  },
  getters: {
    IsAuthor: () => (id) => {
      return id == firebase.auth().currentUser.uid
    },
    AuthorCreds() {
      let user = firebase.auth().currentUser
      return {
        name: user.displayName,
        uId: user.uid
      }
    }
  }
})