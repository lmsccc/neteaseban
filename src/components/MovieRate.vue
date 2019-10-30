<template>
    <div class="rate">
        <i class="iconfont" :class="{on: rate/totalRate > 0}">&#xe64a;</i>
        <i class="iconfont" :class="{on: rate/totalRate >= 0.2}">&#xe64a;</i>
        <i class="iconfont" :class="{on: rate/totalRate >= 0.4}">&#xe64a;</i>
        <i class="iconfont" :class="{on: rate/totalRate >= 0.7}">&#xe64a;</i>
        <i class="iconfont" :class="{on: rate/totalRate >= 0.9}">&#xe64a;</i>
    </div>
</template>
<script>
export default {
    props:{
        rate:{
            type: Number,
            default: 0
        },
        totalRate:{
            type: Number,
            default: 10
        }
    }
}
</script>
<style scoped>

.iconfont{
    color: #bfbfbf;
    font-size: 10px;
}
.rate span{
    font-size: 14px;
    vertical-align: middle;
}
.rate i {
    margin: 0 2px 0 2px;
    vertical-align: middle;
}
.on {
    color:gold;
}
</style>

