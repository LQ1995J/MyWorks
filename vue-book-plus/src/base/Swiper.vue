<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide, index) in swiperSlides" :key="index">
      <img :src="slide" alt="">
    </swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-scrollbar"   slot="scrollbar"></div>
    <div class="swiper-pagination"  slot="pagination"></div>
    <!--<div class="swiper-button-prev" slot="button-prev"></div>-->
    <!--<div class="swiper-button-next" slot="button-next"></div>-->
  </swiper>
</template>

<script>
  export default {
    name: 'carousel',
    props:['swiperSlides'], //this.swiperSlides
    data() {
      return {
        swiperOption: {
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          autoplay: {
            delay: 2000,
            disableOnInteraction: false
          },
          speed: 1000,
//          setWrapperSize:true,
          pagination:{
            el: '.swiper-pagination'
          },  //分页器
          observeParents:true,
          loop: true  //开启轮播图前后循环模式
        },
//        swiperSlides:[1,2,3,4,5]
      }
    }
  }
</script>
<style scoped>
  img{width: 100%}
</style>
