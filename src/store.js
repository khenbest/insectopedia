
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
    notes: []
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
      state.notes = data
    }
  },
  actions: {
    //#region --AUTH--
    authenticate({ commit, dispatch }) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          commit('setUser', { uid: res.user.uid, name: res.user.displayName, email: res.user.email })
          router.push({ name: 'BugLog', params: { uid: user.uid } })
        }
        else {
          dispatch('logout')
        }
      }).catch(e => console.error(e))
    },
    googleLogin({ commit }) {
      const google = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(google)
        .then(res => {
          console.log(res.user)
          commit('setUser', { uid: res.user.uid, name: res.user.displayName, email: res.user.email })
          router.push({
            name: 'BugLog',
            params: { user: { uid: res.user.uid, name: res.user.displayName, email: res.user.email } }
          })
        }).catch(e => console.error(e))
    },
    githubLogin({ commit }) {
      const github = new firebase.auth.GithubAuthProvider()
      firebase.auth().signInWithPopup(github)
        .then(res => {
          console.log(res.user)
          commit('setUser', res.user)
          router.push({
            name: 'BugLog',
            params: { user: { uid: res.user.uid, name: res.user.displayName, email: res.user.email } }
          })
        }).catch(e => console.error(e))
    },
    emailLogin({ commit }, user) {
      firebase.auth().signInAndRetrieveDataWithEmailAndPassword(user.email, user.password)
        .then(res => {
          commit('setUser', res.user)
          router.push({ name: 'BugLog', params: { uid: res.user.uid } })
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
          commit('setActiveBug', snap.data())
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
    createNote({ dispatch }, payload) {
      db.collection('bugs/' + payload.bugId + '/notes').add(payload)
        .then(() => {
          dispatch('getNotes', payload.bugId)
        }).catch(e => console.log(e))
    },
    getNotes({ commit }, payload) {
      db.collection('bugs/' + payload + '/notes').get()
        .then(snap => {
          console.log(snap)
          let notes = []
          snap.docs().forEach(doc => {
            let note = doc.data()
            note.id = doc.id
            notes.push(note)
          })
          commit('setNotes', notes)
        }).catch(e => console.log(e))
    }
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