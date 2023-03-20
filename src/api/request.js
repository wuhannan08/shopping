/* 
    对请求进行封装
*/
import myAxios from "./axios";
import mockAxios from "./mockAxios";


export function getBaseCategoryList() {
    return myAxios.get("product/getBaseCategoryList");
}

// 使用mockjs请求banner
export function getBannerList() {
    return mockAxios.get("/banner");    // 向/mock/banner发起请求
}

export function getFloorList() {
    return mockAxios.get('/floor'); // 获取floor数据
}

// 获取搜索商品的数据 ; data为请求体
export function getSearchList(data) {
    return myAxios.post('/list', data);
}

// 获取商品详情
export function getDetail(id) {
    return myAxios.get(`/item/${id}`);
}

// 加入购物车
export function addCart(skuId, skuNum) {
    return myAxios.post(`/cart/addToCart/${skuId}/${skuNum}`);
}

// 获取购物车列表
export function getCartList() {
    return myAxios.get('/cart/cartList')
}

// 删除购物车中的商品
export function deleteCartSku(skuId) {
    return myAxios.delete(`/cart/deleteCart/${skuId}`);
}

// 修改购物车选中状态
export function updateChecked(skuId, isChecked) {
    return myAxios.get(`/cart/checkCart/${skuId}/${isChecked}`);
}

// 获取注册验证码
export function getCode(phone) {
    return myAxios.get(`/user/passport/sendCode/${phone}`);
}

// 注册用户
export function registerUser(data) {
    return myAxios.post('/user/passport/register', data);
}

// 登录
export function login(data) {
    return myAxios.post('/user/passport/login', data);
}

// 使用token获取用户信息
export function getUserInfo() {
    return myAxios.get('/user/passport/auth/getUserInfo');
}

// 退出登录
export function logout() {
    return myAxios.get('/user/passport/logout');
}

// 获取用户地址信息
export function getUserAddress() {
    return myAxios.get('/user/userAddress/auth/findUserAddressList');
}
// 获取订单交易页数据
export function getTradeInfo() {
    return myAxios.get('/order/auth/trade');
}

// 提交订单
export function submitOrder(tradeNo, data) {
    return myAxios.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data);
}
// 根据订单id获取订单详情
export function getOrderByOrderId(orderId) {
    return myAxios.get(`/payment/weixin/createNative/${orderId}`)
}
// 查询订单支付状态
export function getPayStatus(orderId) {
    return myAxios.get(`/payment/weixin/queryPayStatus/${orderId}`)
}

// 获取我的订单列表
export function getMyOrder(page, limit) {
    return myAxios.get(`/order/auth/${page}/${limit}`);
}