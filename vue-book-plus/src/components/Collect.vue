<template>
  <div>
    <MHeader>购物车</MHeader>
    <div class="content">
      <input type="radio" value='1'>全选
      <ul>
        <input type="radio" value='2'>
        <img alt="jpg">
        <div>
          <h4>书名</h4>
          <p>信息</p>
          <b>价格</b>

        </div>
      </ul>
    </div>
    <div>按钮结算</div>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue'

  export default {
    data() {
      return {
        cartList:[] // 购物车商品列表
      }
    },
    methods: {},
    computed: {},
    components: {
      MHeader
    }
  }
</script>

<!--scoped表示当前样式只能给自己用而非全局样式-->
<style scoped>
.content{
  padding: 10px;
}
</style>
