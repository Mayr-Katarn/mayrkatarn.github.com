import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import EditModalComponent from '@/components/EditModal'

Vue.config.productionTip = false
Vue.component('app-edit-modal', EditModalComponent)

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
