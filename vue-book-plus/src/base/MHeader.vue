<template>
  <div class="header">
    <slot></slot>
    <i class="iconfont icon-fanhui" v-if="back" @click="goBack"></i>
  </div>
</template>

<script>
  export default {
    props:{
      back:{
        type:Boolean,
        default:false,
      }
    },
    methods: {
      goBack(){
        this.$router.go(-1);
      },
    },
  }
</script>

<!--scoped表示当前样式只能给自己用而非全局样式-->
<style scoped lang="less">
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width:100%;
    background: #afd9ee;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    i{
      position: absolute;
      left:10px;
      font-size: 20px;
    }
  }

</style>
