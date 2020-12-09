import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './auth-guard'
import Home from '@/components/Home'
import Survey from '@/components/Survey'
import NewSurvey from '@/components/NewSurvey'
import MySurveys from '@/components/MySurveys'

Vue.use(VueRouter)

const routes = [
  {
    path: '/app-inquirer/',
    name: 'home',
    component: Home
  },
  {
    path: '/app-inquirer/survey/:id',
    props: true,
    name: 'survey',
    component: Survey
  },
  {
    path: '/app-inquirer/new',
    name: 'new',
    component: NewSurvey,
    beforeEnter: AuthGuard
  },
  {
    path: '/app-inquirer/my',
    props: true,
    name: 'my',
    component: MySurveys,
    beforeEnter: AuthGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.name === 'survey' || to.name === 'home') {
      return { x: 0, y: 0 }
    } else {
      return savedPosition
    }
  }
})

export default router
