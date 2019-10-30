// import {getJson} from '@/util/jsonp'
import request from '@/util/request'
const apikey = '0b2bdeda43b5688921839c8ecb20399b';




//获取正在上映的电影
export function getMovieInTheaters(city) {
    // return getJson(`https://api.douban.com/v2/movie/in_theaters?apikey=${apikey}&city=${city}&start=0&count=1000`);
    const params = {
        apikey,
        city
    }
    return request({
        url: '/v2/movie/in_theaters',
        method: 'get',
        params
    })
}

export function getComingSoonMovie(start, count) {
    // return getJson(`https://api.douban.com/v2/movie/coming_soon?apikey=${apikey}&start=${start}&count=${count}`);
    const params = {
        apikey,
        start,
        count
    }
    return request({
        url: '/v2/movie/coming_soon',
        method: 'get',
        params
    })
}

export function getTop250Movie(start, count) {
    // return getJson(`https://api.douban.com/v2/movie/top250?apikey=${apikey}&start=${start}&count=${count}`);
    const params = {
        apikey,
        start,
        count
    }
    return request({
        url: '/v2/movie/top250',
        method: 'get',
        params
    })
}

export function getMovieDetail(movieID) {
    // return getJson(`https://api.douban.com/v2/movie/subject/${movieID}?apikey=${apikey}`);
    const params = {
        apikey
    }
    return request({
        url: '/v2/movie/subject/' + movieID,
        method: 'get',
        params
    })
}
