import Vue from 'vue'
import VueRouter from 'vue-router'
import ContactBook from '@/components/ContactBook'
import Contact from '@/components/Contact'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'book',
    component: ContactBook
  },
  {
    path: '/contact/:id',
    props: true,
    name: 'contact',
    component: Contact
  }  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (to.name === 'contact') {
      return { x: 0, y: 0 }
    } else {
      return savedPosition
    }
  }
})

export default router
