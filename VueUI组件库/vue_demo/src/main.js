// 入口JS：创建实例
import Vue from 'vue'
import App from './App.vue'
import { Button, Cell } from 'mint-ui'

// 注册成全局
Vue.component(Button.name, Button)
Vue.component(Cell.name, Cell)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
