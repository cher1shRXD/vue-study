<template>
  <div class="toast-container">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="toast"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { Toast } from './toast.type';

const toasts = inject<Toast[]>('toasts');

if (!toasts) {
  throw new Error('Toast context is not provided!');
}
</script>

<style scoped>
@import url('./toast.css');
</style>
