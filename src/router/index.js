import {
    createRouter,
    // createWebHistory,
    createWebHashHistory
} from 'vue-router'
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('../views/Home.vue'),
            meta: {
                label: '首页',
                icon: 'home',
                keepAlive: false
            }
        }
    ]
})

export default router
