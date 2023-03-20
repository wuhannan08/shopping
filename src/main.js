import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/vuex'
import TypeNav from './components/TypeNav' // 引入TypeNav组件，注册为全局的
import Carousel from "./components/Carousel/Carousel"
import Pagination from "./components/Pagination/Pagination"
// 引入element UI
import { MessageBox } from 'element-ui'

import './mock/mock.js'
import 'swiper/css/swiper.css' // 引入swiper插件的css
import './util/formValidate'

import * as API from './api/request'  // 引入所有网络请求的方法
Vue.prototype.$API = API; // 绑定到$API上
Vue.component('TypeNav', TypeNav);
Vue.component("Carousel", Carousel);
Vue.component("Pagination", Pagination);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

new Vue({
  render: h => h(App),
  router,
  store,
  // 安装全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount('#app')
