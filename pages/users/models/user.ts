import { createModel } from '@rematch2/core'

const user = createModel({
  state: 0, // initial state
  reducers: {
    increment(state) {
      return state + 1
    },
  },
  effects: {
    async incrementAsync() {
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.increment()
    },
  },
})

export default user
