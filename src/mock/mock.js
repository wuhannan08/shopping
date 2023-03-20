import Mock from 'mockjs';
import banner from './banner.json';
import floor from './floor.json';

// 调用mock函数模拟数据；第一个参数是请求url，第二个参数是返回的数据
Mock.mock('/mock/banner', { code: 200, data: banner });
Mock.mock('/mock/floor', { code: 200, data: floor });