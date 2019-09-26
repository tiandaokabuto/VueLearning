<template>
  <div>
    <h2>评论列表</h2>
    <div class="container">
      <Add></Add>
      <List :comments="comments"></List>
    </div>
  </div>
</template>

<script>
import Add from './components/Add'
import Item from './components/Item'
import List from './components/List'
export default {
  data () {
    return {
      comments: [
        {
          name: 'Mike',
          content: '有一说一'
        },
        {
          name: 'John',
          content: '说实话'
        },
        {
          name: 'Bob',
          content: '平心而论'
        },
        {
          name: 'Tom',
          content: '就事论事'
        },
        {
          name: 'Jim',
          content: '确实'
        }
      ]
    }
  },
  components: {
    Add,
    Item,
    List
  }
}
</script>

<style scoped>
</style>
