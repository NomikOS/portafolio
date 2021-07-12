import axios from 'axios'
import common from '@/lib/common'
import release from '../../../public/release.json'
const { userPostService, iaApp } = common.urls

const state = {
  loadings: null,
  loadingAuth: false,
  messageLoading: '',
  photo: {},
  dataForPostComment: {
    entry: null
  },
  // notifyFormShow: true,
  backData: null,
  notificationPermState: null,
  deferredPrompt: null,
  upgradeApp: false,
  online: null,
  speed: null
}

const getters = {
  isLoadingCosa: (state) => (cosa) => {
    if (!state.loadings) return
    return state.loadings.includes(cosa)
  }
}

const actions = {
  filter(context, payload) {
    context.commit('SET_FILTER', payload)
  },
  like(context, input) {
    let url, input2, postId, commentId

    const currentUserId = context.rootState.account.user?.id || null
    if (input.type === 'comment') {
      commentId = input.id
      url = `${userPostService}/likeEntry`
      postId = input.postId
      input2 = { entryId: commentId, postId, type: 'comment' }
    } else {
      url = `${userPostService}/likePost`
      postId = input.id
      input2 = { postId }
    }

    // Mostrar de immediato, ya que proceso backend puede demorar
    if (input.type === 'comment') {
      context.commit(
        'post/UPDATE_COMMENT_LIKES',
        { postId, commentId, currentUserId },
        { root: true }
      )
    } else {
      context.commit('post/UPDATE_POST_LIKES', { postId }, { root: true })
    }
    // console.log('input2', input2)
    const P = axios.post(url, input2)
    P.then((response) => {})
    return P
  },
  release: (context, token) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${iaApp}/release.json?t=` + new Date().getTime())
        .then((response) => {
          const versionRemote = response.data.version || ''
          const versionLocal = release.version || ''
          if (
            versionRemote &&
            versionLocal &&
            versionRemote !== versionLocal
          ) {
            context.commit('UPGRADE_APP', true)
          } else {
            context.commit('UPGRADE_APP', false)
          }
          resolve()
        })
        .catch((err) => {
          console.log(err)
        })
    })
  }
}

const mutations = {
  LOADINGS(state, cosa) {
    // Init
    if (!Array.isArray(state.loadings)) {
      state.loadings = []
    }
    if (state.loadings.includes(cosa)) return
    console.log({ 'LOGGING cosa': cosa })
    state.loadings.push(cosa)
  },
  LOADINGS_OFF(state, cosa) {
    const sinX = (state.loadings || []).filter((x) => x !== cosa)
    state.loadings = sinX
  },
  LOADING_AUTH(state, payload) {
    state.loadingAuth = payload
  },
  SET_FILTER(state, data) {
    state[data.page]['filters'][data.option] = data.value
  },
  PHOTO_FOR_POST_COMMENT(state, payload) {
    state.photo = payload
  },
  DATA_FOR_POST_COMMENT(state, payload) {
    state.dataForPostComment = payload
  },
  SET_BACK_DATA(state, payload) {
    state.backData = payload
  },
  SET_NOTIFICATION_PERM_STATE(state, payload) {
    state.notificationPermState = payload
  },
  DEFERRED_PROMPT(state, deferredPrompt) {
    state.deferredPrompt = deferredPrompt
  },
  UPGRADE_APP(state, value) {
    state.upgradeApp = value
  },
  ONLINE(state, online) {
    console.log(`Cambio en conectividad. App is online?: ${online}`)
    state.online = online
  },
  SPEED(state, speed) {
    console.log(`Cambio en velocidad. Connection speed?:`, speed)
    state.speed = speed
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
