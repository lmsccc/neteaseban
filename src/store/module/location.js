import $ from '@/util/request'
//这里使用的是高德的IP地址定位API，是根据IP地址来定位的。
const APIkey = 'd3a6af8c538edb6508703d29135412f8';
const GAODE_API = 'https://restapi.amap.com/v3/ip'

const location = {
    state: {
        city:'定位中...'
    },
    mutations: {
        SET_CITY: (state, city) => {
            state.city = city
        }
    },
    actions: {
        //用高德API获取位置
        getCity({ commit }){
            $.get(GAODE_API,{
                params: {
                    key: APIkey
                }
            }).then((res) => {
                if(res.data.status === "1"){
                    if(res.data.city.length){
                        commit('SET_CITY',res.data.city);
                    }else{
                        commit('SET_CITY',"国外");
                    }
                }else{
                    alert(res.data.info);
                }
             })//.catch((error) => {
            //     console.log(error);
            // })
        }
    }
}

export default location;