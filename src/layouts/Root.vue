<script setup lang="ts">
import Header from '../components/Header.vue';
</script>

<template>
  <div class="layout">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100svh;
  overflow-y: scroll;
}
</style>