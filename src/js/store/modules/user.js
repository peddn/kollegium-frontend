import api from '../../../api/user.js'
import router from '../../router'

import { toast } from 'bulma-toast'

// initial state
const state = () => ({
    data: {
        account: {},
        jwt: '',
        isLoggedIn: false
    },
    view: {

    },
    // put all mutation in here to delete user associated data
    mutations: []
})

// getters
const getters = {
    getAccount: (state) => {
        return state.data.account;
    },
    getJwt: (state) => {
        return state.data.jwt;
    },
    isLoggedIn: (state) => {
        return state.data.isLoggedIn;
    },
    getRole: (state, getters) => {
        if(getters.isLoggedIn) {
            return state.data.account.role.type
        } else {
            return 'public'
        }
    },
    getMutations: (state) => {
        return state.mutations;
    }

}

// mutations
const mutations = {
    logout(state) {
        state.data.account = {}
        state.data.jwt = ''
        state.data.isLoggedIn = false
    },
    login(state, userdata) {
        state.data.account = userdata.user
        state.data.jwt = userdata.jwt
        state.data.isLoggedIn = true
    },
    pushDeleteMutation(state, mutation) {
        if (!state.mutations.includes(mutation)) {
            state.mutations.push(mutation)
        }
    }
}

// actions
const actions = {
    async login({ commit }, creds) {
        try {
            const userdata = await api.login(creds)
            commit('login', userdata)
            router.push('/')
        } catch(error) {
            console.log(error)

            toast({
                message: error.message,
                "position": "bottom-right",
                type: 'is-danger',
                dismissible: true,
                pauseOnHover: true,
              })
        }
        
    },
    logout({ commit, getters }) {
        const mutations = getters.getMutations  
        for (let mutation of mutations) {
            commit(mutation, null, { root: true })
        }
        commit('logout')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
