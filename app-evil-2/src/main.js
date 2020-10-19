import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import JoinModalComponent from '@/components/Shared/JoinModal'
import firebase from 'firebase/app'
import 'firebase/auth'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.component('app-join-modal', JoinModalComponent)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    var firebaseConfig = {
      apiKey: "AIzaSyBMreHyAnUEYTA-mLOeMQYJtiUQe37oyLs",
      authDomain: "app-of-evil.firebaseapp.com",
      databaseURL: "https://app-of-evil.firebaseio.com",
      projectId: "app-of-evil",
      storageBucket: "app-of-evil.appspot.com",
      messagingSenderId: "487567609336",
      appId: "1:487567609336:web:8ef211a2be2a464c915a0d",
      measurementId: "G-X1Z78TPLD9"
    }
    firebase.initializeApp(firebaseConfig)
    firebase.analytics()
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchEvils')
  }
}).$mount('#app')
