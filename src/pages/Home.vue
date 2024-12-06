<script setup lang="ts">
import { ref } from 'vue';
import MakeRoomModal from '../components/MakeRoomModal.vue';
import JoinRoomModal from '../components/JoinRoomModal.vue';
import { useRouter } from 'vue-router';

const makeRoomModal = ref(false);
const joinRoomModal = ref(false);

const router = useRouter();
</script>

<template>
  <div class="img">
    <div class="container">
      <div class="section-wrap">
        <div class="section" @click="router.push('/chats')">
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
        <div class="section" @click="joinRoomModal = true">
          <img src="../assets/enter.svg" alt="" class="section-icon">
          <p class="section-title">방 참가</p>
        </div>
      </div>
    </div>
  </div>
  <makeRoomModal v-model:showModal="makeRoomModal" />
  <JoinRoomModal v-model:showModal="joinRoomModal"/>
</template>

<style lang="css" scoped>
@import url("../style/home.css");
</style>
