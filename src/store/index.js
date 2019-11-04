import Vue from 'vue';
import Vuex from 'vuex';
import location from './module/location.js';
import music from './module/music';
import collect from './module/collect';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        location,
        music,
        collect
    },
})