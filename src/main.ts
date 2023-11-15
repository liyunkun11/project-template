import { createApp } from "vue";
import VueGridLayout from "vue-grid-layout";
import "normalize.css";
import "virtual:svg-icons-register";
import "./permission";
import "./styles/index.less";

import App from "./App.vue";
import directiveRegister from "./directives";
import VxeTable from "./plugins/vxe-table";
import router from "./router";
import store from "./stores";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(directiveRegister);
app.use(VxeTable);
app.use(VueGridLayout);

app.mount("#app");
