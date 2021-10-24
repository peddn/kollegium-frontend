
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
  createLetter(state, letter) {
    console.log('LETTER, letter')
    state.data.push(letter);
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
  async createLetter({ commit, rootGetters }, formElement) {

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
                    console.log(file);
          formData.append("files.documents", file, file.name);
        }
      }
    }

    formData.append("data", JSON.stringify(data));

    const jwt = rootGetters['user/getJwt'];
    try {
      const letter = await api.createLetter(jwt, formData);

      console.log(letter);
      commit('createLetter', letter);
      commit('user/pushDeleteMutation', 'letters/resetData', { root: true });
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