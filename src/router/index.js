import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home'
import Search from '../pages/Search'
import Detail from '../pages/Detail'
import Login from '../pages/Login'
import Register from '../pages/Register'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'
import store from '../store/vuex'
import Trade from '../pages/Trade'
import Pay from '../pages/Pay'
import PaySuccess from '../pages/PaySuccess'
import Center from '../pages/Center'
import MyOrder from '../pages/Center/MyOrder'

Vue.use(VueRouter);

// 保存原本的push方法
const originPush = VueRouter.prototype.push;
const originReplace = VueRouter.prototype.replace;
// 重写push方法
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        // 如果用户没有传入失败和成功的回调
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replcae = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        // 如果用户没有传入失败和成功的回调
        originReplace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    // 配置路由信息
    routes: [
        {
            path: '/home',
            component: Home,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/search/:keyword?',// 占位符后的?代表这个params参数可传可不传
            name: 'search',
            component: Search,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/detail/:id',
            component: Detail,
            meta: {
                showFooter: true
            }
        },
        {
            path: '/login',
            component: Login,
            meta: {
                showFooter: false
            }
        },
        {
            path: '/register',
            component: Register,
            meta: {
                showFooter: false
            }
        },
        // 将 / 重定向到 /home
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/addcartsuccess',
            name: 'addCartSuccess',
            component: AddCartSuccess,
            meta: {
                showFooter: true,
            }
        },
        {
            path: '/shopcart',
            name: 'shopcart',
            component: ShopCart,
            meta: {
                showFooter: true,
            }
        },
        {
            path: '/trade',
            component: Trade,
            meta: {
                showFooter: true
            },
            beforeEnter(to, from, next) {
                if (from.path === '/shopcart') next();
                else next(false);
            }
        },
        {
            path: '/pay',
            component: Pay,
            meta: {
                showFooter: true
            },
            beforeEnter(to, from, next) {
                if (from.path === '/trade') next();
                else next(false);
            }
        },
        {
            path: '/paysuccess',
            component: PaySuccess,
            meta: {
                showFooter: true
            },
            beforeEnter(to, from, next) {
                // 只能从支付页跳转过来
                if (from.path === '/pay') next()
                else next(false);   // 否则哪儿来的回哪儿去
            }
        },
        {
            path: '/center',
            component: Center,
            redirect: '/center/myorder',    // 访问center时默认展示myorder
            meta: {
                showFooter: true
            },
            children: [
                {
                    path: 'myorder',
                    component: MyOrder,
                }
            ]
        },
    ],
    scrollBehavior(to, from) {
        return { y: 0 };    // 路由切换时，滚动条滚到顶部
    }
})

router.beforeEach(async (to, from, next) => {
    let userName = store.state.user.name;
    let token = localStorage.getItem('token');
    // 如果用户登陆了
    if (token) {
        // 如果用户登录了，还想访问登录页；则跳转到home
        if (to.path == '/login') next('/home');
        else {
            // 如果用户登录了，想访问其它页面；
            if (userName) { // 用户名已有，则放行
                next();
            } else {    // 用户名没有的话，则根据token获取用户信息
                try {
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {   // 如果获取用户信息失败，则代表token失效了
                    alert(error)
                    // 清除token，并跳转到登录页
                    await store.dispatch('logout');
                    next('/login')
                }
            }

        }
    } else {
        // 未登录的情况
        // 如果想去 trade(订单页)、pay|paysuccess 或 /center/myorder，跳转到登录
        // 如果想去的不是上述情况，则放行
        if (to.path.indexOf('/trade') !== -1
            || to.path.indexOf('/pay') !== -1
            || to.path.indexOf('/center') !== -1) {
            // 没登陆不能访问购物车，并以query参数的形式记录用户真正想访问的地址
            next('/login?redirect=' + to.path);
        }
        else next();
    }
})

export default router;