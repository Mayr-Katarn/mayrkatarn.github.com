export default {
  state: {
    currentUser: {
      nickname: 'user1',
      email: 'user1@test.com',
      password: 'qweqwe',
      uid: 0,
      ownwerOf: []
    },
    loginError: false,
    regError: false,
    users: [
      {
        nickname: 'user1',
        email: 'user1@test.com',
        password: 'qweqwe',
        uid: 0,
        ownwerOf: []
      }
    ],
    lastUid: 0
  },
  mutations: {
    loginUser(state, {email, password}) {
      const user = state.users.find(el => {
        if (el.email === email) {
          return el
        } else {
          return false
        }
      })
      if (user && user.password === password){
        state.currentUser = user
        state.loginError = false
      } else {
        state.loginError = 'Wrong e-mail or password'
      }
    },
    regUser(state, {email, password, nickname}) {
      const isExistByEmail = state.users.some(el => {return el.email === email})
      const isExistByNickname = state.users.some(el => {return el.nickname === nickname})
      if (isExistByEmail) {
        state.regError = 'User with this e-mail is allready exist'
      } else if (isExistByNickname) {
        state.regError = 'User with this nickname is allready exist'
      } else if (!isExistByEmail && !isExistByNickname) {
        state.lastUid++
        const user = {
          nickname,
          email,
          password,
          uid: state.lastUid,
          ownerOf: []
        }
        state.regError = false
        state.users.push(user)
        state.currentUser = user
      }
    },
    logoutUser(state) {
      state.currentUser = false
    }
  },
  actions: {
    loginUser({commit}, payload) {
      commit('loginUser', payload)
    },
    regUser({commit}, payload) {
      commit('regUser', payload)
    },
    logoutUser({commit}) {
      commit('logoutUser')
    }
  },
  getters: {
    currentUser(state) {
      return state.currentUser
    },
    loginError(state) {
      return state.loginError
    },
    regError(state) {
      return state.regError
    }
  }
}