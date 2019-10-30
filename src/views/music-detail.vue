<template>
    <div class="music-detail">
        <div class="header">
            <img :src="musicPic">
            <div class="title"><i class="iconfont" @click="handleBack">&#xe691;</i><div class="title-text">歌单</div></div>
            <div class="list-name">{{ listTitle }}</div>
        </div>
        <div class="music-list">
            <ul>
                <li
                    class="song"
                    v-for="(song,index) in musicList"
                    :key="index"
                    >
                <div class="song-index">{{ index + 1 }}</div>
                <div class="song-info">
                    <span class="song-name">{{song.name}}</span><br>
                    <span  class="song-author" v-for=" (author,index) in song.ar" :key="index">{{author.name}} </span>
                </div>
                <i class="iconfont" @click="handleSelectSong(song,index)">&#xe600;</i>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {getMusicList} from '@/api/wangyiyun'
import musicMixin from '@/mixins/music'
export default {
    name: 'musicDetail',
    mixins: [musicMixin],
    props: {
        musicPic:{
            type: String,
            require: true
        },
        musicID:{
            type: Number,
            require: true
        },
        listTitle:{
            type: String,
            require: true
        }
    },
    data(){
        return {
            musicList: []
        }
    },
    methods: {
        handleBack(){
            this.$router.go(-1);
        },
        init(){
            getMusicList(this.musicID).then((response) => {
                this.musicList = response.data.playlist.tracks;
                this.SET_MUSIC_LIST(this.musicList);
            })
        },
        handleSelectSong(song,index){
            let args = {
                song,
                index,  //歌曲在歌单中的序号
                musicList: this.musicList
            }
            this.setMusic(args);
            this.$store.commit('SET_ISRENDING',true);
        }
    },
    created(){
        this.init();
    }
}
</script>
<style scoped>
.music-detail{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #fff;
    overflow: scroll;
}
.header{
    position: relative;
    width: 100%;
    height: 260px;
    background-color: black;
    color: #fff;
}
.header img{
    height: 100%;
    width: 100%;
    object-fit: cover;
}
.header::before{
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
}
.title{
    position: absolute;
    top: 0;
    text-align: center;
    width: 100%;
    font-size: 20px;
    vertical-align: middle;
}
.title i{
    position: absolute;
    left: 10px;
    top: 5px;
}
.title-text{
    display: inline-block;
    padding-top: 8px;
}
.list-name{
    position: absolute;
    bottom: 20px;
    right: 0;
    left:0;
    text-align: center;
    font-size: 14px;
}
.music-list{
    transform: translateY(-10px);
    background-color: #fff;
    border-radius: 10px;
}
.song{
    padding: 10px 0 10px 0;
}
.song-index{
    float: left;
    font-size: 18px;
    color: rgb(139, 138, 138);
    padding: 10px 0 10px 5px;
    width: 40px;
    text-align: center;
}
.song-info{
    display: inline-block;
    overflow: hidden;
    font-size: 16px;
    max-width: 250px;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
}
.song-author{
    font-size: 14px;
    color: rgb(95, 94, 94);
}
.song i{
    float: right;
    padding: 8px 20px 0 0;
    font-size: 26px;
}
</style>