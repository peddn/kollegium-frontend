// initial state
const state = () => ({
    sidebar: {
        activeMenuItem: 'kenntnisnahme'
    },
});

// getters
const getters = {
    isSidebarActiveMenuItem: (state, menuItem) => {
        return state.sidebar.activeMenuItem === menuItem;
    },
    getSidebarActiveMenuItem: (state) => {
        return state.sidebar.activeMenuItem;
    }
};

// mutations
const mutations = {
    setSidebarActiveMenuItem(state, menuItem) {
        state.sidebar.activeMenuItem = menuItem;
    }
};


export default {
    namespaced: true,
    state,
    getters,
    mutations
};
