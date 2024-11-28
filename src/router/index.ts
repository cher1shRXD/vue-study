import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import About from "../pages/Login.vue";
import Root from "../layouts/Root.vue";
import Login from "../pages/Login.vue";


const routes = [
  {
    path: "/",
    component: Root,
    children: [
      { path: "/", component: Home },
      { path: "/about", component: About },
    ],
  },
  {
    path: "/login",
    component: Login,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
