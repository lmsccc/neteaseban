import {
    getWantToSeeMovie,
    setWantToSeeMovie} from '@/util/movieCollect'
import {
    getCollectMusic,
    setCollectMusic} from '@/util/musicCollect'

    const collect = {
    state:{
        wantToSeeMovie: getWantToSeeMovie(),
        collectMusic: getCollectMusic()
    },
    mutations:{
        SET_WANT_SEE(state, wantSeeMovieArr){
            state.wantToSeeMovie = wantSeeMovieArr;
        },
        SET_COLLECT_MUSIC(state, collectMusicArr){
            state.collectMusic = collectMusicArr;
        }
    },
    actions:{
        setWantTo({commit},movie){
            commit('SET_WANT_SEE',setWantToSeeMovie(movie));
        },
        setCollectMusic({commit},music){
            commit('SET_COLLECT_MUSIC',setCollectMusic(music));
        }
    }
}

export default collect;