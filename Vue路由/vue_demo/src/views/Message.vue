<template>
  <div>
    <ul>
      <li v-for="(item) in messages" :key="item.id">
        <router-link :to='`/home/message/content/${item.id}`' tag="a">{{item.title}}</router-link>
      </li>
    </ul>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      messages: []
    }
  },
  mounted() {
    // 模拟ajax请求从后台获取数据
    setTimeout(() => {
      const msg = [
        {
          id: 1,
          title: 'message1',
          content: 'message1 content'
        },
        {
          id: 2,
          title: 'message2',
          content: 'message2 content'
        },
        {
          id: 3,
          title: 'message3',
          content: 'message3 content'
        }
      ]
      this.messages = msg
    }, 1000)
  }
}
</script>

<style scoped>
</style>
