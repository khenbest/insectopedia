<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    mounted() {
      this.$store.dispatch('getAllBugs')
    }
  }

</script>
<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>