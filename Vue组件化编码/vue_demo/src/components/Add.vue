<template>
  <div class="col-md-4">
    <form class="">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" class="form-control" placeholder="用户名" v-model="name">
      </div>
      <div class="form-group">
        <label>评论</label>
        <textarea rows="6" class="form-control" placeholder="评论内容" v-model="content"></textarea>
      </div>
      <div class="form-group">
        <div>
          <button class="btn btn-default pull-left" type="button" @click="add">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      content: ''
    }
  },
  components: {

  },
  methods: {
    add() {
      const name = this.name.trim()
      const content = this.content.trim()
      if (!name || !content) {
        alert('姓名或评论内容输入不合法，请重新输入')
        return
      }
      const comment = {
        name,
        content
      }
      this.$emit('addComment', comment)
      this.name = ''
      this.content = ''
    }
  }
}
</script>

<style scoped>
form {
  margin: 0 0 50px;
}
</style>
