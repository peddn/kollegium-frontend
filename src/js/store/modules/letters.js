
import api from '../../../api/letters';

// initial state
const state = () => ({
  data: [],
  view: {
    activeFilter: 'all'
  }
});

// getters
const getters = {
  isActiveFilter: (state) => (filter) => {
    return state.view.activeFilter === filter;
  },
  getActiveFilter: (state) => {
    return state.view.activeFilter;
  },
  getData: (state) => {
    return state.data;
  }
  
};

// mutations
const mutations = {
  resetData(state) {
    // reset all data owned by this user
    state.data = [];
  },
  setData(state, data) {
    state.data = data;
  },
  resetActiveFilter(state) {
    state.view.activeFilter = 'all'
  },
  setActiveFilter(state, filter) {
    state.view.activeFilter = filter;
  }
};

// actions
const actions = {
  async reloadData({ commit, rootGetters }) {
    const jwt = rootGetters['user/getJwt'];
    try {
      const data = await api.getData(jwt);
      commit('setData', data);
      commit('user/pushDeleteMutation', 'letters/resetData', { root: true });
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};