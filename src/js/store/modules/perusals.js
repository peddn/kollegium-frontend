
import api from '../../api/perusals'

// initial state
const state = () => ({
  data: [],
  view: {
    activeFilter: 'todo'
  }
})

// getters
const getters = {
  isActiveFilter: (state) => (filter) => {
    return state.view.activeFilter === filter
  },
  getActiveFilter: (state) => {
    return state.view.activeFilter
  },
  getData: (state) => {
    return state.data
  },
  getDataFiltered: state => {
    switch (state.view.activeFilter) {
      case 'all':
        return state.data
      case 'todo':
        return state.data.filter(perusal => perusal.signed === false )
      case 'done':
        return state.data.filter(perusal => perusal.signed === true )
      default:
        break
    }
  }
}

// mutations
const mutations = {
  resetData(state) {
    // reset all data owned by this user
    state.data = []
  },
  setData(state, data) {
    state.data = data
  },
  resetActiveFilter(state) {
    state.view.activeFilter = 'all'
  },
  setActiveFilter(state, filter) {
    state.view.activeFilter = filter
  },
  updateSigned(state, payload) {
    const index = state.data.indexOf(payload.perusal)
    payload.perusal.signed = payload.signed
    state.data.splice(index, 1, payload.perusal)
  }
}

// actions
const actions = {
  async reloadData({ commit, rootGetters }) {
    const jwt = rootGetters['user/getJwt']
    try {
      const data = await api.getDataByUser(jwt)
      commit('setData', data)
      commit('user/pushDeleteMutation', 'perusals/resetData', { root: true })
    } catch (error) {
      console.log(error)
    }
  },
  async updateSigned({ commit, getters, rootGetters }, payload) {
    const jwt = rootGetters['user/getJwt']
    const perusal = getters.getData.find((perusal) => { return perusal.id === payload.id })
    const backup = perusal.signed
    commit('updateSigned', {
      perusal: perusal,
      signed: payload.signed
    })
    try {
      const perusalUpdated = getters.getData.find((perusal) => { return perusal.id === payload.id })
      const result = await api.updateSigned(jwt, perusalUpdated, payload.signed)
    } catch (error) {
      //TODO if ok do nothing / if not ok commit perusal.signed = backup
      console.log(error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
