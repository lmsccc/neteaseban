import Vue from 'vue';
import Vuex from 'vuex';
import location from './module/location.js'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        location
    },
})