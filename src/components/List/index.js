import List from './src/List.vue'
import ListItem from './src/ListItem.vue'
import Vue from 'vue'

const component = [List, ListItem];
component.forEach( (component) => {
    Vue.component(component.name, component);
})
