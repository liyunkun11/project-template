import { createApp } from "vue";
import "normalize.css";
import "virtual:svg-icons-register";
import "./permission";
import "./styles/index.less";

import App from "./App.vue";
import directive from "./directives";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(directive);

app.mount("#app");
