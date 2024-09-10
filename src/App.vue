<template>
  <div>
    <navBar />
    <router-view />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import navBar from './components/navBar';

export default {
  name: 'App',
  components: {
    navBar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background-image: url("https://pic.imgdb.cn/item/66cdd7b0d9c307b7e93d0806.webp");
  background-size: cover;
}

</style>
