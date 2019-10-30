<template>
    <van-tabs 
        v-model="activeTab"
        :background="tabBGC" 
        :color="WHITE" 
        :title-active-color="WHITE" 
        :title-inactive-color="WHITE" >
        <van-tab title="推荐歌单" name="推荐歌单" class="tab">
            <div class="banner">
                <van-swipe :autoplay="3000" indicator-color="#E60026">
                    <van-swipe-item 
                        v-for="(image, index) in swipeImage" 
                        :key="index">
                        <img v-lazy="image">
                    </van-swipe-item>
            </van-swipe>
            </div>
            <h3 class="title">推荐歌单</h3>
            <ul class="personalized-list">
                <router-link 
                    class="personalized-item" 
                    v-for="(item,index) in personalizedItem" 
                    :key="index"
                    tag="li"
                    :to="{name:'musicDetail',params:{musicPic: item.picUrl, musicID: item.id, listTitle: item.name}}"
                    >
                    <img v-lazy="item.picUrl">
                    <span>{{ item.name }}</span>
                    <div class="play-count-wrap">
                    <i class="iconfont">&#xe78c;</i>
                    {{ getFormatPlayCount(item) }}
                    </div>
                </router-link>
            </ul>
        </van-tab>
        <van-tab title="排行榜" name="排行榜" class="tab">
            排行榜
        </van-tab>
    </van-tabs>
</template>
<script>
import {
        getBanner,
        getPersonalized,
    }from '@/api/wangyiyun'

export default {
    name: 'musicList',
    data(){
        return {
            activeTab: '推荐歌单',
            swipeImage: [],
            personalizedItem: [],
            tabBGC: '#E60026',
            WHITE: 'white'
        }
    },
    computed:{
      getFormatPlayCount(){
            return function(item){
                return item.playCount < 10000 ? item.playCount : (Math.floor(item.playCount/10000) + "万");
            }
      }  
    },
    methods:{
        //获取banner图片
        getBanner(){
            getBanner().then(response => {
                response.data.banners.forEach(banner => {
                    this.swipeImage.push(banner.imageUrl);
                });
            })
        },
        getPersonalized(){
            getPersonalized().then(response => {
                response.data.result.forEach(item =>{
                    this.personalizedItem.push(item);
                })
            })
        },
    },
    mounted(){
        this.getBanner();
        this.getPersonalized();
    }
}
</script>
<style scoped>
.tab{
    position: fixed;
    top: 43px;
    bottom: 60px;
    overflow: scroll;
}
.title{
    margin: 35px 0 0 8px;
    font-size: 18px;
    color: #333333;
    font-weight: normal;
}
.banner{
    background-color: #E60026;
}
.van-swipe{
    position: relative;
    top: 30px;
    text-align: center;
}
.van-swipe-item img{
    border-radius: 10px;
    height: 160px;
    width: 360px;
}
.personalized-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    list-style: none;
    padding-top: 10px;
    padding: 0 3px 0 3px;
}
.personalized-item{
    margin-top: 5px;
    width: 115px;
    font-size: 12px;
    color: #333;
    position: relative;
}
.personalized-item img{
    height: 115px;
    width: 100%;
}
.play-count-wrap{
    position: absolute;
    top: 5px;
    right: 5px;
    color: rgb(248, 240, 240);
    font-size: 12px;
}
.play-count-wrap i{
    font-size: 12px;
}
</style>
