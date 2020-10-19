import store from '../store'

export default function (to, from, next) {
  if (store.getters.user) {
    next()
  } else {
    next('/mayrkatarn.pages/app-evil-2/login?loginError=true')
  }
}