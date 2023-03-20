<template>
  <div id="app">
    <Header />

    <!-- 显示路由组件 -->
    <router-view></router-view>

    <Footer v-show="$route.meta.showFooter" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    // 发请求获取三级导航的数据，放到这里就只会请求一次，因为APP组件只会挂载一次
    this.$store.dispatch("getCategoryList");
  },
};
</script>

<style>
.clearFix::after {
  content: "";
  display: block;
  clear: both;
}
</style>
