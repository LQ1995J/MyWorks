<template>
  <div id="app">
    <transition name="fadeIn">
      <!--需要缓存的内容放到keep-alive里-->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fadeIn">
      <!--不需要缓存的内容走这里-->
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <!--1.在父级模板中使用组件-->
    <Tab></Tab>
  </div>
</template>

<script>
  import Tab from './base/Tab.vue';  //2.引入组件
export default {
  name: 'app',
  components:{ //3.注册组件，Tab是App的组件
    Tab
  }
}
</script>

<style>
  *{margin: 0; padding: 0;}
  ul.li{list-style: none;}
  a{text-decoration: none;}
  input,button{
    -webkit-appearance: none;
  }
  .content{position: fixed; width: 100%; top:40px; bottom: 50px; overflow: auto; touch-action: none;}

  .fadeIn-enter{
    opacity: 0;
  }
  .fadeIn-enter-active{
    transition: all 0.3s linear;
  }
  .fadeIn-leave-active{
    transition: all 0.3s linear;
    opacity: 0;
  }
</style>
