<template>
    <div class="movie-list">
        <div class="movie-list-header">
            <img class="logo" src="@/assets/douban-logo.png" alt="doubanLogo">
            <input 
                type="text" 
                placeholder="电影/艺人" 
                @click="showSearch = true" 
                @blur="showSearch = false">
            <input 
                type="button" 
                value="搜索" 
                :style="searchButton">
        </div>
        <div class="movie-list-banner">
            <div class="movie-list-location">
                <i class="iconfont locationIcon">&#xe63e;</i>
                <span>正在上映的电影-{{ city }}</span>
            </div>
            <div class="loading">
                <img 
                    src="@/assets/loading.gif" 
                    v-show="movieLoading" 
                    class="movie-loading">
            </div>
            <ul class="banner-movie">
                <li v-for="(movie,index) in movies" :key="index" @click="selectMovie(movie)">
                    <img v-lazy="movie.images.small">
                    <div class="movie-name">{{ movie.title }}</div>
                    <movierate :rate="movie.rating.average" class="movierate"></movierate>
                    <span>{{ movie.rating.average }}</span>
                </li>
            </ul>
        </div>
        <div class="movie-content">
            <list v-model="currentTab" >
                <list-item name="最近上映" class="vertical-movie-list">
                    <verticalList 
                        :movies="comingSoonMovie" 
                        v-show="!comingSoonMovieInit"
                        :finished="comingSoonFinished"
                        v-model="comingSoonLoading"
                        @load="getComingSoonMovie"
                        @selectMovie="selectMovie"
                        ></verticalList>
                    <img 
                        src="@/assets/loading.gif" 
                        v-show="comingSoonMovieInit" 
                        class="coming-soon-loading">
                </list-item>
                <list-item name="top250" class="vertical-movie-list">
                    <verticalList 
                        :movies="top250Movie" 
                        v-show="!top250MovieInit"
                        :finished="top250Finished"
                        v-model="top250Loading"
                        @load="getTop250Movie"
                        @selectMovie="selectMovie"
                        ></verticalList>
                    <img 
                        src="@/assets/loading.gif" 
                        v-show="top250MovieInit" 
                        class="coming-soon-loading">
                </list-item>
            </list>
        </div>
        <movie-detail-page 
            class="movie-detail" 
            v-if="hasSelectd" 
            v-show="showMovieDetail" 
            :movie="movieDetail"
            @hide="hideMovieDetail"></movie-detail-page>
    </div>
</template>
<script>
import '@/api/douban'
import movierate from '@/components/MovieRate.vue'
import locationMixin from '@/mixins/location'
import movieDetailPage from '../movie-detail.vue'
import { 
    getMovieInTheaters, 
    getComingSoonMovie, 
    getTop250Movie,
    getMovieDetail
} from '@/api/douban'

import verticalList from './component/VerticalList'

const MOVIE_COUNT = 10;

export default {
    mixins: [locationMixin],
    components: {
        movierate,
        verticalList,
        movieDetailPage
    },
    computed:{
        searchButton(){
            if(this.showSearch === true)return {width: '40px'}
            else return {width: '0px'}
        }
    },
    data(){
        return {
            movies: [],
            comingSoonMovie: [],
            top250Movie: [],
            type: "comingSoon",
            currentTab: '最近上映',
            showSearch: false,
            movieLoading: true,
            comingSoonMovieInit: true,
            top250MovieInit: true,
            //每次取10条结果，下拉继续获取，index为获取了多少部电影了
            comingSoonMovieIndex: 0,
            top250MovieIndex: 0,
            comingSoonFinished: false,
            top250Finished: false,
            comingSoonLoading: false,
            top250Loading: false,
            showMovieDetail: false,
            //默认给电影详情页赋城市电影的第一部
            movieDetail: {},
            hasSelectd: false
        }
    },
    methods: {
        handleComingSoon(){
            this.type = 'comingSoon'
        },
        handleTop(){
            this.type = 'top'
        },
        getMovieInTheaters(){
            let params = {
                //去掉市字
                city: this.city.slice(0,this.city.length-1),
                start: 0,
                count: 1000 
            }
            getMovieInTheaters(params).then(res => {
                this.movies = res.data.subjects;
                this.movieLoading = false;
            });
        },
        getComingSoonMovie(){
            this.comingSoonLoading = true;
            getComingSoonMovie(this.comingSoonMovieIndex,MOVIE_COUNT).then(res => {
                this.comingSoonMovieIndex += MOVIE_COUNT;
                // this.comingSoonMovie = [...this.comingSoonMovie, ...res.data.subjects];
                this.comingSoonMovie.push(...res.data.subjects);
                this.comingSoonMovieInit = false;
                this.comingSoonLoading = false;
                if(this.comingSoonMovieIndex >= res.data.total)this.comingSoonFinished = true;
            });
        },
        getTop250Movie(){
            this.top250Loading = true;
            getTop250Movie(this.top250MovieIndex,MOVIE_COUNT).then(res => {
                this.top250MovieIndex += MOVIE_COUNT;
                //this.top250Movie = [...this.top250Movie, ...res.data.subjects];
                this.top250Movie.push(...res.data.subjects);
                this.top250MovieInit = false;
                this.top250Loading = false;
                if(this.top250MovieIndex >= res.data.total)this.top250Finished = true;
            })
        },
        selectMovie(movie){
            this.movieDetail = movie;
            this.hasSelectd = true;
            this.showMovieDetail = true;
            getMovieDetail(movie.id).then(res => {
                this.movieDetail = res.data;
            })
        },
        hideMovieDetail(){
            this.showMovieDetail = false;
        }
    },
    mounted(){
        this.getMovieInTheaters();
        this.getComingSoonMovie();
        this.getTop250Movie();
        
    }
}
</script>
<style scoped>
.movie-list-header{
    display: flex;
    align-items: center;
    padding-top: 10px;
}
.movie-list-header .logo{
    width: 40px;
    margin-left: 15px;
}
.movie-list-header input[type="text"]{
    height: 33px;
    border: none;
    border-radius: 5px;
    background-color:#EDF0ED;
    outline: none;
    text-align: center;
    margin-left: 10px;
    flex-grow: 1;
}
.movie-list-header input[type="button"]{
    margin: 0 10px 0 15px;
    border: none;
    outline: none;  
    border-radius: 20%;
    color: #EDF0ED;
    background-color: #36C23B;
    box-sizing: content-box;
    width: 0px;
    height: 28px;
    transition: width 0.2s ease;
}
.movie-loading{
    height: 207px;
    width: 100%;
}
.movie-list-banner{
    margin-top: 5px;
}
.movie-list-location i,
.movie-list-location span{
    vertical-align: middle;
    font-size: 14px;
}
.movie-list-location i{
    font-size: 18px;
    padding-left: 10px;
}
.banner-movie{
    overflow-x: scroll;
    white-space: nowrap;
    text-align: center;
}
.banner-movie li{
    display: inline-block;
    margin: 10px 0 10px 0;
    width: 120px;
}
.banner-movie img{
    height: 142px;
    width: 100px;
}
.banner-movie .movie-name{
    font-size: 14px;
    text-overflow: ellipsis;
    overflow: hidden;
}
.coming-soon-loading{
    height: 100%;
    width: 100%;
}
.movierate{
    display: inline-block;
}
.vertical-movie-list{
    position: fixed;
    top: 330px;
    bottom: 60px;
    left: 0;
    right: 0;
    overflow-x: scroll;
    overflow-y: auto;
}
</style>



