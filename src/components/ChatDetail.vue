<script setup lang="ts">
import { computed, inject, ref, watch, onMounted, onBeforeUnmount, onUpdated } from "vue";
import { useStore } from "vuex";
import instance from "../libs/customAxios";
import { io } from "socket.io-client";
import { Chat } from "../types/data/chat";

const props = defineProps({
  roomId: {
    type: String,
    required: false,
  },
});

const store = useStore();
const fetchChatRoom = (roomId?: string) =>
  store.dispatch("chatroom/fetchChatRoom", roomId);
const chatRoom = computed(() => store.getters["chatroom/getChatRoom"]);
const user = computed(() => store.getters["user/getUser"]);

const showToast = inject<(message: string) => void>("showToast")!;

const sending = ref(false);
const message = ref("");
const messages = ref<Chat[]>([]);
const chatBox = ref<HTMLElement | null>(null);

const socket = io(import.meta.env.VITE_API_URL);

const send = async () => {
  if (sending.value || !props.roomId || message.value.trim().length === 0) {
    return;
  }
  try {
    sending.value = true;
    await instance.post(`/send/${props.roomId}`, {
      message: message.value,
    });
  } catch (err) {
    console.log(err);
    showToast("메시지 전송에 실패했습니다.");
  } finally {
    sending.value = false;
    message.value = "";
  }
};

const onEnter = (e: KeyboardEvent) => {
  if (e.key === "Enter" && !e.isComposing) {
    send();
  }
};

watch(
  () => props.roomId,
  (newRoomId, oldRoomId) => {
    if (newRoomId && newRoomId !== oldRoomId) {
      fetchChatRoom(newRoomId);

      socket.off("newMessage");

      socket.emit("joinRoom", newRoomId);

      socket.on("newMessage", (data) => {
        if (data) {
          messages.value.push(data);
        }
      });
    }
  }
);

watch(
  () => chatRoom.value,
  (newChatRoom) => {
    if (newChatRoom && chatBox.value) {
      messages.value = newChatRoom.chats;
      chatBox.value.scrollTop = chatBox.value.scrollHeight;
    }
  }
);

onUpdated(() => {
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  }
});

onMounted(() => {
  socket.on("connect", () => console.log("Socket connected"));
  socket.on("disconnect", () => console.log("Socket disconnected"));
});

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>

<template>
  <div class="container" v-if="props.roomId">
    <div class="chat-info-wrap">
      <p class="chat-title">{{ chatRoom ? chatRoom.name : "" }}</p>
      <p class="chat-members">
        {{ chatRoom ? chatRoom.members.length : 0 }}명 /
        {{ chatRoom ? chatRoom.joinCode : "" }}
      </p>
    </div>
    <div class="chat-box-wrap" ref="chatBox">
      <div
        class="chat-message"
        v-for="(chat, index) in messages"
        :key="index"
      >
        <div
          :class="[
            'bubble',
            chat.sender.username === user.username
              ? 'my-message'
              : 'other-message',
          ]"
        >
          <div class="nickname" v-if="chat.sender.username !== user.username">
            {{ chat.sender.nickname }}
          </div>
          <div class="message">{{ chat.message }}</div>
        </div>
      </div>
    </div>
    <div class="input-wrap">
      <input
        type="text"
        class="message-input"
        placeholder="메시지를 입력해주세요"
        v-model="message"
        @keydown="onEnter"
      />
      <button
        class="message-send"
        :disabled="sending || message.trim().length === 0"
        @click="send"
      >
        send
      </button>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../style/chatDetail.css");
</style>
