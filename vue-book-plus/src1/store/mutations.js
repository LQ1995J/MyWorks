import * as Types from './mutations-types';

const mutations = {
  [Types.INCREMENT](state, num) {  // state是自动放入的，默认指的就是当前的state
    state.count += num;
  },
  [Types.DECREMENT](state, num) {
    state.count -= num;
  }
};

export default mutations;

// 宏 快捷键
