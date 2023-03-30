import { defineStore } from 'pinia'

export const useStateStore = defineStore('state', {
  state: () => ({
    state: {
      user_gravatar: '',
      user: {},
      users: [],
      current_user_id: 0,
      messages: [],
    },
  }),
})
