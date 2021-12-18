import { createRouter, createWebHashHistory } from 'vue-router';

import store from '../store';

import HomeView from '../components/static/HomeView.vue';
import LoginView from '../components/user/LoginView.vue';
import PerusalsView from '../components/perusals/PerusalsView.vue';
import LettersView from '../components/letters/LettersView.vue';
import LettersCreateView from '../components/letters/LettersCreateView.vue';
import LettersUpdateView from '../components/letters/LettersUpdateView.vue';

const routes = [
    {
        path: '/',
        component: HomeView
    },
    {
        path: '/login',
        component: LoginView
    },
    {
        path: '/perusals',
        component: PerusalsView
    },
    {
        path: '/letters',
        component: LettersView
    },
    {
        path: '/letters/create',
        component: LettersCreateView
    },
    {
        path: '/letters/update/:id',
        component: LettersUpdateView
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
});

export default router;