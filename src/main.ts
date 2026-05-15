import { createApp } from "vue";
import App from "./App.vue";
import directiveRegister from "./directives";
import router from "./routers";
import pinia from "./stores";

import "./permission";
import "normalize.css";
import "virtual:svg-icons-register";

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(directiveRegister);

app.mount("#app");
