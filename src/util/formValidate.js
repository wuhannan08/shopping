import Vue from 'vue'
// 引入表单验证插件， extend函数可以自定义验证规则；validate函数是验证失败获成功的结果
import { ValidationProvider, extend, ValidationObserver, localize } from 'vee-validate'
import { required, regex, is } from 'vee-validate/dist/rules'    // 引入内置验证规则
import zh from 'vee-validate/dist/locale/zh_CN.json'

localize('zh', zh); // 汉化
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

extend('required', {
    ...required,
    message: '{_field_} 是必须的'
})
// 添加正则表达式的验证规则
extend('regex', {
    ...regex,
    message: '{_field_} 验证不合法' // 覆盖错误提示信息
})
extend('is', {
    ...is,
    message: "确认密码必须与密码相同"
})
/* 自定义规则 */
extend('agree', {
    // value 是使用agree规则的表单元素值
    validate(value) {
        return value;   // 如果返回true则验证合法，否则不合法
    },
    message: '必须勾选同意协议'
})
extend('phone', {
    validate(value) {
        return (/^1\d{10}$/.test(value))
    },
    message: '手机号不合法'
})
extend('code', {
    validate(value) {
        return (/^\d{6}$/.test(value))
    },
    message: '验证码必须是6位数'
})
extend('password', {
    validate(value) {
        return (/^\w{8,16}$/.test(value))
    },
    message: '密码必须是8-16位字母或数字'
})