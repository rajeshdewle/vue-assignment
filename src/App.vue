<template>
  <Header />
  <div class="container">
    <HomePage />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import HomePage from './views/HomePage.vue';

export default {
  name: 'App',
  components: {
    Header,
    HomePage,
  }
}
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
