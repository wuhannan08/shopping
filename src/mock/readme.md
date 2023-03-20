#### 使用mockjs模拟数据
mockjs插件根据自定义的JSON数据，模拟向服务器发起请求并返回我们自定义的那个数据，实际上请求是没有发出去的，会被浏览器拦截

使用步骤：
1. npm install mockjs
2. 在mock文件夹下创建JSON文件，自定义JSON数据；（banner.json是轮播图的数据）
3. 在mock.js文件中，引入mock，并配置模拟请求的url和对应的响应数据；
4. 在入口文件中引入mock.js，让mock.js 执行一次；