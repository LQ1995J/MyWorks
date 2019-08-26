<template>
  <div>
    <MHeader>添加</MHeader>
    <div class="content">
      <ul>
        <li>
          <label for="bookName">书的名称</label>
          <input type="text" v-model="book.bookName" id="bookName">
        </li>
        <li>
          <label for="bookInfo">书的信息</label>
          <input type="text" v-model="book.bookInfo" id="bookInfo">
        </li>
        <li>
          <label for="bookPrice">书的价格</label>
          <input type="text" v-model.number="book.bookPrice" id="bookPrice">
        </li>
        <li>
          <label for="bookCover">书的封面</label>
          <input type="text" v-model="book.bookCover" id="bookCover">
        </li>
        <li>
          <button @click="add">添加</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue'
  import {addBook} from '../api'

  export default {
    data() {
      return {book:{}}
    },
    methods: {
      async add(){
        await addBook(this.book);
        this.$router.push('./list')
      }
    },
    computed: {},
    components: {MHeader}
  }
</script>

<!--scoped表示当前样式只能给自己用而非全局样式-->
<style scoped lang="less">
  ul {
    margin: 50px 10px 0 10px;
    li {
      label {
        display: block;
        font-size: 25px;
      }
      input {
        padding: 0px 10px;
        margin: 10px 0;
        height: 30px;
        width: 100%;
        border: 1px solid cornflowerblue;
        border-radius: 4px;
        box-sizing: border-box;
        outline: none;
      }
      button {
        font-weight: bold;
        font-size: 16px;
        color: #ffffff;
        display: block;
        width: 80px;
        height: 35px;
        background: #017296;
        border: 1px solid cornflowerblue;
        border-radius: 4px;
        /*outline: none;*/
        margin-left: 200px;
      }
    }
  }
</style>
