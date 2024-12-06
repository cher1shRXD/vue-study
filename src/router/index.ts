import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Root from "../layouts/Root.vue";
import Login from "../pages/Login.vue";
import Signup from "../pages/Signup.vue";
import MyChats from "../pages/MyChats.vue";


const routes = [
  {
    path: "/",
    component: Root,
    children: [
      { path: "/", component: Home },
      { path: "/chats", component: MyChats },

    ],
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/signup",
    component: Signup,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
