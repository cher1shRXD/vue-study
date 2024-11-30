<script setup lang="ts">
import { ref } from 'vue';
import MakeRoomModal from '../components/makeRoomModal.vue';

const makeRoomModal = ref(false);
</script>

<template>
  <div class="img">
    <div class="container">
      <div class="section-wrap">
        <div class="section">
          <img src="../assets/chat.svg" alt="" class="section-icon">
          <p class="section-title">내 채팅</p>
        </div>
        <div class="section" @click="makeRoomModal = true">
          <img src="../assets/makeRoom.svg" alt="" class="section-icon">
          <p class="section-title">방 만들기</p>
        </div>
        <div class="section">
          <img src="../assets/addFriend.svg" alt="" class="section-icon">
          <p class="section-title">친구추가</p>
        </div>
        <div class="section">
          <img src="../assets/enter.svg" alt="" class="section-icon">
          <p class="section-title">방 참가</p>
        </div>
      </div>
    </div>
  </div>
  <MakeRoomModal v-model:showModal="makeRoomModal" />
</template>

<style lang="css" scoped>
@import url("../style/home.css");
</style>
