<template>
  <div>
    <h3>评论回复：</h3>
    <ul class="list-group">
      <item v-for="(item, index) in comments" :key="index" :comment="item"></item>
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
  }
}
</script>

<style scoped>
.reply {
  margin-top: 0px;
}
</style>
