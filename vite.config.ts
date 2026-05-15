import path from "node:path";
import process from "node:process";
import vue from "@vitejs/plugin-vue";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig, loadEnv } from "vite";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vite.dev/config/
export default defineConfig({
  base: "/project-template/",
  server: {
    port: 7788,
    open: true,
    host: true,
    proxy: {
      "/api/project-template": {
        target: loadEnv("development", process.cwd()).VITE_APP_API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => path.replace(/^\/api\/project-template/, ""),
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver({ importStyle: false })],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "./src/icons")],
      symbolId: "icon-[dir]/[name]",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: "true; @import \"@/styles/var.less\";",
        },
        javascriptEnabled: true,
      },
    },
  },
});
