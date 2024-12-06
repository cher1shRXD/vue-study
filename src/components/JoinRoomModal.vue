<script setup lang="ts">
import { ref, inject } from "vue";
import instance from "../libs/customAxios";

defineProps({
  showModal: Boolean,
});

const emit = defineEmits(["update:showModal"]);
const joinCode = ref("");
const loading = ref(false);
const showToast = inject<(message: string) => void>("showToast")!;

const submit = async () => {
  if (loading.value) {
    return;
  }
  if (joinCode.value.trim().length === 0) {
    showToast("참가 코드를 입력해주세요.");
    return;
  }
  loading.value = true;
  try {
    await instance.post("/room/join", { joinCode:joinCode.value });
    emit("update:showModal", false);
      showToast("참가되었습니다.");
  } catch(err){
    console.log(err);
    showToast("참가에 실패 했습니다. 나중에 다시 시도해주세요.");
  } finally {
    loading.value = false;
  }
};

const closeModal = () => {
  joinCode.value = '';
  emit("update:showModal", false);
};
</script>

<template>
  <div class="shadow" v-if="showModal" @click="closeModal">
    <div class="modal-container" @click.stop="">
      <p class="modal-title">방 참가하기</p>
      <input
        type="text"
        class="modal-input"
        placeholder="참가 코드를 입력해주세요."
        v-model="joinCode"
      />
      <div class="modal-button-wrap">
        <button class="modal-cancel-button" @click="closeModal" :disabled="loading">취소</button>
        <button class="modal-submit-button" @click="submit" :disabled="loading">참가</button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../style/joinRoomModal.css");
</style>
