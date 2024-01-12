<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <p class="nav-bar">
      <router-link class="nav-item" to="/">MelonJs</router-link>
      <router-link class="nav-item" to="/babylon">BabylonJs</router-link>
    </p>
    <div class="container">
      <router-view />
    </div>
  </div>

</template>

<style scoped lang="sass">
.nav-bar
  display: flex
  justify-content: start
  align-items: center
  height: 50px
  background-color: #ccc
  padding: 0 20px
  .nav-item
    margin-right: 20px
.container
  width: 1024px
  height: 768px
  margin: 0 auto
  border: 1px solid #ccc

</style>
