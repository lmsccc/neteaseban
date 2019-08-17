import axios from 'axios'

const service = axios.create({
    baseURL: '',
    timeout: 30000,
})
let cancelToken = axios.CancelToken;
let pendingRequest = [];
//取消请求
function clearPending(config){
    pendingRequest.forEach((pending) => {
        if(pending.url === (config.url + '&' + config.method)){
            pending.f();
        }
    })
}

//请求拦截器
service.interceptors.request.use((config) => {
    clearPending(config);
    config.cancelToken = new cancelToken((c) => {
        pendingRequest.push({url:config.url + '&' + config.method,f:c});
    });
    return config;
})
//响应拦截器
service.interceptors.response.use((response) => {
    clearPending(response.config);
    return response;
})

export default service