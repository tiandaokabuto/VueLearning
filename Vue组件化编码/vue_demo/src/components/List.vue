<template>
  <div>
    <h3>评论回复：</h3>
    <h5 v-show="comments.length === 0">暂无评论</h5>
    <ul class="list-group">
      <item v-for="(item, index) in comments" :key="index" :comment="item" :index="index" @deleteComment="deleteComment(index)"></item>
    </ul>
  </div>
</template>

<script>
import Item from './Item'
export default {
  data () {
    return {

    }
  },
  components: {
    Item
  },
  props: {
    comments: Array
  },
  methods: {
    deleteComment(index) {
      this.$emit('deleteComment', index)
    }
  }
}
</script>

<style scoped>
.reply {
  margin-top: 0px;
}
</style>
