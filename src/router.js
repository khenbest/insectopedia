
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ActiveBug from './views/ActiveBug.vue'
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
      path: '/:bugId',
      name: 'bug',
      props: true,
      component: ActiveBug
    },
    {
      path: '/:bugId/notes',
      name: 'notes',
      props: true,
      component: Note
    }
  ]
})