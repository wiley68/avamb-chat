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

export const useStateStore = defineStore('state', {
  state: () => ({
    state: {
      page: 'Landing',
      user_gravatar: '',
      user: {},
      users: [],
      current_user_id: 0,
      messages: [],
      deleteMessage: false,
    },
  }),
  actions: {
    getUserById(user_id) {
      return this.state.users.find((element) => {
        return element.id == user_id
      })
    },
    changeDeleteMessage(deleteMessage) {
      this.deleteMessage = deleteMessage
    },
    deleteMessage(message_id) {
      var data = new FormData()
      data.append('token', '2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z')
      data.append('id', message_id)
      var xmlhttpro = createCORSRequest(
        'POST',
        '/function/delete_message.php?guid=2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z'
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
          methods.deleteMessageById(message_id)
          state.deleteMessage = false
        }
      }
      xmlhttpro.send(data)
    },
    createMessage(from_user_id, to_user_id, body) {
      var data = new FormData()
      data.append('token', '2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z')
      data.append('from_user_id', from_user_id)
      data.append('to_user_id', to_user_id)
      data.append('body', body)
      var xmlhttpro = createCORSRequest(
        'POST',
        '/function/create_message.php?guid=2|2cEpMzPHz5mWtCaGqsER1Fe1t8YRBEg68CbfiU7Z'
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
            from_user_id: JSON.parse(this.response).from_user_id,
            to_user_id: JSON.parse(this.response).to_user_id,
            body: JSON.parse(this.response).body,
            created_at: JSON.parse(this.response).created_at,
            updated_at: JSON.parse(this.response).updated_at,
          }
          this.messages.splice(0, 0, newMessage)
        }
      }
      xmlhttpro.send(data)
    },
  },
})
