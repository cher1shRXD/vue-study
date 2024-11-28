<script setup lang="ts">
</script>

<template>
  <div class="layout">
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