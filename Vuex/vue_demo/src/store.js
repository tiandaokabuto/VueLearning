/**
 * vuex的核心管理对象模块
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态对象
const state = { // 初始化状态
  count: 0
}

// 包含多个更新state函数的对象
const mutations = {
  INCREMENT(state) {
    state.count++
  },
  DECREMENT(state) {
    state.count--
  }
}

// 包含多个对应时间回调函数的对象
const actions = {
  increment({commit}) { // 增加了一个action
    // 提交mutation
    commit('INCREMENT')
  },
  decrement({commit}) {
    commit('DECREMENT')
  },
  // 带条件的action
  incrementIfOdd({commit, state}) {
    if (state.count % 2 === 1) {
      commit('INCREMENT')
    }
  },
  // 异步action
  incrementAsync({commit}) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 1000)
  }
}

// 包含多个getter计算属性函数的对象
const getters = {
  evenOrOdd(state) {
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}

export default new Vuex.Store({
  state, // 状态
  mutations, // 包含多个更新state函数的对象
  actions, // 包含多个对应事件回调函数
  getters // 包含多个getter计算属性的对象
})
