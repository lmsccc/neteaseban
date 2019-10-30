import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
    computed:{
        ...mapState({
            isRending: state => state.music.isRending
        }),
        ...mapGetters([
            'getMusicURL',
            'getMusicTitle',
            'getMusicAuthor',
            'getMusicPic',
            'getStoreMusicList',
            'getMusicIndex'
        ]),
    },
    methods: {
        ...mapActions([
            'setMusic'
        ]),
        ...mapMutations([
            'SET_MUSIC_LIST'
        ])
    }
}