<template>
    <div class="music-player" v-if="isRending">
        <div class="full-screen-player" v-show="isFullScreen">

            <div class="header">
                <i class="iconfont" @click="isFullScreen = false">&#xe691;</i>
                <div class="song-info">
                    <span class="song-title">{{ getMusicTitle }}</span><br>
                    <span class="song-author">{{ getMusicAuthor[0].name }}</span>
                </div> 
            </div>

            <div class="center">
                <div class="music-circle" v-show="!isShowLyrics" @click="isShowLyrics = true">
                    <img  v-lazy="getMusicPic">
                </div>
                <div class="music-lyrics" v-show="isShowLyrics" @click="isShowLyrics = false">
                    歌词歌词歌词歌词
                </div>
            </div>
            
            <div class="progress">
                <span>{{ formatTime(currentTime) }}</span>
                <progressBar :percent="percent" @touchEnd="changeCurrentTime"></progressBar>
                <span> {{ formatTime(duration) }}</span>
            </div>
            <div class="music-control">
                <div class="mode">
                    <i class="iconfont" v-show="mode === 'LOOP_PLAY'" @click="mode = 'RANDOM_PLAY'">&#xe66c;</i>
                    <i class="iconfont" v-show="mode === 'RANDOM_PLAY'" @click="mode = 'SINGLE_LOOP'">&#xe66b;</i>
                    <i class="iconfont" v-show="mode === 'SINGLE_LOOP'" @click="mode = 'LOOP_PLAY'">&#xe66d;</i>
                </div>
                <i class="iconfont" @click="changeSong(getMusicIndex - 1)">&#xe61f;</i><!--上一首-->
                <i class="iconfont" v-show="isPlay" @click="pause">&#xe601;</i><!--暂停-->
                <i class="iconfont" v-show="!isPlay" @click="play">&#xe600;</i><!--播放-->
                <i class="iconfont" @click="changeSong(getMusicIndex + 1)">&#xe624;</i><!--下一首-->
                <i class="iconfont" @click="showList">&#xe634;</i><!--播放列表-->
            </div>
            <!-- 歌曲列表 -->
            <van-popup 
                v-model="isShowList" 
                :style="{height:'55%'}"
                round
                position="bottom"
            >
                <ul>
                    <li
                        class="song"
                        v-for="(song,index) in getStoreMusicList"
                        :key="index"
                        :class="{'playing': index === getMusicIndex}"
                        >
                        <div class="song-info">
                            <span class="song-name">{{song.name}}</span><br>
                            <span class="song-author" v-for=" (author,index) in song.ar" :key="index">{{author.name}} </span>
                        </div>
                        <i class="iconfont" @click="handleSelectSong(song,index)">&#xe600;</i>
                    </li>
                </ul>
            </van-popup>


            <div 
                class="player-background" 
                :style="{'background-image': 'url(' + getMusicPic + ')'}">
            </div>
        </div>
        

        <div
            ref="miniPlayer" 
            class="mini-player" 
            v-show="!isFullScreen" 
            @click="isFullScreen = true"
            :style="{left: miniPlayerleft + 'px', top: miniPlayerTop + 'px'}"
            v-drag
            >
            <div>
                <h4>{{getMusicTitle}}</h4>
                <span>{{getMusicAuthor[0].name}}</span>
            </div>
            <i class="iconfont" v-show="isPlay" @click.stop="pause">&#xe601;</i><!--暂停-->
            <i class="iconfont" v-show="!isPlay" @click.stop="play">&#xe600;</i><!--播放-->
        </div>
        <audio 
            ref="audio"
            :src="getMusicURL" 
            autoplay
            @timeupdate="onTimeUpdate"
            @canplay="onCanPlay"
            @ended="onEnded"
            @error="onError"
        >
        </audio>
        <van-toast id="van-toast" />
    </div>
    
</template>
<script>
import musicMixin from '@/mixins/music'
import progressBar from '../components/progress'
export default {
    mixins: [musicMixin],
    components: {
        progressBar
    },
    data(){
        return {
            isFullScreen: true,
            isShowLyrics: false,
            mode:'LOOP_PLAY',
            isPlay: true,
            isShowList: false,
            currentTime: 0,
            duration: 0,
            disX: 0,//记录触摸的起始点
            disY: 0,
            miniPlayerleft: 0,
            miniPlayerTop: 100
        }
    },
    computed: {
        percent() {
            return this.currentTime / this.duration;
        }
    },
    methods: {
        pause() {
            this.$refs.audio.pause();
            this.isPlay = false;
        },
        play() {
            this.$refs.audio.play();
            this.isPlay = true;
        },
        showList() {
            this.isShowList = true;
        },
        handleSelectSong(song, index) {
            let args = {
                song,
                index
            }
            this.setMusic(args);
        },
        changeCurrentTime(percent){
            this.$refs.audio.currentTime = this.duration * percent;
        },
        formatTime (interval) {
            interval = interval | 0
            let minute = interval / 60 | 0
            let second = interval % 60
            if (second < 10) {
                second = '0' + second
            }
            return minute + ':' + second
        },
        onTimeUpdate(e) {
            this.currentTime = e.target.currentTime;
        },
        onCanPlay(e){
            //兼容小米浏览器
            let timer = setInterval(() => {
                this.duration = e.target.duration
                if(this.duration) {
                    clearInterval(timer);
                }
            },150)
        },
        onEnded(){
            if(this.mode === "SINGLE_LOOP"){
                this.$refs.audio.currentTime = 0;
                this.$refs.audio.play();
            }else if(this.mode === "LOOP_PLAY"){
                this.changeSong(this.getMusicIndex + 1);
            }else if(this.mode === "RANDOM_PLAY"){
                this.changeSong(Math.floor(Math.random() * this.getStoreMusicList.length));
            }
        },
        onError(){
            this.$toast("该歌曲可能需要付费");
            setTimeout(this.onEnded,3000);
        },
        changeSong(index) {
                let musicList = this.getStoreMusicList;
                if(index > musicList.length - 1) {index = 0;}
                if(index < 0) {index = musicList.length - 1;}
                let args = {
                    song: musicList[index],
                    index
                } 
                this.setMusic(args);
        },
    }
}
</script>
<style scoped>
.full-screen-player{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 30;
    font-size: 18px;
    background-color: #fff;
    color: #fff;
}
.player-background::after{
    content: '';
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.35);
}
.player-background{
    position: fixed;
    left: -100px;
    right: -100px;
    top: -100px;
    bottom: -100px;
    filter: blur(50px);
    z-index: -1;
    background-position: center center;
}

.header{
    padding-top: 10px;
    color: #fff;
}
.header i{
    padding: 10px 20px 0 15px;
    float: left;
}
.song-info{
    display: inline-block;
    padding-top: 5px;
}
.header .song-author{
    font-size: 14px;
    color: rgb(216, 214, 214)
}
.center{
    text-align: center;
    margin-top: 20px;
    height: 70%;
}
@keyframes rotate{
    0% { transform: rotate(0deg) }
    50%{ transform: rotate(180deg) }
    100%{ transform: rotate(360deg) }
} 
.music-circle img{
    margin-top: 100px;
    width: 300px;
    height: 300px;
    border-radius: 60%;
    animation: rotate 30s linear 0ms infinite normal forwards;
}
.music-control{
    display: flex;
    justify-content: space-around;
    position: absolute;
    bottom: 40px;
    width: 100%;
}
.song{
    padding: 10px 0 10px 5px;
    color: #000;
}
.song-info{
    display: inline-block;
    overflow: hidden;
    font-size: 16px;
    max-width: 250px;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
    vertical-align: middle;
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
.song.playing,
.song.playing .song-author{
    color: red;
}
.playing::before{
    font-family:"iconfont" !important;
    font-size:26px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    content:'\e7b4';
    vertical-align: middle;
}
.progress{
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 80px;
}
.progress span{
    padding: 4px 14px 0 14px;
}
.mini-player{
    position: fixed;
    height: 50px;
    width: 230px;
    background-color:rgba(65, 63, 63, 0.8);
    border-radius: 10px;
    z-index: 30;
    color: #fff;
    display: flex;
}
.mini-player div{
    width: 80%;
    padding: 9px 0 0 10px;
    white-space: nowrap;
    
}
.mini-player h4{
    overflow: hidden;
    text-overflow: ellipsis;
}
.mini-player i{
    position: absolute;
    right: 10px;
    padding-top: 8px;
}
</style>