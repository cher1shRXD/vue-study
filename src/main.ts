import { createApp } from "vue";
import "./style.css";
import router from "./router";
import { useToast } from "./utils/toast/useToast";
import store from "./store";
import App from "./App.vue";

const app = createApp(App);

const toast = useToast();
app.provide("toasts", toast.toasts);
app.provide("showToast", toast.showToast);

app.use(store);
app.use(router);
app.mount("#app");
