<template>
  <ul>
    <li v-for="(item, index) in news" :key="index">{{item}}</li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      news: ['news1', 'news2', 'news3']
    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>
