import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "child_main_page",
      shared: ["vue"],
      filename: "child_main_pageEntry.js",
      remotes: {
        prehost_app:
          // "http://localhost:5001/rts_vite_mf_prehost/assets/prehost_appEntry.js", // preview
          // "/api/rts_vite_mf_prehost/assets/prehost_appEntry.js", //proxy
          "https://framerage.github.io/rts_vite_mf_prehost/assets/prehost_appEntry.js",
      },
      exposes: {
        "./SharedMainPage": "./src/components/SharedMainPage.vue",
      },
    }),
  ],

  resolve: {
    //temp comment before architecture of project
    alias: {
      assets: "/src/assets",
      //   api: "/src/api",
      components: "/src/components",
      //   hooks: "/src/hooks",
      //   helpers: "/src/helpers",
      //   modules: "/src/modules",
      pages: "/src/pages",
      //   styles: "/src/styles",
      store: "/src/store",
      types: "/src/types",
      //   typings: "/src/typings",
      utils: "/src/utils",
      //   constants: "/src/constants",
    },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      },
    },
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
  base: "/rts_main_content",
  preview: {
    port: 5007,
    cors: false,
    headers: {
      "access-control-allow-origin": "http://localhost:5001",
    },
  },
  server: {
    port: 3000,
    open: "/rts_main_content",
    cors: true,
  },
});
