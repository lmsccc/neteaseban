<template>
    <div>
            <div class="headPic">
                <img src="../assets/headPic.jpg">
            </div>
            <van-tabs :active="active"
                class="tab"
                >
                <van-tab title="我的电影">
                    <verticalList
                        :movies="wantToSeeMovie"
                        class="tab-item"
                    >
                    </verticalList>
                </van-tab>
                <van-tab title="我的音乐">
                    <div class="music-list">
                        <ul>
                            <li
                                class="song"
                                v-for="(song,index) in collectMusic"
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
                </van-tab>
            </van-tabs>
    </div>    
</template>
<script>
import {mapState, mapActions} from 'vuex'
import verticalList from '@/components/VerticalList.vue'
import musicMixin from '@/mixins/music'

export default {
    mixins:[musicMixin],
    components:{
        verticalList
    },
    data(){
        return {
            active: 0,
        }
    },
    methods:{
        ...mapActions([
            'setWantTo'
        ]),
        handleSelectSong(song,index){
             let args = {
                song,
                index,  //歌曲在歌单中的序号
                musicList: this.collectMusic
            }
            this.setMusic(args);
            //渲染播放界面
            this.$store.commit('SET_ISRENDING',true);
        }
    },
    computed: {
        ...mapState({
            wantToSeeMovie: state => state.collect.wantToSeeMovie,
            collectMusic: state => state.collect.collectMusic
        })
    }
}
</script>
<style scoped>
.headPic{
    text-align: center;
    padding-top: 20px;
}
.headPic img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
}
.tab{
    position: absolute;
    top: 180px;
    bottom: 60px;
    left: 0;
    right: 0;
}
.tab >>> .van-tabs__content{
    height: calc(100% - 60px);
    overflow: scroll;
    margin-top: 10px;
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
.song-index{
    float: left;
    font-size: 18px;
    color: rgb(139, 138, 138);
    padding: 10px 0 10px 5px;
    width: 40px;
    text-align: center;
}
</style>
