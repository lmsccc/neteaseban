<template>
  <div id="app">
    <router-view></router-view>
    <welcome></welcome>
  </div>
</template>

<script>
import welcome from './views/welcome'
export default {
  name: 'app',
  components: { welcome }
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
html,body{
    width: 100%;
    height: 100%;
}
</style>
