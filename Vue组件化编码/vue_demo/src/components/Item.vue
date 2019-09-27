<template>
  <li class="list-group-item" :style="{background: bgColor}"
  @mouseenter="handleEnter(true)" @mouseleave="handleEnter(false)">
    <div class="handle">
      <a href="javascript:;" @click="deleteComment(index)" v-show="showDelete">删除</a>
    </div>
    <p class="user">
      <input type="checkbox" v-model="comment.selected">
      <span>{{comment.name}}</span>
      <span>说：</span>
    </p>
    <p class="centence">{{comment.content}}</p>
  </li>
</template>

<script>
export default {
  data() {
    return {
      showDelete: false,
      bgColor: 'white'
    }
  },
  props: {
    comment: {},
    index: Number
  },
  methods: {
    deleteComment(index) {
      if (window.confirm('是否删除该评论')) {
        this.$emit('deleteComment', index)
      }
    },
    handleEnter(isEnter) {
      if (isEnter) {
        this.bgColor = '#ccc'
        this.showDelete = true
      } else {
        this.bgColor = 'white'
        this.showDelete = false
      }
    }
  }
}
</script>

<style scoped>
li {
  transition: 0.5s;
  overflow: hidden;
}

.list-group-item {
  position: relative;
}

.handle {
  width: 40px;
  background: #fff;
  position: absolute;
  left: 300px;
  top: 1px;
  text-align: center;
}

.handle a {
  display: block;
  background: red;
  color: white;
  border: 1px solid red;
  text-decoration: none;
}

.list-group-item .centence {
  padding: 0px 50px;
}

.user {
  font-size: 22px;
}
</style>
