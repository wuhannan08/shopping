<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) of carouselList"
        :key="index"
      >
        <img :src="carousel" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["carouselList"],
  // 轮播图需要等待数据之后再new Swiper的解决方案：
  watch: {
    carouselList: {
      immediate: true,
      handler() {
        console.log("===", this.carouselList);
        // 当carouselList数据更新之后，下一次模板渲染后再创建new Swiper，这个时候轮播图结构就是完整的
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>