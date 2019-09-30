<template>
  <div class="page">
    <div class="title">
      <span>TestRouter</span>
    </div>
    <router-link to="/home">Home</router-link>
    <router-link to="/about">About</router-link>
    <div style="height: 200px; width: 200px; background: black; color:white">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped>
</style>
