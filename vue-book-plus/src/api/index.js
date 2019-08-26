/*引api默认会引用index*/

import axios from 'axios';

// 增加默认的骑牛路径
 axios.defaults.baseURL = 'http://localhost:3030'; //增加默认的请求路径

//拦截器
axios.interceptors.response.use((res) => {
  return res.data;  // 在这里统一拦截结果，把结果处理成res.data
});

// 获取轮播图数据，返回的是一个promise对象
export let getSliders = () => {
  return axios.get('/sliders')
};

//获取热门图书接口
export let getHotBook = () => {
  return axios.get('/hot')
};

//获取图书
export let getBooks = () => {
  return axios.get('/book')
};

//删除某一本图书
export let removeBook = (id) => {
  return axios.delete(`/book?id=${id}`)
};

// 获取某一本书
export let findOneBook = (id) => {
  return axios.get(`/book?id=${id}`)
};

// 修改图书
// <!--
//   1. 告诉服务器需要修改那一项 如 /book?id=3 需要修改id=3 的图书的数据
//   2. 修改成什么样子 data {bookName}
// -->
/*
*   @param id  编号
*   @param data 数据 请求体发送
*   @returns {Promise<AxiosResponse<T>>} 返回一个promise对象
* */
export let updateBook = (id, data) => {
  return axios.put(`/book?id=${id}`, data);
};


// 添加图书
export let addBook = (data) => {
  return axios.post('/book', data)
};

//
export let getAll = ()=>{
  return axios.all([getSliders(), getHotBook()])
};

//分页器 根据偏移量offset返回对应的数据 5  => 5-10
export let pagination  = (offset)=>{
  return axios.get(`/page?offset=${offset}`)
};

//获取购物车图书
export let getCollectBook = (id) => {
  return axios.get(`/list?id=${id}`)
};
