<template>
    <div class="movie-detail">
        <div class="header">
            <i class="iconfont backButton" @click="handleBack">&#xe691;</i>
            <div class="header-title">
                <i class="iconfont title-logo">&#xe679;</i>
                <span>电影</span>
            </div>
        </div>
        <div class="movie-picture">
            <img :src="movie.images.small" />
        </div>

        <div class="movie-info">
            <div class="movie-text">
                <h4 class="movie-title">{{ movie.title }}</h4>
                <div class="movie-info-item">
                    <span>{{ movie.year }} </span>
                    <span v-for="genres in movie.genres" :key="genres">{{ genres }} </span>
                </div>
                <div class="movie-info-item">原名：{{ movie.original_title }}</div>
                <div class="movie-info-item">上映时间：{{ getChinaPubdates(movie.pubdates)[0] }}</div>
                <div class="movie-info-item">片长：{{ movie.durations[0] }}</div>
            </div>
            <div class="movie-rate">
                <div class="title">豆瓣评分</div>
                <div class="score">{{ movie.rating.average }}</div>
                <movierate :rate="movie.rating.average" class="rate"></movierate>
                <div class="collect">{{ movie.ratings_count }}人</div>
            </div>
        </div>

        <div class="movie-summary">
            <h4 class="title">剧情简介</h4>
            <div class="content">
                &nbsp;&nbsp;&nbsp;&nbsp;{{ summary }}
                <span
                    class="expand-button"
                    @click="isSummaryExpand = true"
                    v-show="!isSummaryExpand"
                >(展开)</span>
            </div>
        </div>

        <div class="movie-people">
            <h4 class="title">影人</h4>
            <ul class="people-list">
                <li
                    class="people-list-directoe"
                    v-for="director in movie.directors"
                    :key="director.id"
                >
                    <img :src="director.avatars.small" />
                    <div>导演</div>
                    <div>{{ director.name }}</div>
                </li>
                <li
                    class="people-list-cast"
                    v-for="cast in movie.casts"
                    :key="cast.id"
                >
                    <img :src="cast.avatars.small" />
                    <div>演员</div>
                    <div>{{ cast.name }}</div>
                </li>
            </ul>
        </div>

        <div class="movie-comments">
            <list v-model="currentTag">
                <list-item name="短评">
                    <ul class="comment-list">
                        <li 
                            class="comment"
                            v-for="comment in movie.popular_comments"
                            :key="comment.id"
                        >   
                            <div><img :src="comment.author.avatar"></div>
                            <div class="comment-content">
                                <span class="author-name">{{ comment.author.name }}</span>
                                <movierate :rate="comment.rating.value"></movierate>
                                <div class="comment-text">{{ comment.content }}</div>
                                <div class="comment-time">{{ comment.created_at }}</div>
                            </div>
                        </li>
                    </ul>
                </list-item>
                <list-item name="影评">
                    <ul class="comment-list">
                        <li 
                            class="comment"
                            v-for="comment in movie.popular_reviews"
                            :key="comment.id"
                        >   
                            <div><img :src="comment.author.avatar"></div>
                            <div class="comment-content">
                                <span class="author-name">{{ comment.author.name }}</span>
                                <movierate :rate="comment.rating.value"></movierate>
                                <h4 class="comment-title">{{ comment.title }}</h4>
                                <div class="comment-text">{{ comment.summary }}</div>
                                <div class="comment-time">{{ comment.created_at }}</div>
                            </div>
                        </li>
                    </ul>
                </list-item>
            </list>
        </div>
    </div>
</template>
<script>
const SUMMARY_MAX_WORD = 65;

import movierate from "../components/MovieRate";

export default {
    data() {
        return {
            isSummaryExpand: false,
            currentTag: "短评"
        };
    },
    components: {
        movierate
    },
    props: {
        movie: {
            type: Object,
            require: true
        }
    },
    computed: {
        summary() {
            let summary = this.movie.summary;
            if (!summary) return;
            if (!this.isSummaryExpand) {
                return summary.slice(0, SUMMARY_MAX_WORD) + "...";
            } else {
                return summary;
            }
        }
    },
    methods: {
        getChinaPubdates(pubdates) {
            if (pubdates) {
                return pubdates.filter(date => {
                    if (date.indexOf("中国大陆") > -1) {
                        return date;
                    }
                });
            }
        },
        handleBack() {
            this.$emit("hide");
            this.isSummaryExpand = false;
        }
    }
};
</script>
<style scoped>
.movie-detail {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    overflow: auto;
    background-color: #fff;
    z-index: 10002;
}
.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 40px;
    color: #fff;
    background-color: rgba(54, 194, 59, 0.5);
    z-index: 10003;
}
.header .backButton {
    position: absolute;
    top: 5px;
    left: 20px;
    font-size: 30px;
}
.header-title {
    text-align: center;
    padding-top: 5px;
}
.header-title div,
.header-title i {
    vertical-align: middle;
    margin: 0 5px 0 5px;
}
.movie-picture {
    text-align: center;
    padding-top: 50px;
    padding-bottom: 20px;
    background-color: #36c23b;
}
.movie-picture img {
    height: 300px;
}
.movie-info {
    display: flex;
    padding: 20px;
}
.movie-info .movie-title {
    margin-bottom: 10px;
}
.movie-text {
    flex: 0 0 70%;
}
.movie-rate {
    flex: 1;
    box-shadow: 0 0 10px 3px #ccc;
    text-align: center;
}
.movie-info-item {
    color: #777;
    font-size: 12px;
    margin-bottom: 5px;
}
.movie-rate .title {
    color: #777;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 8px;
}
.score,
.rate,
.collect {
    margin-bottom: 5px;
    font-size: 14px;
}
.movie-summary {
    padding: 20px;
}
.title {
    font-size: 12px;
    font-weight: normal;
    color: #777;
    margin-bottom: 10px;
}
.movie-summary .content {
    line-height: 24px;
    font-size: 14px;
}
.movie-summary .expand-button {
    color: #36c23b;
}
.movie-people{
    padding: 20px;
}
.people-list{
    white-space: nowrap;
    overflow: scroll;
}
.people-list li {
    width: 100px;
    display: inline-block;
    margin-right: 8px;
    text-align: center;
    color: #777;
    font-size: 14px;
    line-height: 22px;
}
.people-list li div{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.people-list img{
    height: 130px;
}
.movie-comments{
    padding: 20px;
}
.comment{
    list-style: none;
    display: flex;
    margin-top: 20px;
    font-size: 14px;
}
.comment img{
    border-radius: 50%;
    width: 36px;
}
.comment-content{
    padding-left: 10px;
}
.comment-title{
    padding-bottom: 10px;
    font-weight: normal;
    font-size: 16px;
}
.comment-text{
    color: #777;
}
.comment-time{
    padding-top: 10px;
    color: #777;
}
</style>
