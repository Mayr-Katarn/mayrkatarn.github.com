import store from '../store'

export default function (to, from, next) {
  if (store.getters.currentUser) {
    next()
  } else {
    next('/app-inquirer/?login=false')
  }
}