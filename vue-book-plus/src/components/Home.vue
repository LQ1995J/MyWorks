<template>
  <div>
    <MHeader>首页</MHeader>
    <div class="content">
      <Loading v-if="loading"></Loading>
      <template v-else>
        <Swiper :swiperSlides="sliders"></Swiper>
        <div class="container">
          <h3>热门图书</h3>
          <ul>
            <li v-for="hot in hotBooks">
              <img :src="hot.bookCover" alt="">
              <b>{{hot.bookName}}</b>
            </li>
          </ul>
        </div>
      </template>
    </div>

  </div>
</template>

<script>
  //1. 引入组件 2.注册组件 3. 使用组件
  import MHeader from '../base/MHeader.vue'
  import Swiper from '../base/Swiper.vue'
//  import {getSliders, getHotBook} from '../api' //不用在../api后面加上/index.js，因为引用api会默认引用index.js
  import {getAll} from '../api'
  import Loading from '../base/Loading.vue'

  export default {
    created() {
//      this.getSlider();  // 获取轮播图
//      this.getHot(); // 获取最新图书
      this.getData();
    },
    data() {
      return {sliders: [], hotBooks: [], loading:true}
    },
    methods: {
//      async getSlider() {
//        //给data起别名sliders， 对象中的属性和名字必须和得到的结果一致
//        this.sliders = await getSliders();
//      },
//      async getHot() {
//        this.hotBooks = await getHotBook();
//      },
      async getData(){
        let [sliders, hotBooks] = await getAll(); //返回的结果是一个数组 [sliders, books]
        this.sliders = sliders;
        this.hotBooks = hotBooks;
        //....轮播图和热门图书已经获取完成了
        this.loading = false;
      }
    },
    components: {
      MHeader, Swiper, Loading
    }
  }
</script>

<!--scoped表示当前样式只能给自己用而非全局样式-->
<style scoped lang="less">
  h3{color:#999;padding: 5px 0;}
  .container {
    width: 90%;
    margin: 0 auto;
    ul{
      display: flex;
      flex-wrap: wrap; // 默认不换行
      padding-bottom: 10px;
      li{
        list-style: none;
        margin: 5px 0;
        width: 50%;
        text-align: center;
        img{width:100%;}
      }
    }
  }
</style>
