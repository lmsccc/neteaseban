<template>
    <div class="my-list">
        <div class="my-list-nav" :style="navStyle">
            <div class="decorate-line" :style="lineStyle"></div>
            <div
                v-for="tab in tabItems"
                ref="tabs"
                class="tab-nav-item"
                @click="handleNavClick(tab.name)"
                :key="tab.name">{{ tab.name }}</div>
        </div>
        <div class="my-list-item">
            <slot></slot>
        </div>
    </div>    
</template>
<script>
export default {
    name: "list",
    props:{
        //tab背景颜色
        backgroundColor:{
            type:String,
            default: '#fff'
        },
        value:String,
        //下划线颜色
        lineColor:{
            type:String,
            default: '#58C976'
        }
    },
    computed:{
        navStyle(){
            return{
                background: this.backgroundColor
            }
        }
    },
    data(){
        return{
            //由子组件list-item push过来
            tabItems:[],
            currentValue: this.value, 
            lineStyle:{}
        }
    },
    methods:{
        handleNavClick(name){
            if(name === this.currentValue)return;
            this.currentValue = name;
            this.$emit('input',name);
        },
        setLine(){
            this.$nextTick(() => {
                let tabIndex = this.tabItems.findIndex((tab) => tab.name === this.currentValue);
                let tabs = this.$refs.tabs;
                let tab = tabs[tabIndex];
                //下划线宽度
                let width = tab.offsetWidth / 2;
                //下划线距离左边的距离
                let left = tab.offsetLeft + (tab.offsetWidth - width) / 2;

                this.lineStyle = {
                    width: width + 'px',
                    transform: 'translateX('+ left + 'px)',
                    background: this.lineColor
                }
                console.log("setline");
            })
        }
    },
    mounted(){
        this.setLine();
        window.onresize = function(){
            this.setLine();
        }.bind(this);
    },
    destroyed(){
        window.onresize = null;
    },
    watch: {
        currentValue(){
            this.setLine();
        }
    }
}
</script>
<style>
.my-list-nav{
    display: flex;
    position: relative;
}
.decorate-line{
    position: absolute;
    bottom: 0;
    transition: 0.4s;
    height: 3px;
    border-radius: 4px;
}
.tab-nav-item{
    height: 40px;
    line-height: 40px;
    text-align: center;
    flex-grow: 1;
    font-size: 16px;
}

</style>
