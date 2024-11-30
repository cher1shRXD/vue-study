<script setup lang="ts">
import { ref, inject } from "vue";
import instance from "../libs/customAxios";

defineProps({
  showModal: Boolean,
});

const emit = defineEmits(["update:showModal"]);
const name = ref("");
const joinCode = ref("");
const loading = ref(false);
const showToast = inject<(message: string) => void>("showToast")!;

const submit = async () => {
  if (loading.value) {
    return;
  }
  if (name.value.trim().length === 0) {
    showToast("방 제목을 입력해주세요.");
    return;
  }
  loading.value = true;
  try {
    const { data } = await instance.post("/room/make", { name:name.value });
    if (data) {
      joinCode.value = data.joinCode;
    }
  } catch(err){
    console.log(err);
    showToast("방 생성에 실패 했습니다. 나중에 다시 시도해주세요.");
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  emit("update:showModal", false);
};
</script>

<template>
  <div class="shadow" v-if="showModal" @click="closeModal">
    <div class="modal-container" @click.stop="" v-if="joinCode.length > 0">
      <p class="modal-title">방 생성 완료</p>
      <p class="modal-subtitle">참가코드</p>
      <p class="join-code">
        {{ joinCode }}
      </p>
      <div class="modal-button-wrap">
        <button class="modal-submit-button" @click="closeModal">닫기</button>
      </div>
    </div>
    <div class="modal-container" @click.stop="" v-else>
      <p class="modal-title">방 만들기</p>
      <input
        type="text"
        class="modal-input"
        placeholder="방 제목을 입력해주세요."
        v-model="name"
      />
      <div class="modal-button-wrap">
        <button class="modal-cancel-button" @click="closeModal">취소</button>
        <button class="modal-submit-button" @click="submit">생성</button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../style/makeRoomModal.css");
</style>
