import vuex from 'vuex';
import Vue from 'vue';
import {
    getBaseCategoryList, getBannerList, getFloorList, getSearchList,
    getDetail, addCart, getCartList, deleteCartSku, updateChecked,
    getCode, registerUser,
    login, getUserInfo, logout,
    getTradeInfo,
    getUserAddress, submitOrder, getOrderByOrderId, getPayStatus
} from "../api/request";


Vue.use(vuex);  // 使用插件

const actions = {
    // 获取三级分类列表
    async getCategoryList(context) {
        const result = await getBaseCategoryList();
        context.commit('GET_CATEGORYLIST', result.data);
    },
    // 获取轮播图图片列表
    async getBannerList(context) {
        const result = await getBannerList();
        if (result.code === 200) {
            context.commit('GET_BANNERLIST', result.data)
        }
    },
    async getFloorList(context) {
        let result = await getFloorList();
        if (result.code === 200) {
            context.commit("GET_FLOORLIST", result.data);
        }
    },
    async getSearchList(context, data) {
        let result = await getSearchList(data);
        if (result.code === 200) {
            context.commit("GET_SEARCHLIST", result.data)
        }
    },

    // 获取商品详情
    async getGoodDetail(context, id) {
        let result = await getDetail(id);
        if (result.code === 200) {
            context.commit("GET_GOODDETAIL", result.data);
        }
    },

    // 在组件中调用addCart加入购物车，需要获取成功或失败的结果，返回的是一个promise
    async addCart(context, { skuId, skuNum }) {
        let result = await addCart(skuId, skuNum);
        if (result.code == 200) {
            return '成功';
        } else {
            return Promise.reject('失败');
        }

    },
    async getCartList(context) {
        let result = await getCartList();
        if (result.code == 200) {
            context.commit('GET_CARTLIST', result.data);
        }
    },
    // 删除购物车中的商品
    async deleteCartSku(context, skuId) {
        let result = await deleteCartSku(skuId);
        if (result.code == 200) {
            return '成功';

        } else {
            return Promise.reject('失败')
        }
    },
    async updateChecked(context, { skuId, isChecked }) {
        let result = await updateChecked(skuId, isChecked);
        if (result.code == 200) {
            return '成功';
        } else {
            return Promise.reject('失败');
        }
    },
    // 删除所有选中的商品
    deleteAllChecked(context) {
        // 获取所有购物车商品中选中的，并发起请求
        let resultPromise = context.getters.cartInfoList.map(item => {
            return item.isChecked == 1 ? context.dispatch('deleteCartSku', item.skuId) : '';
        });
        // 如果有一个失败，则返回失败，否则返回成功
        return Promise.all(resultPromise);
    },
    // 全选/全不选
    checkAll(context, isChecked) {
        // 遍历所有商品，并修改勾选状态
        let resultPromise = context.getters.cartInfoList.map(item => {
            return context.dispatch('updateChecked', { skuId: item.skuId, isChecked });
        })
        return Promise.all(resultPromise);
    },


    // 获取注册验证码
    async getCode(context, phone) {
        let result = await getCode(phone);
        if (result.code == 200) {
            return result.data;
        } else {
            return Promise.reject('失败');
        }
    },
    // 注册用户
    async register(context, user) {
        let result = await registerUser(user);
        if (result.code == 200) {
            return result.message;
        } else {
            return Promise.reject(result.message);
        }
    },

    // 登录
    async login(context, user) {
        let result = await login(user);
        if (result.code == 200) {
            // 如果登录成功，则将返回的token保存到localStorage
            localStorage.setItem('token', result.data.token);
            return result.message;
        } else {
            return Promise.reject(result.message);
        }
    },
    // 获取登录用户信息
    async getUserInfo(context) {
        let result = await getUserInfo();
        if (result.code == 200) {
            context.commit("GET_USERINFO", result.data);
            return 'ok'
        } else {
            return Promise.reject(result.message);
        }
    },
    // 退出登录
    async logout(context) {
        let result = await logout();
        if (result.code == 200) {
            context.commit('LOGOUT')
            return result.message;
        } else {
            return Promise.reject(result.message);
        }
    },

    // 获取用户地址信息
    async getUserAddress(context) {
        let result = await getUserAddress();
        if (result.code == 200) {
            console.log(result);
        } else {
            alert('获取地址失败', result.message)
        }
    },
    // 获取订单交易页
    async getTradeInfo(context) {
        let result = await getTradeInfo();
        if (result.code === 200) {
            context.commit('GET_TRADEINFO', result.data);
        } else {
            alert('订单获取失败', result.message);
        }
    },
    async submitOrder(context, data) {
        let result = await submitOrder(data.tradeNo, data);
        if (result.code == 200) {
            return result.data;
        } else {
            return Promise.reject(result.message);
        }
    },
    async getOrder(context, orderId) {
        let result = await getOrderByOrderId(orderId);
        if (result.code == 200) {
            return result.data;
        } else {
            return Promise.reject(result.message)
        }
    },
    // 查询订单支付状态
    async getPayStatus(context, orderId) {
        return await getPayStatus(orderId);
    },

   
};
const mutations = {
    GET_CATEGORYLIST(state, value) {
        state.categoryList = value;
    },
    GET_BANNERLIST(state, value) {
        state.bannerList = value
    },
    GET_FLOORLIST(state, value) {
        state.floorList = value;
    },
    GET_SEARCHLIST(state, value) {
        state.searchList = value;
    },
    GET_GOODDETAIL(state, value) {
        state.detail = value;
    },
    GET_CARTLIST(state, value) {
        state.shopCartList = value;
    },
    GET_USERINFO(state, value) {
        state.user = value;
    },
    LOGOUT(state) {
        state.user = {};
        localStorage.removeItem('token')
    },
    GET_TRADEINFO(state, value) {
        state.tradeInfo = value;
    },
};
const state = {
    categoryList: [],
    bannerList: [],
    floorList: [],
    searchList: {},
    detail: {},
    shopCartList: [],
    user: {},
    tradeInfo: {}
};
const getters = {
    attrsList(state) {
        return state.searchList.attrsList;
    },
    goodsList(state) {
        return state.searchList.goodsList;
    },
    trademarkList(state) {
        return state.searchList.trademarkList;
    },
    // 返回state中分页相关的数据，是一个对象
    pageInfo(state) {
        return {
            pageNo: state.searchList.pageNo,
            pageSize: state.searchList.pageSize,
            total: state.searchList.total,
            totalPages: state.searchList.totalPages,
        };
    },
    // 详情部分=======
    categoryView(state) {
        return state.detail.categoryView || {};
    },
    skuInfo(state) {
        return state.detail.skuInfo || {};
    },
    spuSaleAttrList(state) {
        return state.detail.spuSaleAttrList || {};
    },
    // ==========购物车=============
    cartInfoList(state) {
        // 保证state.shopCartList[0]至少是一个空对象
        state.shopCartList[0] = state.shopCartList[0] || {};
        return state.shopCartList[0].cartInfoList || [];
    },


    // =================订单=======================
    userAddressList(state) {
        return state.tradeInfo.userAddressList || [];
    },
    detailArrayList(state) {
        return state.tradeInfo.detailArrayList || [];
    },


};
export default new vuex.Store({
    actions,
    mutations,
    state,
    getters
})