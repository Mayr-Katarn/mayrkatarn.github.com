import Vue from 'vue'
import Vuex from 'vuex'
import json from './json/users.json'

Vue.use(Vuex)

class Contact {
  constructor(name, username, email, address, phone, website, company, posts, accountHistory, favorite, avatar, id) {
    this.name = name
    this.username = username
    this.email = email
    this.address = address
    this.phone = phone
    this.website = website
    this.company = company
    this.posts = posts
    this.accountHistory = accountHistory
    this.favorite = favorite
    this.avatar = avatar
    this.id = id
  }
}

export default new Vuex.Store({
  state: {
    contacts: [],
    loading: false,
    favorits: false,
    search: ''
  },
  mutations: {
    // sending contact list to state
    loadContacts(state, payload) {
      state.contacts = payload
    },

    // updating loading state
    setLoading(state, payload) {
      state.loading = payload
    },

    // updating favorits state
    setFavorits(state, payload) {
      state.favorits = payload
    },

    // updating search state
    setSearch(state, payload) {
      state.search = payload
    },

    // updating information about contact and sort updated contact list
    updateContact(state, {name, phone, email, website, streetA, streetB, streetC, streetD, city, cState, country, zipcode, companyName, catchPhrase, bs, id}) {
      const contact = state.contacts.find(key => {
        if (key.id === id) {
          return key
        }
      })
      contact.name = name
      contact.phone = phone
      contact.email = email
      contact.website = website
      contact.address.streetA = streetA
      contact.address.streetB = streetB
      contact.address.streetC = streetC
      contact.address.streetD = streetD
      contact.address.city = city
      contact.address.cState = cState
      contact.address.country = country
      contact.address.zipcode = zipcode
      contact.company.name = companyName
      contact.company.catchPhrase = catchPhrase
      contact.company.bs = bs
      state.contacts.sort((a, b) => {
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
    }
  },
  actions: {
    setLoading({commit}, payload) {
      commit('setLoading', payload)
    },
    setFavorits({commit}, payload) {
      commit('setFavorits', payload)
    },
    setSearch({commit}, payload) {
      commit('setSearch', payload)
    },
    fetchContacts({commit}) {
      commit('setLoading', true)
      const contactsDB = []
      const contacts = json
      Object.keys(contacts).forEach(key => {
        const contact = contacts[key]
        contactsDB.push(
          new Contact(
            contact.name,
            contact.username,
            contact.email,
            contact.address,
            contact.phone,
            contact.website,
            contact.company,
            contact.posts,
            contact.accountHistory,
            contact.favorite,
            contact.avatar,
            contact.id
          )
        )
      })
      contactsDB.sort((a, b) => {
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
      commit('loadContacts', contactsDB)
      commit('setLoading', false)
    },
    updatedContact({commit}, {name, phone, email, website, streetA, streetB, streetC, streetD, city, cState, country, zipcode, companyName, catchPhrase, bs, id}) {
      commit('setLoading', true)
      commit('updateContact', {name, phone, email, website, streetA, streetB, streetC, streetD, city, cState, country, zipcode, companyName, catchPhrase, bs, id})
      commit('setLoading', false)
    }
  },
  getters: {
    // sending contact list from state
    contacts(state) {
      return state.contacts
    },

    // sending information about loading
    loading(state) {
      return state.loading
    },

    // sending information about searching by favorite
    favorits(state) {
      return state.favorits
    },

    // searching favorit contacts in state and sending it
    contactsByFavorit(state) {
      return state.contacts.filter(contact => contact.favorite === true)
    },

    // sending information about searching state
    search(state) {
      return state.search
    },

    // searching contact by name in state and sending it
    contactsByName(state) {
      return state.contacts.filter(contact => contact.name.toLowerCase().indexOf(state.search) > -1)
    },

    // searching contact by id in state and sending it
    contactById (state) {
      return contactId => {
        return state.contacts.find(contact => {
          if (contact.id === +contactId) {
            return contact
          }
        })
      }
    }
  }
})
