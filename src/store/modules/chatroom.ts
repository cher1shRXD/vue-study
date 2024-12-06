import { Commit } from "vuex/types/index.js";
import instance from "../../libs/customAxios";
import router from "../../router";
import { ChatRoom } from "../../types/data/chatRoom";
import { ChatRoomState } from "../../types/store/chatRoomState";

export default {
  namespaced: true,
  state(): ChatRoomState {
    return {
      chatRoom: null,
    };
  },
  mutations: {
    setChatRoom(state: ChatRoomState, chatRoom: ChatRoom) {
      state.chatRoom = chatRoom;
    },
    unsetChatRoom(state: ChatRoomState) {
      state.chatRoom = null;
    },
  },
  actions: {
    async fetchChatRoom({ commit }: { commit: Commit }, roomId: string) {
      try {
        const { data } = await instance.get(`/room/my/${roomId}`);
        if (data) {
          commit("setChatRoom", data);
        }
      } catch {
        router.push("/");
      }
    },
  },
  getters: {
    getChatRoom(state: ChatRoomState): ChatRoom | null {
      return state.chatRoom;
    },
  },
};
