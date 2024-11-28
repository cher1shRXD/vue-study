<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="login-wrap">
      <p class="login-title">로그인</p>
      <div class="input-wrap">
        <p class="login-label">아이디</p>
        <input type="text" placeholder="아이디를 입력해주세요." class="login-input">
      </div>
      <div class="input-wrap">
        <p class="login-label">비밀번호</p>
        <input type="password" placeholder="비밀번호를 입력해주세요." class="login-input">
      </div>
      <div class="login-nav">
        <RouterLink to="/signup" class="nav">회원가입</RouterLink>
        <RouterLink to="/terms" class="nav">개인정보 처리 방침</RouterLink>
      </div>
      <button class="login-button">로그인</button>
    </div>
  </div>
</template>

<style lang="css" scoped>
  .container {
    width: 100%;
    height: 100svh;
    background: linear-gradient(45deg, rgba(96,193,188,1) 0%, rgba(228,203,235,1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login-wrap {
    width: 64rem;
    height: 40rem;
    background-color: white;
    border-radius: 2rem;
    box-shadow: 0.1rem 0.1rem 1rem 0.1rem #999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 2rem;
  }

  .login-title {
    font-size: 3.2rem;
    font-weight: 300;
  }

  .input-wrap {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }

  .login-input {
    width: 100%;
    height: 4.8rem;
    border: 0.1rem solid #F1F1F1;
    border-radius: 0.8rem;
    padding: 1rem;
    font-size: 1.6rem;
    outline: none;
  }

  .login-label {
    font-size: 2rem;
    font-weight: 300;
  }

  .login-nav {
    width: 100%;
    height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 1rem;
  }

  .nav {
    font-size: 1.2rem;
    color: #ccc;
    text-decoration: none;
    &:hover{
      text-decoration: underline;
    }
  }

  .login-button {
    width: 100%;
    height: 4.8rem;
    border-radius: 0.8rem;
    border: none;
    outline: none;
    font-size: 2rem;
    cursor: pointer;
    color: white;
    background: linear-gradient(45deg, rgba(96,193,188,1) 0%, rgba(228,203,235,1) 100%);
  }
</style>