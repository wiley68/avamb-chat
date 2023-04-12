import { defineStore } from 'pinia'
import { useLoading } from 'vue-loading-overlay'

const $loading = useLoading()
const loader_params = {}

function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest()
  if ('withCredentials' in xhr) {
    xhr.open(method, url, true)
  } else if (typeof XDomainRequest != 'undefined') {
    xhr = new XDomainRequest()
    xhr.open(method, url)
  } else {
    xhr = null
  }
  return xhr
}

export const useStateStore = defineStore('store', {
  state: () => ({
    state: {
      user_gravatar: '',
      user: {},
      users: [],
      current_user_id: 0,
      messages: [],
      deleteMessage: false,
      offers: [],
      offer_id: 0,
    },
  }),
  actions: {
    loadData() {
      let store = this
      var data = new FormData()
      var xmlhttpro = createCORSRequest(
        'POST',
        'https://dograma.avalonbg.com/function/mobile/getparams.php'
      )
      const loader = $loading.show(loader_params)
      xmlhttpro.addEventListener('loadend', (e) => {
        loader.hide()
      })
      xmlhttpro.addEventListener('error', (e) => {
        loader.hide()
      })
      xmlhttpro.addEventListener('abort', (e) => {
        loader.hide()
      })
      xmlhttpro.onreadystatechange = function () {
        if (
          this.readyState == 4 &&
          JSON.parse(this.response).success == 'success'
        ) {
          store.state.user = JSON.parse(this.response).user
          store.state.offers = JSON.parse(this.response).offers
          store.getMessages()
        }
      }
      xmlhttpro.send(data)
    },
    getMessages() {
      let store = this
      var data = new FormData()
      data.append('token', '2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z')
      data.append('user_id', store.state.user.id)
      var xmlhttpro = createCORSRequest(
        'POST',
        'https://dograma.avalonbg.com/function/get_messages.php?guid=2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z'
      )
      const loader = $loading.show(loader_params)
      xmlhttpro.addEventListener('loadend', (e) => {
        loader.hide()
      })
      xmlhttpro.addEventListener('error', (e) => {
        loader.hide()
      })
      xmlhttpro.addEventListener('abort', (e) => {
        loader.hide()
      })
      xmlhttpro.onreadystatechange = function () {
        if (
          this.readyState == 4 &&
          JSON.parse(this.response).success == 'success'
        ) {
          store.state.messages = JSON.parse(this.response).messages
          store.state.users = JSON.parse(this.response).users
          store.state.user_gravatar = JSON.parse(this.response).user_gravatar
        }
      }
      xmlhttpro.send(data)
    },
    getUserById(user_id) {
      return this.state.users.find((element) => {
        return element.id == user_id
      })
    },
    changeDeleteMessage(_deleteMessage) {
      this.state.deleteMessage = _deleteMessage
    },
    deleteMessage(message_id) {
      let store = this
      var data = new FormData()
      data.append('token', '2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z')
      data.append('id', message_id)
      var xmlhttpro = createCORSRequest(
        'POST',
        'https://dograma.avalonbg.com/function/delete_message.php?guid=2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z'
      )
      const loader = $loading.show(loader_params)
      xmlhttpro.addEventListener('loadend', (e) => {
        loader.hide()
      })
      xmlhttpro.addEventListener('error', (e) => {
        loader.hide()
      })
      xmlhttpro.addEventListener('abort', (e) => {
        loader.hide()
      })
      xmlhttpro.onreadystatechange = function () {
        if (
          this.readyState == 4 &&
          JSON.parse(this.response).success == 'success'
        ) {
          store.deleteMessageById(message_id)
          store.state.deleteMessage = false
        }
      }
      xmlhttpro.send(data)
    },
    deleteMessageById(id) {
      this.state.messages = this.state.messages.filter((element) => {
        return element.id != id
      })
    },
    createMessage(from_user_id, to_user_id, body, offer_id) {
      let store = this
      var data = new FormData()
      data.append('token', '2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z')
      data.append('from_user_id', from_user_id)
      data.append('to_user_id', to_user_id)
      data.append('body', body)
      data.append('offer_id', offer_id)
      var xmlhttpro = createCORSRequest(
        'POST',
        'https://dograma.avalonbg.com/function/create_message.php?guid=2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z'
      )
      const loader = $loading.show(loader_params)
      xmlhttpro.addEventListener('loadend', (e) => {
        loader.hide()
      })
      xmlhttpro.addEventListener('error', (e) => {
        loader.hide()
      })
      xmlhttpro.addEventListener('abort', (e) => {
        loader.hide()
      })
      xmlhttpro.onreadystatechange = function () {
        if (
          this.readyState == 4 &&
          JSON.parse(this.response).success == 'success'
        ) {
          const newMessage = {
            id: JSON.parse(this.response).id,
            firm_id: JSON.parse(this.response).firm_id,
            offer_id: JSON.parse(this.response).offer_id,
            offer_idnomber: JSON.parse(this.response).offer_idnomber,
            from_user_id: JSON.parse(this.response).from_user_id,
            to_user_id: JSON.parse(this.response).to_user_id,
            body: JSON.parse(this.response).body,
            created_at: JSON.parse(this.response).created_at,
            updated_at: JSON.parse(this.response).updated_at,
          }
          store.state.messages.splice(0, 0, newMessage)
        }
      }
      xmlhttpro.send(data)
    },
    changeStatus(message_id) {
      let store = this
      var data = new FormData()
      data.append('token', '2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z')
      data.append('id', message_id)
      var xmlhttpro = createCORSRequest(
        'POST',
        'https://dograma.avalonbg.com/function/change_message.php?guid=2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z'
      )
      const loader = $loading.show(loader_params)
      xmlhttpro.addEventListener('loadend', (e) => {
        loader.hide()
      })
      xmlhttpro.addEventListener('error', (e) => {
        loader.hide()
      })
      xmlhttpro.addEventListener('abort', (e) => {
        loader.hide()
      })
      xmlhttpro.onreadystatechange = function () {
        if (
          this.readyState == 4 &&
          JSON.parse(this.response).success == 'success'
        ) {
          const status = store.state.messages.find(
            (element) => element.id === message_id
          ).status
          if (status == 0) {
            store.state.messages.find(
              (element) => element.id === message_id
            ).status = 1
          } else {
            store.state.messages.find(
              (element) => element.id === message_id
            ).status = 0
          }
        }
      }
      xmlhttpro.send(data)
    },
  },
})
