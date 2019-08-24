import request from '../util/request';
// import {getJson} from '@/util/jsonp'

const apikey = '0b2bdeda43b5688921839c8ecb20399b';


function getJson(url) {
    return new Promise((resolve, reject) => {
        if (url.includes('?')) {
            url += '&callback=responHeader';
        } else {
            url += '?callback=respnHeader';
        }

        const script = document.createElement('script');
        window.responHeader = function (json) {
            try {
                resolve(json);
            } finally {
                script.parentNode.removeChild(script);
            }
        }
        script.setAttribute('src', url);
        document.body.appendChild(script);
    });
}

//获取正在上映的电影
export function getMovieInTheaters(city) {
    return getJson(`https://api.douban.com/v2/movie/in_theaters?apikey=${apikey}&city=${city}&start=0&count=1000`);
}

export function getComingSoonMovie(start, count) {
    return getJson(`https://api.douban.com/v2/movie/coming_soon?apikey=${apikey}&start=${start}&count=${count}`);
}

export function getTop250Movie(start, count) {
    return getJson(`https://api.douban.com/v2/movie/top250?apikey=${apikey}&start=${start}&count=${count}`);
}

export function getMovieDetail(movieID) {
    return getJson(`https://api.douban.com/v2/movie/subject/${movieID}?apikey=${apikey}`);
}
