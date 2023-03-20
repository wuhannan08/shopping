/* 
    配置自定义axios实例的请求拦截器和响应拦截器；
    在所有请求前加上 baseURL
*/

import axios from 'axios';  // 引入axios

// 创建自定义 axios 实例
const mockAxios = axios.create({
    baseURL: '/mock',
    timeout: 5000, // 设置5s超时时间
});

// 为自定义axios实例添加请求拦截器；当发起请求时就会执行指定的回调 
mockAxios.interceptors.request.use(function (config) {
    // 在发起请求前做点什么
    return config;
})

// 添加响应拦截器，会在then和catch之前执行
mockAxios.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    })

export default mockAxios;