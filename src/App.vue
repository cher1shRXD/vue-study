<script setup lang="ts">
import { provide } from "vue";
import ToastContainer from "./utils/toast/ToastContainer.vue";
import { useToast } from "./utils/toast/useToast";

const toast = useToast();
provide("toasts", toast.toasts);
provide("showToast", toast.showToast);
</script>

<template>
  <ToastContainer> </ToastContainer>
  <router-view />
</template>
