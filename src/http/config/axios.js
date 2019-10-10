import axios from 'axios'
axios.defaults.withCredentials = true;
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
// axios.defaults.baseURL = '/bo'; //本地
// axios.defaults.baseURL = 'http://192.168.1.247:8000'; //服务器打包

// axios.defaults.timeout = 10000;

import { Message, Loading } from 'element-ui';

let loading //定义loading变量
function startLoading() { //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中……',
        background: 'rgba(255, 255, 255, 0.7)'
    })
}

function endLoading() { //使用Element loading-close 方法
    loading.close()
}
// 请求合并打开loading
let needLoadingRequestCount = 0
export function showFullScreenLoading() {
    if (needLoadingRequestCount === 0) {
        //打开加载层
        startLoading()
    }
    needLoadingRequestCount++
}
// 关闭loading
export function tryHideFullScreenLoading() {
    // console.log('加载完成')
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        // 关闭加载层
        endLoading()
    }
}





//定义一个请求拦截器
axios.interceptors.request.use(function(config) {
        // console.log('加载中')
        //打开加载层
        // showFullScreenLoading()
        return config
    }),
    //定义一个响应拦截器
    axios.interceptors.response.use(function(config) {
        // console.log(config)
        // console.log('加载完毕')
        // 关闭加载层
        // tryHideFullScreenLoading()
        if (config.data.result != 'SUCCESS' && config.data.errorMessage) {
            Message.error(
                config.data.errorMessage
            );
        }
        return config
    }, function(err) {
        // 关闭加载层
        // tryHideFullScreenLoading()
        // 加载失败
        // console.log(err.response)
        Message.error(
            '服务器返回' + err.response.status
        );
    })



// 普通get请求
function dataGet(url, params = {}) {

    return new Promise(
        (resolve, reject) => {
            axios.get(url, { params: params }).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        }
    )
}

function strGet(url, str) {

    return new Promise(
        (resolve, reject) => {
            axios.get(url + '/' + str).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        }
    )
}
// 普通post请求
function dataPost(url, params = {}) {
    return new Promise(
        (resolve, reject) => {
            axios.post(url, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        }
    )
}
// 普通put请求
function dataPut(url, params = {}) {
    return new Promise(
        (resolve, reject) => {
            axios.put(url, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        }
    )
}
// 普通DELETE请求
function dataDelete(url, params = {}) {
    return new Promise(
        (resolve, reject) => {
            axios.delete(url, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        }
    )
}
// 普通DELETE请求(str)
function dataDeleteStr(url, params = {}) {
    return new Promise(
        (resolve, reject) => {
            axios.delete(url, params).then(res => {
                resolve(res.data)
            }).catch(err => {
                reject(err)
            })
        }
    )
}
export {
    dataGet,
    dataPost,
    strGet,
    dataPut,
    dataDelete,
    dataDeleteStr
}