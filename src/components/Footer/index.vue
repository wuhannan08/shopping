<template>
  <footer>
    <div class="w">
      <div class="hd">
        <ul>
          <li>
            <img src="./images/circle1.png" alt="" />
            <div class="info">
              <h4>正品保障</h4>
              <p>正品保障，提供发票</p>
            </div>
          </li>
          <li>
            <img src="./images/circle2.png" alt="" />
            <div class="info">
              <h4>急速物流</h4>
              <p>急速物流，急速送达</p>
            </div>
          </li>
          <li>
            <img src="./images/circle3.png" alt="" />
            <div class="info">
              <h4>无忧售后</h4>
              <p>7天无理由退换货</p>
            </div>
          </li>
          <li>
            <img src="./images/circle4.png" alt="" />
            <div class="info">
              <h4>特色服务</h4>
              <p>私人定制家电套餐</p>
            </div>
          </li>
          <li>
            <img src="./images/circle5.png" alt="" />
            <div class="info">
              <h4>购物中心</h4>
              <p>您的购物指南</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="bd">
        <dl>
          <dt>购物指南</dt>
          <dd>购物流程</dd>
          <dd>会员介绍</dd>
          <dd>生活旅行/团购</dd>
          <dd>常见问题</dd>
          <dd>大家电</dd>
          <dd>联系客服</dd>
        </dl>
        <dl>
          <dt>配送方式</dt>
          <dd>上门自提</dd>
          <dd>211限时达</dd>
          <dd>配送服务查询</dd>
          <dd>配送费收取标准</dd>
          <dd>海外配送</dd>
        </dl>
        <dl>
          <dt>支付方式</dt>
          <dd>货到付款</dd>
          <dd>在线支付</dd>
          <dd>分期付款</dd>
          <dd>邮局汇款</dd>
          <dd>公司转账</dd>
        </dl>
        <dl>
          <dt>售后服务</dt>
          <dd>价格保护</dd>
          <dd>退款说明</dd>
          <dd>返修/退换货</dd>
          <dd>取消订单</dd>
        </dl>
        <dl>
          <dt>特色服务</dt>
          <dd>夺宝岛</dd>
          <dd>DIY装机</dd>
          <dd>延保服务</dd>
          <dd>品优购E卡</dd>
          <dd>品优购通信</dd>
        </dl>
        <dl>
          <dt>帮助中心</dt>
          <dd>
            <img src="./images/code.png" alt="" />
          </dd>
          <dd>品优购客户端</dd>
        </dl>
      </div>
      <div class="footer">
        <ul>
          <li><a href="#">关于我们</a></li>
          <li><a href="#">联系我们</a></li>
          <li><a href="#">联系客服</a></li>
          <li><a href="#">商家入驻</a></li>
          <li><a href="#">营销中心</a></li>
          <li><a href="#">手机品优购</a></li>
          <li><a href="#">友情链接</a></li>
          <li><a href="#">销售联盟</a></li>
          <li><a href="#">品优购社区</a></li>
          <li><a href="#">品优购公益</a></li>
          <li><a href="#">English Site</a></li>
          <li><a href="#">Contact U</a></li>
        </ul>
        <p>
          地址：北京市昌平区建材城西路金燕龙办公楼一层 邮编：100096
          电话：400-618-4000 传真：010-82935100 邮箱: zhanghj+itcast.cn
        </p>
        <p>京ICP备08001421号京公网安备110108007702</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style>
footer {
  height: 418px;
  background-color: #f5f5f5;
  margin-top: 40px;
}

footer .w {
  height: 100%;
}

footer .hd {
  height: 108px;
  border-bottom: 1px solid #ededed;
}

footer .hd ul {
  height: 100%;
}

footer .hd li {
  float: left;
  height: 100%;
  padding: 30px 0 30px 70px;
}

footer .hd img {
  float: left;
}

footer .hd .info {
  float: left;
  margin-left: 7px;
  padding-top: 7px;
}

footer .hd .info h4 {
  font-size: 14px;
  color: #333333;
}

footer .hd .info p {
  padding-top: 5px;
  font-size: 12px;
  color: #666;
}

footer .bd {
  height: 200px;
  border-bottom: 1px solid #ededed;
}

footer .bd dl {
  float: left;
  margin-left: 45px;
  padding: 24px 35px 24px 35px;
}

footer .bd dt {
  margin-bottom: 12px;
  font-size: 16px;
  color: #333333;
}

footer .bd dd {
  font-size: 12px;
  color: #666;
  line-height: 20px;
}

footer .bd dl:last-of-type {
  text-align: center;
}

footer .footer {
  font-size: 12px;
  color: #666;
  text-align: center;
}

footer .footer ul {
  height: 28px;
  margin-left: 100px;
  margin-top: 20px;
}

footer .footer li {
  float: left;
}

footer .footer li a {
  padding: 0 14px;
  border-right: 1px solid #666;
}

footer .footer li:last-of-type a {
  border: 0;
}

footer .footer p {
  line-height: 20px;
}
</style>