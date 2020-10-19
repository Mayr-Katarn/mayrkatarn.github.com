import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import AuthGuard from './auth-guard'
import Evil from '@/components/Evils/Evil'
import EvilList from '@/components/Evils/EvilList'
import NewEvil from '@/components/Evils/NewEvil'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'


Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/evil/:id',
    props: true,
    name: 'evil',
    component: Evil
  },
  {
    path: '/list',
    name: 'list',
    component: EvilList,
    beforeEnter: AuthGuard
  },
  {
    path: '/new',
    name: 'new',
    component: NewEvil,
    beforeEnter: AuthGuard
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter: AuthGuard
  }
]


const router = new VueRouter({
  routes,
  mode: 'history' // убирает # в роуте
})

export default router
