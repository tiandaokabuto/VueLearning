<template>
  <div>
    <h3>评论回复：</h3>
    <h5 v-show="comments.length === 0">暂无评论</h5>
    <ul class="list-group">
      <item v-for="(item, index) in comments" :key="index" :comment="item"
      :index="index" @deleteComment="deleteComment(index)"></item>
    </ul>
    <div class="footer">
      <input type="checkbox" v-model="check">
      <span>已选择{{selectNum}}/{{comments.length}}</span>
      <button @click="deleteSelected" v-show="comments.length">删除选中评论</button>
    </div>
  </div>
</template>

<script>
import Item from './Item'
export default {
  data () {
    return {
      // check: false
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
    },
    selectAllComment(check) {
      this.check = !this.check
      this.$emit('selectAllComment', this.check)
    },
    deleteSelected() {
      this.$emit('deleteSeleted')
    },
    setCheck() {
    }
  },
  computed: {
    selectNum() {
      return this.comments.reduce((sum, comment) => {
        return sum + (comment.selected ? 1 : 0)
      }, 0)
    },
    check: {
      get() {
        return this.selectNum === this.comments.length && this.comments.length > 0
      },
      set(value) {
        this.$emit('selectAllComment', value)
      }
    }
  }
}
</script>

<style scoped>
.reply {
  margin-top: 0px;
}
.footer {
  margin: 25px 0 10px 25px;
}
input {
  margin: 0 20px 0 0;
}
button {
  color: white;
  background: red;
  border: none;
  position: absolute;
  left: 200px;
}
</style>
