import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import perusals from './modules/perusals';
import letters from './modules/letters';

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  modules: {
    app,
    user,
    perusals,
    letters
  },
  strict: debug,
  plugins: []
});
