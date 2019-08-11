
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ActiveBug from './views/ActiveBug.vue'
import BugLog from './views/BugLog.vue'

import Note from './components/Note.vue'


Vue.use(Router)

export default new Router({

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/bug-log',
      name: 'BugLog',
      props: true,
      component: BugLog
    },
    {
      path: '/:bugId',
      name: 'ActiveBug',
      props: true,
      component: ActiveBug
    },

  ]
})