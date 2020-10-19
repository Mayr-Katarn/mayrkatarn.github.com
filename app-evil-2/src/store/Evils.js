import * as fb from 'firebase'

class Evil {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    evils: []
  },
  mutations: {
    newEvil (state, payload) {
      state.evils.push(payload)
    },
    loadEvils (state, payload) {
      state.evils = payload
    },
    updateEvil (state, {title, description, id}) {
      const evil = state.evils.find(a => {
        return a.id === id
      })
      evil.title = title
      evil.description = description
    }
  },
  actions: {
    async newEvil ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const nEvil = new Evil(
          payload.title, 
          payload.description, 
          getters.user.id, 
          '', 
          payload.promo
        )

        const evil = await fb.database().ref('evils').push(nEvil)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))

        await fb.storage().ref(`evils/${evil.key}${imageExt}`).put(image)
        const imageSrc = await fb.storage().ref(`evils/${evil.key}${imageExt}`).getDownloadURL()

        await fb.database().ref('evils').child(evil.key).update({
          imageSrc
        })

        commit('setLoading', false)
        commit('newEvil', {
          ...nEvil,
          id: evil.key,
          imageSrc
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async fetchEvils ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const resultEvils = []

      try {
        const database = await fb.database().ref('evils').once('value')
        const evils = database.val()

        Object.keys(evils).forEach(key => {
          const evil = evils[key]
          resultEvils.push(
            new Evil(evil.title, evil.description, evil.ownerId, evil.imageSrc, evil.promo, key)
          )
        })

        commit('loadEvils', resultEvils)
        commit('setLoading', false)
      } catch (error) {
        commit('setError')
        commit('setLoading', false)
        throw error
      }
    },
    async updatedEvil ({commit}, {title, description, id}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await fb.database().ref('evils').child(id).update({
          title,
          description
        })
        commit('updateEvil', {
          title,
          description,
          id
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    evils (state) {
      return state.evils
    },
    promos (state) {
      return state.evils.filter(evil => {
        return evil.promo
      })
    },
    myEvils (state, getters) {
      return state.evils.filter(evil => {
        return evil.ownerId === getters.user.id
      })
    },
    evilById (state) {
      return evilId => {
        return state.evils.find(evil => evil.id === evilId)
      }
    }
  }
}