<!--App.vue为根实例-->
<template>
  <div>
  <Counter></Counter>
  </div>
</template>

<script>
  import Counter from './components/Counter.vue'
  export default {
    data() {
      return {}
    },
    methods: {},
    computed: {},
    components: {
      Counter
    }
  }
</script>

<!--scoped表示当前样式只能给自己用而非全局样式-->
<style scoped>

</style>
