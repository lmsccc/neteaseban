<template>
<ul class="movie" @scroll="handleScroll" ref="list">
    <li 
        class="movie-item"
        v-for="movie in movies" :key="movie.id" @click="selectMovie(movie)">
        <img v-lazy="movie.images.small">
        <div class="movie-info">
            <h4 class="movie-name">{{ movie.title }}</h4>
            <movierate class="movie-rate" :rate="movie.rating.average"></movierate>
            <span>{{ movie.rating.average }}</span>
            <div class="movie-director">
                导演：<span v-for="director in movie.directors" :key="director.id">{{ director.name }} </span>
            </div>
            <div class="movie-cast">
                主演：<span v-for="cast in movie.casts" :key="cast.id">{{ cast.name }} </span>
            </div>
            <div v-if="movie.collect_count" class="movie-has-watched">{{ movie.collect_count }}人看过</div>
        </div>
    </li>
    <span class="loading" v-show="value">加载中...</span>
    <span class="finished" v-show="finished">{{ finishedText }}</span>
</ul>    
</template>
<script>
import movierate from '@/components/MovieRate.vue'
export default {
    components:{
        movierate
    },
    props:{
        movies: {
            type: Array,
            default(){
                return []
            }
        },
        value: {
            type: Boolean,
            default: false
        },
        finished: {
            type: Boolean,
            default: false
        },
        finishedText: {
            type: String,
            default: "没有更多了"
        }
    },
    data(){
        return {
            loading: this.value
        };
    },
    watch: {
        value(val){
            this.loading = val; 
        },
        loading(val){
            this.$emit('input',val);
        }
    },
    methods: {
        selectMovie(movieID){
            this.$emit('selectMovie',movieID);
        },
        load(){
            this.$emit('load');
        },
        handleScroll(){
            if(this.finished || this.loading){
                return;
            }
            let list = this.$refs.list;
            //判断是否滚到底部了,这里不知道为什么总是会加起来总是会少0.5px左右，所以后面减1方便触发
            if(list.scrollTop + list.clientHeight >= list.scrollHeight - 1 ){
                this.load();
            } 
        }
    }
}
</script>
<style scoped>
.movie{
    height: 100%;
    width: 100%;
    overflow: scroll;
}
.movie img{
    height: 130px;
    width: 90px;
    vertical-align: top;
}
.movie-item{
    padding: 10px;
    display: flex;
}
.movie-info{
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.movie-rate{
    display: inline-block;
}
.movie-info h4{
    font-weight: normal;
    padding: 5px 0 5px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.movie-director,
.movie-cast{
    font-size: 12px;
    padding: 3px 0 3px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgb(61, 60, 60)
}
.movie-has-watched{
    padding-top: 15px;
    font-size: 14px;
}
.loading,
.finished{
    display: block;
    text-align: center;
}
</style>

