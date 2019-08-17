<template>
    <!-- 菜单栏     -->
    <div class="footer-tabs">
        <router-link to="/main/movie" tag="div" class="tabs-icon">
            <i class="iconfont">&#xe679;</i>
        </router-link>
        <router-link to="/main/music" tag="div" class="tabs-icon">
            <i class="iconfont">&#xe78c;</i>
        </router-link>
        <router-link to="/main/me" tag="div" class="tabs-icon">
            <i class="iconfont">&#xe610;</i>
        </router-link>
    </div>
</template>
<script>
export default {
    data(){
        return {
            select:''
        }
    }
}
</script>
<style>
.footer-tabs{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
}
.footer-tabs .tabs-icon{
    display: inline-block;
    flex-grow: 1;
    text-align: center;
    
}
.router-link-active{
    color: #00B51D;
}
</style>
