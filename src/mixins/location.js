import {mapState, mapActions} from 'vuex'

export default {
    methods: {
        ...mapActions([
            'getCity'
        ])
    },
    computed: {
        ...mapState({
            city: state => state.location.city
        })
    }
}