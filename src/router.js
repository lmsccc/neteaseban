import Router from 'vue-router';
import Vue from 'vue';
Vue.use(Router);

export default new Router({
    base: '/',
    routes: [
        {
            path: '/',
            redirect: '/main'
        },
        {   
            path: '/main',
            component: () => import('./views/layout/index.vue'),
            redirect: '/main/movie',
            children: [
                {
                    path: 'movie',
                    component: () => import('./views/movie/movie.vue')
                },
                {
                    path: 'me',
                    component: () => import('./views/me.vue')
                },
                {
                    path: 'music',
                    component: () => import('./views/music-list.vue')
                }
            ]
        },
    ]
})