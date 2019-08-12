import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'
Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('setUser', { uid: user.uid, name: user.displayName, email: user.email })
  }
  else {
    router.push('/')
  }
  new Vue({
    router,
    store,
    render: function (h) { return h(App) }
  }).$mount('#app')
})
