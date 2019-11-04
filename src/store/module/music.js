const music = {
    state: {
        music: {},
        musicIndex: 0,
        musicList: [],
        isRending: false
    },
    mutations: {
        SET_MUSIC(state, song){
            state.music = song;
        },
        SET_MUSIC_INDEX(state, index){
            state.musicIndex = index;
            if(state.musicList.length > 0) { state.music = state.musicList[index]; }
        },
        SET_MUSIC_LIST(state, list){
            state.musicList = list;
        },
        SET_ISRENDING(state, val){
            state.isRending = val;
        },
    },
    getters: {
        getMusicURL: state => {
            if(state.music.id){
                return `https://music.163.com/song/media/outer/url?id=${state.music.id}.mp3`;
            }
        },
        getMusicTitle: state => {
                return state.music.name;
        },
        getMusicAuthor: state => {
                return state.music.ar;
        },
        getMusicPic: state => {
            if(state.music.al){
                return state.music.al.picUrl;
            }
        },
        getStoreMusicList: state => {
            return state.musicList;
        },
        getMusicIndex: state => {
            return state.musicIndex;
        },
        getMusicID: state => {
            return state.music.id;
        }
    },
    actions: {
        setMusic({commit},args){
            if(args.index !== undefined) { commit('SET_MUSIC_INDEX',args.index); }
            if(args.musicList) { commit('SET_MUSIC_LIST',args.musicList); }
            commit('SET_MUSIC',args.song);
        }
    }
}

export default music;