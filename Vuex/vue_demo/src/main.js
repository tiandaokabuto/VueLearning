// 入口JS：创建实例
import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 注册成全局
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>',
  store // 所有组件对象都多一个属性$store
})
