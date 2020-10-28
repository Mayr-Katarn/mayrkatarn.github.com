import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import EditModalComponent from '@/components/EditContactModal'

Vue.config.productionTip = false
Vue.component('app-edit-contact-modal', EditModalComponent)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.dispatch('fetchContacts') // resiving contact list from JSON file, sort it by name and writing it in application state
  }
}).$mount('#app')
