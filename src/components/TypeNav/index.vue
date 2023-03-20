<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseleave="showLeave">
      <div>
        <h2 class="all" @mouseenter="show = true">全部商品分类</h2>
        <div class="sort" @mouseleave="leaveIndex" v-show="show">
          <!-- 通过事件委派实现点击一级、二级、三级导航的跳转 -->
          <div class="all-sort-list2" @click="goSearch">
            <!-- 一级导航 -->
            <div
              class="item"
              v-for="(item, index) of categoryList"
              :key="item.categoryId"
              :class="{ cur: currentIndex == index }"
            >
              <h3 @mouseenter="changeIndex(index)">
                <a
                  :data-categoryName="item.categoryName"
                  :data-category1Id="item.categoryId"
                  >{{ item.categoryName }}</a
                >
              </h3>
              <div
                class="item-list clearfix"
                :style="{ display: currentIndex == index ? 'block' : 'none' }"
              >
                <!-- 二级导航 -->
                <div
                  class="subitem"
                  v-for="subitem of item.categoryChild"
                  :key="subitem.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="subitem.categoryName"
                        :data-category2Id="subitem.categoryId"
                        >{{ subitem.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级导航 -->
                      <em
                        v-for="subitemChild of subitem.categoryChild"
                        :key="subitemChild.categoryId"
                      >
                        <a
                          :data-categoryName="subitemChild.categoryName"
                          :data-category3Id="subitemChild.categoryId"
                          >{{ subitemChild.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1, // 当前鼠标在哪个一级导航上
      show: true, // 一级导航是否展示
    };
  },

  mounted() {
    // 如果不是home组件，则隐藏一级导航
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState(["categoryList"]),
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index;
    },
    leaveIndex() {
      this.currentIndex = -1;
    },
    // 点击导航选项跳转搜索页
    goSearch(event) {
      /* 
        存在的问题：（1）如何确定点击的是导航对应的a标签？通过自定义属性data-categoryName；
        （2）如何知道点击的是一级导航还是二级或三级导航？给对应导航的a标签添加不同的自定义属性来区分；
       */
      const el = event.target;
      let location = { name: "search" }; // 路由跳转对象
      // 如果存在自定义属性data-categoryName则是a标签
      if (el.dataset.categoryname) {
        let query = { categoryName: el.dataset.categoryname }; // 请求参数对象
        // 判断是否是一级标签
        if (el.dataset.category1id) {
          query.category1Id = el.dataset.category1id;
        } else if (el.dataset.category2id) {
          query.category2Id = el.dataset.category2id;
        } else if (el.dataset.category3id) {
          query.category3Id = el.dataset.category3id;
        }
        location.query = query;
        // 如果是先搜索再点击的三级导航选项，则要带上之前搜索的params参数，即搜索关键词
        location.params = this.$route.params;
        // 使用编程式导航跳转
        this.$router.push(location);
      }
    },
    // 鼠标离开一级导航标题时的回调
    showLeave() {
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          height: 27px;
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        // 用于控制鼠标hover一级导航的背景
        .cur {
          background-color: skyblue;
        }
      }
    }
  }
}
</style>
