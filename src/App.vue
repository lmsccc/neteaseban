<template>
  <div id="app">
    <router-view></router-view>
    <welcome></welcome>
    <music-player></music-player>
  </div>
</template>

<script>
import welcome from './views/welcome'
import musicPlayer from './views/music-player'
export default {
  name: 'app',
  components: { welcome,musicPlayer }
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
