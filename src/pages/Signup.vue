<script setup lang="ts">
import axios from "axios";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const passwordCheck = ref("");
const nickname = ref("");
const email = ref("");
const loading = ref(false);

const router = useRouter();
const showToast =
  inject<(message: string) => void>("showToast")!;

const submit = async () => {
  if (loading.value) {
    return;
  }
  loading.value = true;
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      {
        username: username.value,
        password: password.value,
        email: email.value,
        nickname: nickname.value,
      }
    );
    if (data) {
      showToast("서비스 이용을 위해 로그인 해주세요.");
      router.push("/login");
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
    <div class="signup-wrap">
      <p class="signup-title">회원가입</p>
      <div class="input-wrap">
        <p class="signup-label">아이디</p>
        <input
          type="text"
          placeholder="아이디를 입력해주세요."
          class="signup-input"
          v-model="username"
        />
      </div>
      <div class="input-wrap">
        <p class="signup-label">이메일</p>
        <input
          type="text"
          placeholder="이메일을 입력해주세요."
          class="signup-input"
          v-model="email"
        />
      </div>
      <div class="input-wrap">
        <p class="signup-label">닉네임</p>
        <input
          type="text"
          placeholder="닉네임을 입력해주세요."
          class="signup-input"
          v-model="nickname"
        />
      </div>
      <div class="input-wrap">
        <p class="signup-label">비밀번호</p>
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요."
          class="signup-input"
          v-model="password"
        />
      </div>
      <div class="input-wrap">
        <p class="signup-label">비밀번호 확인</p>
        <input
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요."
          class="signup-input"
          v-model="passwordCheck"
        />
      </div>
      <div class="signup-nav">
        <RouterLink to="/login" class="nav">이미 계정이 있나요?</RouterLink>
        <RouterLink to="/terms" class="nav">개인정보 처리 방침</RouterLink>
      </div>
      <button
        class="signup-button"
        :disabled="
          loading ||
          username.trim().length === 0 ||
          password.trim().length === 0 ||
          passwordCheck.trim().length === 0 ||
          nickname.trim().length === 0 ||
          email.trim().length === 0
        "
        @click="submit"
      >
        <span v-if="loading" class="spinner"></span>
        <span v-else>회원가입</span>
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url(../style/signup.css);
</style>
