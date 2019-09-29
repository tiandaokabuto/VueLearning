<template>
  <div class="page">
    <mt-button type="danger" size="small" @click="handleClick">Click</mt-button>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  data () {
    return {

    }
  },
  methods: {
    handleClick() {
      Toast('test')
    }
  }
}
</script>

<style scoped>
</style>
