import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersist);

export const STOREAGE_PREFIX = "PROJECT_TEMPLATE";

export default pinia;
