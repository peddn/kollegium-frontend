import { createRouter, createWebHashHistory } from 'vue-router'

import store from '../store'

import HomeView from '../components/static/HomeView.vue'
import LoginView from '../components/user/LoginView.vue'
import PerusalsView from '../components/perusals/PerusalsView.vue'
import LettersView from '../components/letters/LettersView.vue'
import LettersCreateView from '../components/letters/LettersCreateView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/perusals',
        name: 'perusals',
        component: PerusalsView
    },
    {
        path: '/letters',
        name: 'letters',
        component: LettersView
    },
    {
        path: '/letters/create',
        name: 'letters_create',
        component: LettersCreateView
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
});

router.beforeEach((to, from) => {
    if (to.path !== '/login' && !store.getters['user/isLoggedIn']) {
        return '/login'
    }
})

export default router;