<template>
  <div class="page">
    <p>click {{$store.state.count}} times, count is {{evenOrOdd}}</p>
    <button @click="increment">++</button>
    <button @click="decrement">--</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // count: 0
    }
  },
  computed: {
    evenOrOdd() {
      return this.$store.getters.evenOrOdd
    }
  },
  methods: {
    increment() {
      // 通知vuex去更新
      this.$store.dispatch('increment') // 触发store中的action
      // this.count++
    },
    decrement() {
      this.$store.dispatch('decrement')
      // this.count--
    },
    incrementIfOdd() {
      this.$store.dispatch('incrementIfOdd')
      // if (this.count % 2 === 1) {
      //   this.count++
      // }
    },
    incrementAsync() {
      this.$store.dispatch('incrementAsync')
      // setTimeout(() => {
      //   this.count++
      // }, 1000)
    }
  }
}
</script>

<style scoped>
</style>
