<template>
  <div class="outter">
    <!-- Header部分的第一行 -->
    <header>
      <div class="header w">
        <span
          >品优购欢迎您！
          <template v-if="!userName">
            <router-link to="/login">请登录</router-link>|
            <router-link to="/register" class="register">免费注册</router-link>
          </template>
          <template v-else>
            <a href="javascript:;">{{ userName }} </a>|
            <a href="javascript:;" @click="logout">退出登录</a>
          </template>
        </span>
        <ul>
          <li><router-link to="/center/myorder">我的订单 </router-link></li>
          <li><router-link to="/shopcart">我的购物车</router-link></li>
          <li><a href="#">品优购会员</a></li>
          <li><a href="#">企业采购</a></li>
          <li><a href="#">关注品优购 </a></li>
          <li><a href="#">客户服务 </a></li>
          <li><a href="#">网站导航 </a></li>
        </ul>
      </div>
    </header>

    <!-- 搜索框部分 -->
    <section class="search w">
      <!-- logo部分 -->
      <router-link class="logo" to="/home">
        <img src="../../assets/images/logo.png" alt="" />
      </router-link>

      <!-- ============搜索部分================ -->
      <div class="search">
        <div>
          <input type="search" placeholder="语言开发" v-model="keyword" />
          <button @click="goSearch">搜索</button>
        </div>
        <ul>
          <li><a href="#">优惠购首发</a></li>
          <li><a href="#">亿元优惠</a></li>
          <li><a href="#">9.9元团购</a></li>
          <li><a href="#">每满99减30</a></li>
          <li><a href="#">办公用品</a></li>
          <li><a href="#">电脑</a></li>
          <li><a href="#">通信</a></li>
        </ul>
      </div>
      <a href="#" class="cart"><span></span> 我的购物车&nbsp;&nbsp;</a>
    </section>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  computed: {
    userName() {
      return this.$store.state.user.name;
    },
  },
  mounted() {
    // 绑定自定义事件；当删除search组件中keyword的面包屑时，要清空keyword
    this.$bus.$on("clearKeyword", () => {
      this.keyword = "";
    });
    this.$API.get();
  },
  methods: {
    goSearch() {
      let location = {
        name: "search",
        params: {
          // 如果keyword传递了空串，会导致路径出错，使用undefined代替可以解决
          keyword: this.keyword || undefined,
        },
        query: this.$route.query, // 如果有query参数还得带上query参数
      };
      this.$router.push(location);
    },
    // 退出登录的回调
    async logout() {
      try {
        await this.$store.dispatch("logout");
        // 退出登录后跳转首页
        this.$router.push("/home");
      } catch (error) {
        alert(error);
      }
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 32px;
  background-color: #f1f1f1;
}

.header {
  height: 100%;
  line-height: 32px;
}

.header span {
  float: left;
  font-size: 12px;
  color: #666666;
}

.header span .register {
  color: #c81623;
}

.header ul {
  float: right;
}

.header ul li {
  float: left;
}

.header ul li a {
  padding: 0 18px;
  border-left: 1px solid #666;
  font-family: "icomoon";
}

.header ul li:first-child a {
  border-left: 0;
}

section.search {
  height: 67px;
  margin-top: 24px;
  margin-bottom: 15px;
}

.logo {
  float: left;
  margin-right: 172px;
}

div.search {
  float: left;
  width: 538px;
  height: 100%;
}

.search .search div {
  width: 538px;
  height: 36px;
  border: 2px solid #b1191a;
}

div.search input {
  float: left;
  width: 454px;
  height: 32px;
  padding-left: 10px;
  border: 0;
  color: #666;
  font-size: 14px;
}

div.search button {
  float: left;
  height: 32px;
  width: 80px;
  background-color: #b1191a;
  color: #fff;
  border: 0;
  cursor: pointer;
}

div.search ul {
  margin-top: 7px;
}

div.search ul li {
  float: left;
  padding: 0 13px;
}

div.search ul li:first-child a {
  color: #b1191a;
}

section.search .cart {
  float: right;
  width: 140px;
  height: 36px;
  margin-right: 65px;
  background-color: #f7f7f7;
  border: 1px solid #dfdfdf;
  font-family: "icomoon";
  line-height: 36px;
  text-align: center;
}

section.search .cart span {
  color: #db5c5c;
}
</style>