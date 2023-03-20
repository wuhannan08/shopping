<template>
  <div class="home">
    <TypeNav />
    <ListContainer />
    <TodayRecommend />
    <Rank />
    <Like />
    <Floor v-for="floor of floorList" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer.vue";
import TodayRecommend from "./TodayRecommend/TodayRecommend.vue";
import Like from "./Like/Like.vue";
import Rank from "./Rank/Rank.vue";
import Floor from "./Floor/Floor.vue";
import Brand from "./Brand/Brand.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, TodayRecommend, Like, Rank, Floor, Brand },
  mounted() {
    // 派发获取floor数据的请求
    this.$store.dispatch("getFloorList");
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapState(["floorList"]),
  },
};
</script>

<style scoped>
.home {
  margin: 40px 0 80px;
}
</style>