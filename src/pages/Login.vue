<script setup lang="ts">
import axios from "axios";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const loading = ref(false);

const router = useRouter();
const showToast =
  inject<(message: string) => void>("showToast")!;

const submit = async () => {
  loading.value = true;
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        username: username.value,
        password: password.value,
      }
    );
    if (data) {
      localStorage.setItem("ACCESS_TOKEN", data.accessToken);
      localStorage.setItem("REFRESH_TOKEN", data.refreshToken);
      showToast("로그인 성공!");
      router.push("/");
    }
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div class="login-wrap">
      <p class="login-title">로그인</p>
      <div class="input-wrap">
        <p class="login-label">아이디</p>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          class="login-input"
          v-model="username"
        />
      </div>
      <div class="input-wrap">
        <p class="login-label">비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          class="login-input"
          v-model="password"
        />
      </div>
      <div class="login-nav">
        <RouterLink to="/signup" class="nav">회원가입</RouterLink>
        <RouterLink to="/terms" class="nav">개인정보 처리 방침</RouterLink>
      </div>
      <button
        class="login-button"
        :disabled="
          loading ||
          username.trim().length === 0 ||
          password.trim().length === 0
        "
        @click="submit"
      >
        <span v-if="loading" class="spinner"></span>
        <span v-else>로그인</span>
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url(../style/login.css);
</style>
