import { UserState } from "../../types/store/userState";
import { User } from "../../types/data/user";
import { Commit } from "vuex/types/index.js";
import instance from "../../libs/customAxios";
import router from "../../router";

export default {
  namespaced: true,
  state(): UserState {
    return {
      user: null,
    };
  },
  mutations: {
    setUser(state: UserState, user: User | null) {
      state.user = user;
    },
    unsetUser(state: UserState) {
      state.user = null;
    }
  },
  actions: {
    async fetchUser({ commit }: { commit: Commit }) {
      try {
        const { data } = await instance.get("/auth/me");
        if (data) {
          commit("setUser", data);
        }
      } catch {
        router.push("/");
      }
    },
  },
  getters: {
    getUser(state: UserState): User | null {
      return state.user;
    },
  },
};
