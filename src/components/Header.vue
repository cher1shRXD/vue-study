<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import router from '../router';

const store = useStore();
const fetchUser = () => store.dispatch('user/fetchUser');
const user = computed(() => store.getters['user/getUser']);

const logout = () => {
  store.commit("user/unsetUser");
  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("REFRESH_TOKEN");
}

const navigate = (e: string) => {
  router.push(`/${e}`);
}

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div class="container">
    <p class="logo-text">CHATTERING</p>
    <div class="profile-wrap" v-if="user" @click="logout">
      {{ user.username.slice(0, 2).toUpperCase() }}
    </div>
    <div class="auth-wrap" v-else>
      <button class="login-button" @click="navigate('login')">로그인</button>
      <button class="signup-button" @click="navigate('signup')">회원가입</button>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url('../style/header.css');
</style>
