<template>
  <div>
    <h2>评论列表</h2>
    <div class="container">
      <Add></Add>
      <List></List>
    </div>
  </div>
</template>

<script>
import Add from './components/Add'
import Item from './components/Item'
import List from './components/List'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState(['comments'])
  },

  mounted () {
    // 发送命令给action:异步获取数据
    this.$store.dispatch('readComments')
  },
  components: {
    Add,
    Item,
    List
  },
  methods: {
    // selectAllComment(check) {
    //   this.comments.forEach(comment => {
    //     comment.selected = check
    //   })
    // }
  }
}
</script>

<style scoped>
</style>
