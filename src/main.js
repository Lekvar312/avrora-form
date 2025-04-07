import { createApp } from "vue";
import App from "./App.vue";
import VueTheMask from "vue-the-mask";
import "./style.css";

const app = createApp(App);
app.use(VueTheMask);
app.mount("#app");
