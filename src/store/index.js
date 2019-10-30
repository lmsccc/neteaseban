import Vue from 'vue';
import Vuex from 'vuex';
import location from './module/location.js';
import music from './module/music';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        location,
        music
    },
})