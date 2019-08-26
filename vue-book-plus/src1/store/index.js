/* vuex 用于平级组件交互、跨组件交互
   平级传统方法：找共同的父级解决
   跨组件传统方法：eventBus混乱（发布订阅）
*/
/* vuex主要借鉴了 flux redux，vuex只能在vue中使用（单独为vue开发的）*/
/* vuex为了大型项目，主要是（状态）管理，这里的状态指的就是数据，将数据统一管理*/
/* vuex为单项数据流*/
import Vue from 'vue';
import Vuex from 'vuex'; // vuex的用法和路由很像，路由是个插件
//logger 日志插件，记录日志
import logger from 'vuex/dist/logger';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  count: 0
}; //声明一个状态，不可更改，在组件里不要轻易的更改状态（单向数据流）
const getters = {
  val: state =>
    state.count % 2 ? '奇数' : '偶数'
};

//vuex的容器是唯一的，不可多new
export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [logger()],
  strict: true //严格模式，只能通过Mutation（管理员）更改状态，mutation不支持异步
});
