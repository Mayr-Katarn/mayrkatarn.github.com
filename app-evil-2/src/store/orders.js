export default {
  state: {
    oreders: []
  },
  matations: {
    createOrder (state, payload) {
      state.oreders.push(payload)
    }
  },
  actions: {
    async createOrder () {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
          console.log(reject)
        }, 3000)
      })
    }
  },
  getters: {},
}
