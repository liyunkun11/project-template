import vue from "@vitejs/plugin-vue";
import { CodeInspectorPlugin } from "code-inspector-plugin";
import path from "path";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig, loadEnv } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 5958,
    open: true,
    host: true,
    proxy: {
      "/proxy": {
        target: loadEnv("development", process.cwd()).VITE_APP_API_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path: string) => path.replace(/^\/proxy/, ""),
      },
    },
  },
  plugins: [
    vue(),
    eslintPlugin({
      cache: false,
      include: ["src/**/*.js, src/**/*.ts, src/**/*.vue"],
      exclude: ["./node_modules/**"],
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, "./src/icons")],
      symbolId: "icon-[dir]-[name]",
    }),
    Components({
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
    CodeInspectorPlugin({
      bundler: "vite",
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
          hack: `true; @import "@/styles/variable.less";`,
        },
        javascriptEnabled: true,
      },
    },
  },
  build: {
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
  },
});
