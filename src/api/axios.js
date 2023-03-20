/* 
    配置自定义axios实例的请求拦截器和响应拦截器；
    在所有请求前加上 baseURL
*/

import axios from 'axios';  // 引入axios
// 引入nProgress进度条效果 start方法代表进度条开始，done方法代表进度条结束
import nProgress from 'nprogress';
import 'nprogress/nprogress.css'

import { getUUID } from "../util/uuid";   // 引入游客身份生成方法

// 创建自定义 axios 实例
const myAxios = axios.create({
    baseURL: '/api',
    timeout: 5000, // 设置5s超时时间
});

// 为自定义axios实例添加请求拦截器；当发起请求时就会执行指定的回调 
myAxios.interceptors.request.use(function (config) {
    // 在发起请求前做点什么
    nProgress.start();
    config.headers.userTempId = getUUID();  // 在所有请求的请求头中增加userTempId
    // 在所有请求头中带上token
    config.headers.token = localStorage.getItem('token');
    /* 
        为了使用vercel，需要将路径改为 /api/proxy形式的，真实路径使用query参数带过去 
    */
    /* /api/path -> /api/proxy?path=path */
    config.headers.path = config.url
    config.url = '/proxy';
    console.log('请求配置对象', config);
    return config;
})

// 添加响应拦截器，会在then和catch之前执行
myAxios.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        nProgress.done();    // 进度条结束
        return response.data;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    })

export default myAxios;