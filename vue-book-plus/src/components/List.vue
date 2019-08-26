<template>
  <div>
    <MHeader>列表页</MHeader>
    <div class="content" ref="scroll" @scroll="loadMore">
      <ul>
        <router-link
          v-for="(book, index) in books"
          :to="{name:'detail', params:{bid:book.bookId}}"
          :key="index"
          tag="li">
          <img v-lazy="book.bookCover" alt="jpg">
          <div>
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice}}</b>
            <div class="btn-list">
              <button @click.stop="remove(book.bookId)">删除</button>
              <button @click.stop="increase">添加</button>
            </div>
          </div>
        </router-link>
      </ul>
      <div @click="more" class="more">加载更多</div>
    </div>
  </div>
</template>

<script>
  import {pagination, removeBook} from '../api'
  import MHeader from '../base/MHeader.vue'

  export default {
    data() {
      // offset代表的是偏移量，hasMore代表是否有更多  默认没有在加载
      return {books: [], offset: 0, hasMore: true, isLoading: false}
    },
    created() {
      this.getData();
    },
    mounted() {
      // 下拉刷新
      let scroll = this.$refs.scroll;  //获取到要拖拽的元素
      let top = scroll.offsetTop; //当前页面距离顶部的高度 40
      let distance = 0;
      let isMove = false;
      scroll.addEventListener('touchstart', (e) => {
        // 滚动条在最顶端时，并且当前盒子在顶端的时候才能下拉刷新
        if (scroll.scrollTop != 0 || scroll.offsetTop != top) return;
        let start = e.touches[0].pageY;  //手指点击的起始高度
        let move = (e) => {
          isMove = true;
          let current = e.touches[0].pageY;  //手指点击的当前高度
          distance = current - start;  //求的拉动距离，负的就不要了
          if (distance > 0) {  //如果大于50 认为就是50像素（控制下拉的长度不能过大）
            if (distance <= 50) {
              scroll.style.top = distance + top + 'px';
            }
            else {
              distance = 50;
              scroll.style.top = top + 50 + 'px';
            }
          } else {  // 如果不在考虑范围内，即向上拉动时移除move、end事件
            scroll.removeEventListener('touchmove', move);
            scroll.removeEventListener('touchend', end);
          }
        };
        let end = (e) => {
          if (!isMove) return;  // 如果没有移动过，不走end
          isMove = false;
          // 下拉松开后页面应回到初始位置
          clearInterval(this.timer1);
          this.timer1 = setInterval(() => {  //一共distance 每次-1
            if (distance <= 0) {
              clearInterval(this.timer1);
              distance = 0;
              scroll.style.top = top + 'px';
              scroll.removeEventListener('touchmove', move);
              scroll.removeEventListener('touchend', end);
              //下拉刷新后清空原有数据放上新数据
              this.books = [];
              this.offset = 0;
              this.getData();
              return;
            }
            distance -= 1;
            scroll.style.top = top + distance + 'px';
          }, 1)
        };
        scroll.addEventListener('touchmove', move);
        scroll.addEventListener('touchend', end);
      }, false);
    },
    methods: {
      async increase(){
        await getCollectBook(this.book.id);
        this.$router.push('./collect')
      },
      async getData() {
        if (this.hasMore && !this.isLoading) {  //有更多的时候获取数据
          this.isLoading = true; //正在加载
          let {hasMore, books} = await pagination(this.offset);
          this.books = [...this.books, ...books];  // 获取的书放到books属性上
          this.hasMore = hasMore;
          this.isLoading = false; // 加载完毕
          this.offset = this.books.length;  //维护偏移量 就是总数的长度
        }
      },
      async remove(id) {
        await removeBook(id);  //删除某一项
        // 数据要删除前台数据
        this.books = this.books.filter(item => item.bookId !== id);
      },
      more() {
        this.getData();
      },
      loadMore() {
        //   触发scroll事件可能会触发n次，先进来开一个定时器，下次触发时将上一次定时器清除掉
        clearTimeout(this.timer);  // 防抖
        this.timer = setTimeout(() => {
          //   卷去的高度  当前可见区域   总高
          let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
          if (scrollTop + clientHeight + 20 > scrollHeight) {
            this.getData();  // 获取更多
          }
        }, 200);
      },
    },
    computed: {},
    components: {
      MHeader
    }
  }
</script>

<!--scoped表示当前样式只能给自己用而非全局样式-->
<style scoped>
  .content ul {
    padding: 10px;
  }

  .content ul li {
    list-style: none;
    display: flex;
    padding: 10px 0px;
    border-bottom: 1px solid #f1f1f1;
  }

  .content ul li img {
    width: 130px;
    height: 150px;
  }

  .content h4 {
    font-size: 20px;
    line-height: 45px;
  }

  .content p {
    color: #2a2a2a;
    line-height: 25px;
  }

  .content b {
    color: red;
    line-height: 35px;
  }

  .content button {
    font-weight: bold;
    font-size: 14px;
    color: #ffffff;
    display: block;
    width: 60px;
    height: 30px;
    background: steelblue;
    border: 1px solid cadetblue;
    border-radius: 8px;
    outline: none;
  }

  .more {
    margin: 10px;
    text-align: center;
    background: #cccccc;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    box-sizing: border-box;
  }

  .btn-list {
    display: flex;
    justify-content: space-around;
  }
</style>
