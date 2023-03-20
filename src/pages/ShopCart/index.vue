<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo of cartInfoList"
          :key="cartInfo.skuId"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked"
              @change="updateChecked(cartInfo, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeSkuNum('minus', cartInfo, $event)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="changeSkuNum('change', cartInfo, $event)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeSkuNum('plus', cartInfo, $event)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:;"
              class="sindelet"
              @click="deleteSku(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="javascript:;">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && cartInfoList.length > 0"
          @click="checkAll"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:;" @click="deleteAllChecked">删除选中的商品</a>
        <a href="javascript:;">移到我的关注</a>
        <a href="javascript:;">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.$store.dispatch("getCartList");
  },
  computed: {
    ...mapGetters(["cartInfoList"]),
    totalPrice() {
      let totalPrice = 0;
      for (let cart of this.cartInfoList) {
        totalPrice += cart.skuPrice * cart.skuNum;
      }
      return totalPrice;
    },
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
    checkedNum() {
      let checkNum = 0;
      for (let cart of this.cartInfoList) {
        if (cart.isChecked) checkNum++;
      }
      return checkNum;
    },
  },
  methods: {
    // 全选购物车列表
    async checkAll(event) {
      try {
        await this.$store.dispatch("checkAll", event.target.checked ? 1 : 0);
        this.$store.dispatch("getCartList");
      } catch {
        alert("失败");
      }
    },

    async changeSkuNum(type, cartInfo, $event) {
      let result;
      let skuNum = -1;
      if (type === "minus") {
        // 防止数量小于1
        cartInfo.skuNum > 1 ? (skuNum = -1) : (skuNum = 0);
      } else if (type === "plus") {
        skuNum = 1;
      } else {
        let value = $event.target.value * 1;
        if (isNaN(value) || value < 1) {
          skuNum = 0; // 如果输入非法，则不改变值
        } else {
          skuNum = parseInt(value) - cartInfo.skuNum;
        }
      }
      try {
        await this.$store.dispatch("addCart", {
          skuId: cartInfo.skuId,
          skuNum,
        });
        // 修改成功后重新请求服务器购物车的数据
        this.$store.dispatch("getCartList");
      } catch {
        alert("修改失败");
      }
    },
    async deleteSku(skuId) {
      try {
        await this.$store.dispatch("deleteCartSku", skuId);
        // 删除成功之后，还需要重新获取商品列表更新vuex中的数据
        this.$store.dispatch("getCartList");
      } catch {
        alert("删除失败");
      }
    },
    async updateChecked(cartInfo, $event) {
      let isChecked = $event.target.checked ? "1" : "0";
      try {
        await this.$store.dispatch("updateChecked", {
          skuId: cartInfo.skuId,
          isChecked,
        });
        this.$store.dispatch("getCartList");
      } catch {
        alert("修改失败");
      }
    },
    async deleteAllChecked() {
      try {
        await this.$store.dispatch("deleteAllChecked");
        this.$store.dispatch("getCartList");
      } catch {
        alert("失败");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            background-color: #f5f5f5;
            border-right: 0;
            float: left;
            color: #666;
            width: 12px;
            height: 33px;
            line-height: 33px;
            text-align: center;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            line-height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            background-color: #f5f5f5;
            border-left: 0;
            float: left;
            color: #666;
            width: 12px;
            height: 33px;
            line-height: 33px;
            text-align: center;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>