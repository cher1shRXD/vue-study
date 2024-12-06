<script setup lang="ts">
import Header from "../components/Header.vue";
</script>

<template>
  <div class="layout">
    <Header></Header>
    <div class="router-wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.layout {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100dvh;
}

.router-wrap {
  width: 100%;
  height: calc(100% - 7rem);
}
</style>
