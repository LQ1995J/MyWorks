import Vue from 'vue'
import Router from 'vue-router'
// import Add from '../components/Add.vue';
// import List from '../components/List.vue';
// import Detail from '../components/Detail.vue';
// import Collect from '../components/Collect.vue';
// import Home from '../components/Home.vue';

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: () => import('../components/Home.vue'),
      meta: {keepAlive: true, title:'首页'}
    },//this.$route.meta.keepAlive},
    {
      path: '/add',
      component: () => import('../components/Add.vue'),
      meta:{title:'添加'}
    },
    {
      path: '/list',
      component: () => import('../components/List.vue'),
      meta:{title:'列表'}
    },
    // /detail/1 {bid:1} 路径参数，必须有但是可以随机
    {
      path: '/detail/:bid',
      component: () => import('../components/Detail.vue'),
      name: 'detail'
    },  //
    {
      path: '/collect',
      component: () => import('../components/Collect.vue') ,//动态加载的方法，你不执行这个函数的时候是不走的，执行这个函数的时候才会调用这个组件，把这个组件的返回结果赋给这个component，相当于异步
      meta:{title:'购物车'}
    },
    {
      path: '*', redirect: '/home'
    }
  ]
})
