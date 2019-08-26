// 将mutations中的方法拆分到此文件中

import Vue from 'vue';

import App from './App.vue';
import store from './store'



// 计数器
new Vue({
  el: '#app',
  ...App,
  store  //store被注册到了实例上，所有组件都会有一个属性 this.$store 指的就是我们的store
});
