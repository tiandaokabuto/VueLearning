<template>
  <ul style="list-style-type: none">
    <li>{{content.id}}</li>
    <li>{{content.title}}</li>
    <li>{{content.content}}</li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      content: Object
    }
  },
  components: {

  }
}
</script>

<style scoped>
</style>
