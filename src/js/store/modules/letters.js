
import { remove } from '@vue/shared';
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
  },
  getDataFiltered: state => {
    switch (state.view.activeFilter) {
      case 'all':
        return state.data
      //      case 'todo':
      //        return state.data.filter(perusal => perusal.signed === false )
      default:
        return state.data
    }
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
  create(state, letter) {
    state.data.push(letter);
  },
  remove(state, letter) {
    state.data = state.data.filter((currentLetter) => {
      return currentLetter.id !== letter.id;
    })
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
    } catch (error) {
      console.log(error)
    }
  },
  async create({ commit, rootGetters }, formElement) {

    const formData = new FormData();
    const formElements = formElement.elements;
    const data = {};

    for (let i = 0; i < formElements.length; i++) {
      const currentElement = formElements[i];
      if (!["submit", "file", "button"].includes(currentElement.type)) {
        data[currentElement.name] = currentElement.value;
      } else if (currentElement.type === "file") {
        for (let i = 0; i < currentElement.files.length; i++) {
          const file = currentElement.files[i];
          formData.append("files.documents", file, file.name);
        }
      }
    }

    formData.append("data", JSON.stringify(data));

    const jwt = rootGetters['user/getJwt'];
    try {
      const letter = await api.create(jwt, formData);
      commit('create', letter);
      commit('user/pushDeleteMutation', 'letters/resetData', { root: true });
    } catch (error) {
      console.log(error)
    }
  },
  async remove({ commit, rootGetters }, id) {
    const jwt = rootGetters['user/getJwt'];
    try {
      const letter = await api.remove(jwt, id);
      commit('remove', letter);
      console.log(letter);

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