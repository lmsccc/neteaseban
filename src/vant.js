import Vue from 'vue';
import { Tab,Tabs,Swipe,SwipeItem,Popup,Toast } from 'vant'
[
    Tab,
    Tabs,
    Swipe,
    SwipeItem,
    Popup,
    Toast
].forEach(component => {
    Vue.use(component);
})