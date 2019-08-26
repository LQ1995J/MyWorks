<template>
  <div class="footer">
    <!--1.声明组件-->
    <router-link to="/home">
      <i class="iconfont icon-shouyeshouye"></i>
      <span>首页</span>
    </router-link>
    <router-link to="/list">
      <i class="iconfont icon-liebiao"></i>
      <span>列表</span>
    </router-link>
    <router-link to="/collect">
      <i class="iconfont icon-shoucang"></i>
      <span>购物车</span>
    </router-link>
    <router-link to="/add">
      <i class="iconfont icon-tianjia"></i>
      <span>添加</span>
    </router-link>
  </div>
</template>

<!--scoped表示当前样式只能给自己用而非全局样式-->
<!--
  flex布局：
    display: flex;
    flex-direction: row / column
    justify-content: center; 垂直居中
    align-items: center; 横向居中
    flex: 1; 每份占1

 router-link-exact-active: 确切激活的  /home  /home  必须所有路径匹配才可激活
 router-link-active： 激活的   /home/a    /home 只要根路径匹配即可
-->
<style scoped lang="less">
  .footer{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width: 100%;
    height: 50px;
    display: flex;
    border-top:1px solid #cccccc;
    a{
      display:flex;
      color: #017296;
      flex-direction: column;
      flex: 1;
      align-items: center;
      justify-content: center;
    }
    a.router-link-active{
      background: #017296;
      color: #ffffff;
    }
  }

</style>
