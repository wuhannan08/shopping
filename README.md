#### 项目目录介绍
1. node_modules 文件夹：项目依赖的第三方包放在这里
2. public文件夹：一般用于存放静态资源，放在public中的静态资源，webpack打包时会原封不动的打包到dist文件夹中
3. src 中的 assets 文件夹：一般也是存放静态资源的（多个组件共用的静态资源），需要注意，assets文件夹中的静态资源在webpack打包时，会将其当作一个模块，打包到JS文件里面

#### 项目的其它配置（方便开发）
    1. 配置当项目运行成功时自动打开浏览器；
    --- 在package.json 中启动项目命令后加上 --open
        "scripts": {
            "serve": "vue-cli-service serve  --open",
            "build": "vue-cli-service build",
            "lint": "vue-cli-service lint"
        },

    2. 关闭eslint语法检查；
    3. 配置src文件夹的别名，当文件较多时，查找文件方便
    ---在项目根目录下创建 jsconfig.json文件，并配置 @ 代表src目录

#### Swiper 轮播图插件
1. 安装 npm i swiper --save;
2. 由于 ContainerList和Floor组件中都要用到轮播图，因此直接在入口文件引入     swiper.css;
3. 编写swiper轮播图的容器，即HTML结构；
4. new Swiper()；

问题：轮播图中要等待结构动态渲染出来之后才能new Swiper；但是请求数据是异步的，因此直接将 new Swiper放到mounted钩子中有问题，应该等待请求的数据回来之后再new Swiper；

解决方案：使用watch监听bannerList的变化，当数据变化，就调用 $nextTick() ，在$nextTick()的回调中new Swiper；即在数据改变并且视图渲染后new Swiper()；


#### Floor组件开发
Floor 组件中的每一层是动态获取的数据，请求的是mock的数据，返回一个数组，每个数组元素是一层floor；由于Floor组件是用在Home组件中的，因此请求数据要在Home组件中；


### =====详情页====

#### 路由的滚动行为
当从一个路由跳到另一个路由时，滚动条的位置不会发生改变，如果想要路由切换时滚动条滚到顶部，需要再vue-router中使用 scrollBehavior 配置；

#### 购物车数量输入框
需要判断用户的输入是否合法，非法则需要纠正：
1. 获取用户的输入 * 1； 如果输入了字符串，则*1的结果是NAN；
2. 如果输入的是整数，则 *1 就是本身；
3. 如果输入的是负数，则 *1 < 1；
4. 如果是小数，则取整；

#### sessionStorage使用
点击加入购物车后跳转成功页，需要将加入购物车的商品传递过去，而商品是一个对象，不适合使用query或params参数进行传递，因此使用sessionStorage进行存储，当加入购物车时就把对应的商品存到sessionStorage中，然后再在成功页取出来；这样每次加入购物车时都会覆盖上一次的数据，并且关闭浏览器数据就消失；


### ======购物车======
使用uuid生成唯一的游客id（对于每个游客只生成一次），然后存储在localStorage中，在每次发请求时，都在请求头userTempId中带上这个uuid，用于标识身份。


### =====用户登录=====
1. 用户输入账号密码点击登录后，如果登陆成功，服务器会返回用户的token，客户端拿到token后将token存储在localStorage中，并跳转到home页；
2. 请求拦截器：在每个请求的头部加上token字段，值从localStorage中取（如果用户没有登录，localStorage中自然没有这个值，用户登录后就有）
3. 在Home组件时向服务器发起请求，索要用户的数据，如果用户登录了token就会被传过去，获取对应的用户信息，然后保存到vuex中；
4. 在页面中如果要使用用户数据，就从vuex中取；


### ============订单模块==========================
使用到了qrcode插件，根据字符串生成二维码；
使用了Element UI 的弹窗；


### ===========search页===============
使用 vue-lazyload 插件实现图片懒加载；


### ==========表单验证==============
使用 vee-validate 插件进行表单验证，3版本配合vue2；
可以注册为全局组件，也可以在表单所在组件注册为局部组件

### ==============性能优化==================
路由懒加载： 
访问对应路由时，才加载相应的组件 component: ()=>import('./search/vue')
import() 返回的是一个Promise；当访问路由时，才会调用箭头函数，加载组件

1. 执行 npm run build 打包项目后，会在js目录下生成js文件和map文件；由于打包后的js代码都是压缩和加密的，如果出现运行时错误，无法准确定位到错误位置；有了map文件就可以准确提示错误的代码位置；因此如果不想要map文件可以删掉；或者在 vue.config.js 中配置 productionSourceMap: false
2. 将打包后的dist文件夹放到服务器中；如：放到服务器的 /root/whn/shopping/dist中；
3. 在服务器上安装nginx： yum install nginx；
4. 配置nginx，在/etc/nginx/nginx.conf文件中配置以下内容：
        location / {
            root    /root/whn/shopping/dist;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
    即当访问服务器的根目录时，自动访问 /root/whn/shopping/dist/index.html
    配置反向代理：帮服务器找数据服务器要数据
        location /api {
            proxy_pass http://182.92.128.115;
        }
    proxy_pass 对应的地址是项目ajax请求所请求的后端服务器；会将所有/api为前缀的请求映射到配置的地址；
5. service nginx start  启动nginx服务器；



## ==项目总结==
### ====项目使用到的第三方库====
1. mock.js 用于模拟指定ajax请求需要返回的数据；
    Mock.mock(url, {})当请求url时返回对应的数据
2. Swiper 轮播图插件，使用的是 Swiper 5版本
3. uuid 用于生成游客的唯一id；
4. qrcode 用于生成二维码；
5. vue-lazyload 插件实现图片懒加载；版本：1.3.3
6. vee-validate 插件实现表单验证；