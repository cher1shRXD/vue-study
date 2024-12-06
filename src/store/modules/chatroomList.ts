import { Commit } from "vuex/types/index.js";
import instance from "../../libs/customAxios";
import router from "../../router";
import { ChatRoomListState } from "../../types/store/chatRoomListState";
import { ChatRoom } from "../../types/data/chatRoom";

export default {
  namespaced: true,
  state(): ChatRoomListState {
    return {
      chatRooms: [],
    };
  },
  mutations: {
    setChatRoomList(state: ChatRoomListState, chatRooms: []) {
      state.chatRooms = chatRooms;
    },
    unsetChatRoomList(state: ChatRoomListState) {
      state.chatRooms = [];
    },
  },
  actions: {
    async fetchChatRoomList({ commit }: { commit: Commit }) {
      try {
        const { data } = await instance.get("/room/my");
        if (data) {
          commit("setChatRoomList", data.chatrooms);
        }
      } catch {
        router.push("/");
      }
    },
  },
  getters: {
    getChatRoomList(state: ChatRoomListState): ChatRoom[] {
      return state.chatRooms;
    },
  },
};
