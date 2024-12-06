<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import ChatDetail from "../components/ChatDetail.vue";

const store = useStore();
const fetchChatRoomList = () => store.dispatch("chatroomList/fetchChatRoomList");
const chatRoomList = computed(() => store.getters["chatroomList/getChatRoomList"]);

const router = useRouter();

const currentRoom = ref(undefined);

onMounted(() => {
  fetchChatRoomList();
});
</script>

<template>
  <div class="container">
    <div class="chat-list-wrap">
      <div class="chat-list-header">
        <img
          src="../assets/back.svg"
          alt=""
          class="chat-list-back"
          @click="router.push('/')"
        />
        <p class="chat-list-title">내 채팅</p>
      </div>
      <div class="chat-list-area">
        <div
          v-for="item in chatRoomList"
          :key="item.joinCode"
          class="chat-item"
          :style="{
            backgroundColor: currentRoom === item.joinCode ? 'rgba(96, 193, 188, 0.2)' : 'transparent',
          }"
          @click="currentRoom = item.joinCode"
        >
          <p class="chat-name">{{ item.name }}</p>
          <p class="chat-members">{{ item.members.length }}명 참가 중</p>
        </div>
      </div>
    </div>
    <div class="chat-area">
      <ChatDetail :room-id="currentRoom"/>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../style/myChats.css");
</style>
