import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [
      {noteTitle: 'Shopping list', text: 'Milk, flour, eggs, sugar', active: false, id: 0},
      {noteTitle: 'Mike`s Birthday', text: '12 of December at 4:00 PM', active: false, id: 1},
      {noteTitle: 'Film list for weekend', text: 'John Wick 1-3, Expanse S1', active: false, id: 2}
    ],
    legacy: [
      {noteTitle: 'Shopping list', text: 'Milk, flour, eggs, sugar', active: false, id: 0},
      {noteTitle: 'Mike`s Birthday', text: '12 of December at 4:00 PM', active: false, id: 1},
      {noteTitle: 'Film list for weekend', text: 'John Wick 1-3, Expanse S1', active: false, id: 2}
    ],
    newNote: {noteTitle: '', text: '', active: false, id: 3},
    lastId: 3,
    loading: false
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setNote(state, {title, text, id, isNew}) {
      if (!isNew) {
        const note = state.notes.find(key => {
          if (key.id === +id) {
            return key
          }
        })
        note.noteTitle = title
        note.text = text
      } else {
        state.notes.push(state.newNote)
        state.legacy = JSON.parse(JSON.stringify(state.notes))
        state.lastId += 1
        state.newNote = {noteTitle: '', text: '', active: false, id: state.lastId}
      }
    },
    cancelNote(state, payload) {
      if (payload) state.legacy = JSON.parse(JSON.stringify(state.notes))
      else state.newNote = {noteTitle: '', text: '', active: false, id: state.lastId}
    },
    deleteNotes(state) {
      let n = Object.assign([], state.notes)
      n.forEach(note => {
        if (note.active) {
          state.notes.splice(state.notes.indexOf(note), 1)
        }
      })
      state.legacy = JSON.parse(JSON.stringify(state.notes))
    }
  },
  actions: {
    setLoading({commit}, payload) {
      commit('setLoading', payload)
    },
    setNote({commit}, payload) {
      commit('setLoading', true)
      setTimeout(() => {
        commit('setNote', payload)
        commit('setLoading', false)
      }, 1200)
    },
    cancelNote({commit}, payload) {
      commit('cancelNote', payload)
    },
    deleteNotes({commit}) {
      commit('deleteNotes')
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    notes(state) {
      return state.notes
    },
    newNote(state) {
      return state.newNote
    },
    legacyNote(state) {
      return noteId => {
        return state.legacy.find(note => {
          if (note.id === +noteId) {
            return note
          }
        })
      }
    }
  }
})
