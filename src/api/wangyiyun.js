import request from '../util/request';
const BASEURL = 'http://www.lmsccc.xyz:10001'

export function getBanner(){
    return request({
        url: BASEURL + '/banner'
    });
}

export function getPersonalized(){
    return request({
        url: BASEURL + '/personalized'
    })
}

export function getMusicList(id){
    let params = {id};
    return request({
        url: BASEURL + '/playlist/detail',
        params
    });
}

export function getLyric(id){
    let params = {id};
    return request({
        url: BASEURL + '/lyric',
        params
    })
}