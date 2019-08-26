## 项目用到less
```
npm install less less-loader axios vuex bootstrap
```

- mock 模拟数据 （后台服务）：模拟一些数据看看效果
- api 代表的是所有的接口
- base 代表基础组件
- components 页面组件

##热门图书的功能
- 先写服务端，确保数据能正常返回
- 增加api方法，实现调取数据的功能
- 在哪个组件中应用这个api，如果是一个基础组件需要用这些数据，在使用这个组件的父级中调用这个方法，将数据传递给基础组件
- 写一个基础组件 
  - 1.创建一个.vue文件
  - 2.在需要使用这个组件的父级中应用这个组件 import
  - 3.在组件中注册
  - 4.以标签的形式引用 
  
  
## 路由元信息


## 下拉加载 /page
- 默认每次给5条，前端告诉后台现在要从第几条开始给我
- /page?offset=5  从第五条开始给我五条
- 还要告诉前端是否有更多的数据 hasMore:false


## coding split 代码分割
  ```
   {
      path: '/collect',
      component: () => import('../components/Collect.vue')  
      //动态加载的方法，你不执行这个函数的时候是不走的，执行这个函数的时候才会调用这个组件，把这个组件的返回结果赋给这个component，相当于异步
    }
  ```

