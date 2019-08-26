// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
/*导入轮播图插件*/
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
/*图片懒加载*/
import VueLazyload from 'vue-lazyload'
/*使用轮播图插件*/
Vue.use(VueAwesomeSwiper, /* { default global options } */);


Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://img5.imgtn.bdimg.com/it/u=2455938796,2467906661&fm=26&gp=0.jpg',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564726491245&di=cbf84455dbae982e061eaf768c1a1a01&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171107%2Fc843f4117f26404eaa36ca210a85ee5a.gif',
  attempt: 1
});

//全局钩子，在进入路由之前每次都会执行这个方法，还有拦截的功能
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title;
  next();
  /*拦截功能，点击list会跳转到add页面*/
/*  if(to.path ==='/list'){
    next({path:'/add'});
  }else {
    next();
  }*/
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
