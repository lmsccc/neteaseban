import request from '../util/request';
const apikey = '0b2bdeda43b5688921839c8ecb20399b';
//获取正在上映的电影
export function getMovieInTheaters(params){
    params.apikey = apikey; 
    return request({
        url: '/v2/movie/in_theaters',
        method: 'get',
        params
    });
}

export function getComingSoonMovie(start, count){
    let params = {
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

export function getTop250Movie(start, count){
    let params = {
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

export function getMovieDetail(movieID){
    let params = {
        apikey
    }
    return request({
        url: '/v2/movie/subject/' + movieID,
        method: 'get',
        params
    })
}