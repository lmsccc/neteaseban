<template>
<div class="welcome-page" v-show="show">
    <div class="skip-button" @click="time = 0">{{ time }} | 跳过</div>
    <h1>欢迎使用网瓣</h1>
    <p>您位于：{{ city }}</p>
    <div class="welcome-logo">
        <img src="../assets/wangyi-logo.gif" alt="wangyiLogo">
        <img src="../assets/douban-logo.png" alt="doubanLogo">
    </div> 
</div>
     
</template>
<script>
import locationMixin from '@/mixins/location.js'

export default {
    mixins: [locationMixin],
    created() {
        this.getCity();
        this.hidden();
    },
    computed: {
        show(){
            return this.time > 0;
        }
    },
    methods: {
        hidden(){
            let timer = setInterval(() => {
                if(this.time === 0){
                    clearInterval(timer);
                    return;
                }
                this.time -= 1;
            },1000);
        }
    },
    data(){
        return {
            time: 3
        }
    }
}
</script>
<style>
.welcome-page{
    text-align: center;
    color: #0084FF;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 10001;
    background-color: #fff;
}
h1{
    padding-top: 150px;
    font-size: 40px;
}
p{
    margin-top: 50px;
    font-size: 20px;
}
.welcome-logo{
    width: 100%;
    position: fixed;
    bottom: 40px;
    
}
.welcome-logo img{
    width: 70px;
    margin: 0 10px 0 10px;
}
.skip-button{
    position: fixed;
    right: 20px;
    top: 20px;
    color: gray;
    background-color: rgba(56, 56, 56, 0.089);
    border-radius: 14px;
    padding: 5px;
}
</style>
