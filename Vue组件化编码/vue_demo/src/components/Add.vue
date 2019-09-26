<template>
  <div class="col-md-4">
    <form class="">
      <div class="form-group">
        <label>用户名</label>
        <input type="text" class="form-control" placeholder="用户名">
      </div>
      <div class="form-group">
        <label>评论</label>
        <textarea rows="6" class="form-control" placeholder="评论内容"></textarea>
      </div>
      <div class="form-group">
        <div>
          <button class="btn btn-default pull-left" type="button">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
form {
  margin: 0 0 50px;
}
</style>
