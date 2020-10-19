import Vue from 'vue'
import Vuex from 'vuex'
import evils from './Evils'
import user from './user'
import shared from './shared'
import orders from './orders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    evils,
    user,
    shared,
    orders
  }
})
