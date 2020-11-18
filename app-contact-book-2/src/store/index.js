import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    contacts: [
      {
        name: 'Anna Lapina',
        fields: [
          {type: 'Phone', value: '0123456789'},
          {type: 'E-mail', value: 'annalap@test.com'},
          {type: 'Website', value: 'annalap.com'}
        ],
        id: 0
      },
      {
        name: 'Richard Nixon',
        fields: [
          {type: 'Phone', value: '0987653241'},
          {type: 'Phone', value: '0975108574'},
          {type: 'E-mail', value: 'nixonthebestpresident@test.com'},
          {type: 'Website', value: 'nixonthebestpresident.com'}
        ],
        id: 1
      },
      {
        name: 'Dart Vader',
        fields: [
          {type: 'Phone', value: '325252342'},
          {type: 'E-mail', value: 'anakin@test.com'},
          {type: 'Website', value: 'deathstarmakespiupiu.com'},
          {type: 'Website', value: 'imyourfuther.com'}
        ],
        id: 2
      },
      {
        name: 'Obi-Wan Kenobi',
        fields: [
          {type: 'Phone', value: '9257288925'},
          {type: 'E-mail', value: 'kenobi@test.com'},
          {type: 'Website', value: 'hellothere.com'}
        ],
        id: 3
      }
    ],
    editing: false,
    isNewContact: false,
    lastId: 3
  },
  mutations: {
    // Creating new contact
    newContact(state) {
      state.lastId += 1
      state.contacts.push({name: 'New ' + state.lastId, fields: [{}], id: state.lastId})
      state.editing = true
      state.isNewContact = true
    },

    // Setter of information about contact from legacy
    setContact(state, {name, fields, id}) {
      const contact = state.contacts.find(key => {
        if (key.id === +id) {
          return key
        }
      })
      contact.name = name
      contact.fields = fields
    },

    // Setter of information about contact creation
    setIsNewContact(state, payload) {
      state.isNewContact = payload
    },

    // Setter of editing mode (toggle)
    editing(state) {
      state.editing = !state.editing
    },

    // Setter of editing mode to false
    setEditingFalse(state) {
      state.editing = false
    },

    // Return last id if creating of new contact was canceled
    returnLastId(state) {
      state.lastId -= 1
    }
  },
  actions: {
    newContact({commit}) {
      commit('newContact')
    },
    setContact({commit}, payload) {
      commit('setContact', payload)
    },
    setIsNewContact({commit}, payload) {
      commit('setIsNewContact', payload)
    },
    editing({commit}) {
      commit('editing')
    },
    setEditingFalse({commit}) {
      commit('setEditingFalse')
    },
    returnLastId({commit}) {
      commit('returnLastId')
    }
  },
  getters: {
    contacts(state) {
      return state.contacts.sort((a, b) => {
        let nameA = a.name.toLowerCase()
        let nameB = b.name.toLowerCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })
    },
    contactById(state) {
      return contactId => {
        return state.contacts.find(contact => {
          if (contact.id === +contactId) {
            return contact
          }
        })
      }
    },
    lastId(state) {
      return state.lastId
    },
    editing(state) {
      return state.editing
    },
    isNewContact(state) {
      return state.isNewContact
    }
  }
})
