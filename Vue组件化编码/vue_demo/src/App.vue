<template>
  <div>
    <h2>评论列表</h2>
    <div class="container">
      <Add @addComment="addComment"></Add>
      <List :comments="comments" @deleteComment="deleteComment"
      @selectAllComment="selectAllComment" @deleteSeleted="deleteSeleted"></List>
    </div>
  </div>
</template>

<script>
import Add from './components/Add'
import Item from './components/Item'
import List from './components/List'
import storageUtil from './util/StorageUtil'
export default {
  data () {
    return {
      comments: storageUtil.readComments()
      // [ // 数据在哪个组件，更新数据的方法就应该在哪个组件
      //   {
      //     name: 'Mike',
      //     content: '有一说一',
      //     selected: false
      //   },
      //   {
      //     name: 'John',
      //     content: '说实话',
      //     selected: false
      //   },
      //   {
      //     name: 'Bob',
      //     content: '平心而论',
      //     selected: false
      //   },
      //   {
      //     name: 'Tom',
      //     content: '就事论事',
      //     selected: false
      //   },
      //   {
      //     name: 'Jim',
      //     content: '确实',
      //     selected: false
      //   }
      // ]
    }
  },
  watch: {
    comments: {
      deep: true, // 深度监视
      // handler: function(value) {
      //   storageUtil.saveComments(value)
      // }
      handler: storageUtil.saveComments // 把saveComments设置为回调函数，由于没有加括号所以不会执行，只是获取函数
    }
  },
  components: {
    Add,
    Item,
    List
  },
  methods: {
    addComment(comment) {
      this.comments.unshift(comment)
    },
    deleteComment(index) {
      this.comments.splice(index, 1)
    },
    selectAllComment(check) {
      this.comments.forEach(comment => {
        comment.selected = check
      })
    },
    deleteSeleted() {
      this.comments = this.comments.filter(comment => {
        return !comment.selected
      })
    }
  }
}
</script>

<style scoped>
</style>
