<template>
  <div>
    计数器： <button @click="minus">-</button><br>
    当前：{{this.$store.state.count}}<br>
    计数器： <button @click="add">+</button>
    {{$store.getters.val}}
    <br>

  </div>
</template>

<script>
  import * as Types from '../store/mutations-types';
  export default {
    data() {
      return {}
    },
    methods: {
      add(){
        // 提交 add 的mutation
        // add 为需要的方法，2 为载荷payload
        /*this.$store.commit('add', 2); *///commit会自动寻找mutations（main.js）中的add方法
        this.$store.commit(Types.INCREMENT, 2);
      },
      minus(){
        this.$store.commit(Types.DECREMENT, 1);
      }
    },
    computed: {},
    components: {}
  }
</script>

<!--scoped表示当前样式只能给自己用而非全局样式-->
<style scoped>

</style>
