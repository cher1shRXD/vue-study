import { createStore } from "vuex";
import user from "./modules/user";
import chatroomList from "./modules/chatroomList";
import chatroom from "./modules/chatroom";

const store = createStore({
  modules: {
    user,
    chatroomList,
    chatroom
  }
});

export default store;
