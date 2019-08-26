<template>
  <div class="detail">
    <MHeader :back="true">详情</MHeader>
    <div>
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
          <button @click="upDate">确认修改</button>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import MHeader from '../base/MHeader.vue'
  import {findOneBook, updateBook} from '../api'
  export default {
    data() {
      return {book:{}}
    },
    watch:{
      $route(){  //只要路径变化，重新获取数据
        this.getData();
      }
    },
    created(){  //页面一加载，需要根据id发送请求，获取信息
      this.getData();
    },
    methods: {
      async getData(){  // 通过id找到某一项后赋给book
        this.book = await findOneBook(this.bid);
        // 如果是空对象，需要跳转回列表页
        // 当在代理对象上调用 Object.keys() 时调用的函数。与 enumerate 类似，这个函数也必须返回一个字符串数组。
        Object.keys(this.book).length > 0 ? void 0:this.$router.push('/list')
      },
      async upDate(){  // 点击修改图书信息
        await updateBook(this.bid, this.book);  //只有在后台响应（res.end(JSON.stringify(book))）后才会继续下一行
        this.$router.push('/list');  //修改完成后跳转页面
      },
    },
    computed: {
      bid(){
        return this.$route.params.bid;   //将路径参数的id，映射到bid上
      }
    },
    components: {
      MHeader
    }
  }
</script>

<!--scoped表示当前样式只能给自己用而非全局样式-->
<style scoped lang="less">
.detail{
  position: absolute;
  top:0;
  left: 0;
  bottom: 0;
  right:0;
  background: #ffffff;
  z-index: 100;
}
  ul{
    margin:50px 10px 0 10px;
    li{
      label{
        display: block;
        font-size: 25px;
      }
      input{
        padding: 0px 10px;
        margin:10px 0;
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

<!--
  1. 告诉服务器需要修改那一项 如 /book?id=3 需要修改id=3 的图书的数据
  2. 修改成什么样子 {bookName}
-->
