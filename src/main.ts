import { createApp } from "vue";
import App from "./App.vue";
import "normalize.css";
import "virtual:svg-icons-register";
import router from "./router";
import store from "./store";
import directive from "./directives";

import "./permission";
import "./styles/index.less";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(directive);

app.mount("#app");
