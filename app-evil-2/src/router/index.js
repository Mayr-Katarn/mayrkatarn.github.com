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
    path: '/mayrkatarn.pages/app-evil-2/',
    name: 'home',
    component: Home
  },
  {
    path: '/mayrkatarn.pages/app-evil-2/evil/:id',
    props: true,
    name: 'evil',
    component: Evil
  },
  {
    path: '/mayrkatarn.pages/app-evil-2/list',
    name: 'list',
    component: EvilList,
    beforeEnter: AuthGuard
  },
  {
    path: '/mayrkatarn.pages/app-evil-2/new',
    name: 'new',
    component: NewEvil,
    beforeEnter: AuthGuard
  },
  {
    path: '/mayrkatarn.pages/app-evil-2/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mayrkatarn.pages/app-evil-2/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/mayrkatarn.pages/app-evil-2/orders',
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
