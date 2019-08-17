<template>
    <div class="list-item" v-show="this.name === this.$parent.currentValue">
        <slot></slot>
    </div>    
</template>
<script>
export default {
    name: 'list-item',
    props:{
        name:{
            type:String,
            require: true
        }
    },
    beforeCreate(){
        this.$parent.tabItems.push(this);
    },
    destoryed(){
        this.$parent.tabItems.splice(this.$paretn.tabItems.indexOf(this),1);
    }
}
</script>

