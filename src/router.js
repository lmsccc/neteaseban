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
            redirect: 'main/movie',
            children: [
                {
                    path: 'movie',
                    name: 'movie',
                    component: () => import('./views/movie/movie.vue'),
                    props: true
                },
                {
                    path: 'me',
                    name: 'me',
                    component: () => import('./views/me.vue'),
                },
                {
                    path: 'music',
                    name: 'musicList',
                    component: () => import('./views/music-list.vue'),
                    props: true
                },
                {
                    path: 'movieDetail',
                    name: 'movieDetail',
                    component: () => import('./views/movie-detail'),
                    props: true,
                },
                {
                    path: 'musicDetail',
                    name: 'musicDetail',
                    component: () => import('./views/music-detail'),
                    props: true
                }
            ]
        },
    ]
})