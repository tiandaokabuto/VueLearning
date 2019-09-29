<template>
  <div class="page">
    <img src="./assets/logo.png" alt="logo">
    <!-- 3.使用组件标签 -->
    <Hello></Hello>
  </div>
</template>

<script>
// 1.引入组件
import Hello from './components/HelloWorld'
export default {
  data () {
    return {

    }
  },
  // 2.映射组件标签
  components: {
    Hello
  }
}
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
</style>
