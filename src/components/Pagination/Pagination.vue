<template>
  <div class="pagination">
    <button @click="changePage(--pageInfo.pageNo)" v-show="pageInfo.pageNo > 1">
      上一页
    </button>
    <button v-if="getStartAndEndPage.start > 1" @click="changePage(1)">
      1
    </button>
    <button v-if="getStartAndEndPage.start > 2">...</button>

    <!-- 连续的页码 -->
    <button
      :class="{ active: cur === pageInfo.pageNo }"
      v-for="(cur, index) of startToEndArray"
      :key="index"
      @click="changePage(cur)"
    >
      {{ cur }}
    </button>

    <button v-if="getStartAndEndPage.end < pageInfo.totalPages - 1">...</button>
    <button
      v-if="getStartAndEndPage.end < pageInfo.totalPages"
      @click="changePage(pageInfo.totalPages)"
    >
      {{ pageInfo.totalPages }}
    </button>
    <button
      @click="changePage(++pageInfo.pageNo)"
      v-show="pageInfo.pageNo < pageInfo.totalPages"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ pageInfo.total }} 条</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Pagination",
  props: ["continues"],
  computed: {
    ...mapGetters(["pageInfo"]),
    // 获取连续页数的start和end
    getStartAndEndPage() {
      let { pageNo, totalPages } = this.pageInfo;
      let continues = this.continues; // 连续的页码数
      let start = 0,
        end = 0; // 连续页码的开始和结束
      // 情况1：总页数小于连续页码数
      if (continues > totalPages) {
        start = 0;
        end = totalPages;
      } else {
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        // 有可能出现计算出start<1的异常情况，这个时候显示前continus页就行
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPages) {
          end = totalPages;
          start = totalPages - continues + 1;
        }
      }
      return { start, end };
    },
    startToEndArray() {
      let { start, end } = this.getStartAndEndPage;
      let arr = [];
      for (let i = start; i <= end; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    changePage(curPage) {
      this.$emit("changePage", curPage); // 触发组件的changePage事件
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>