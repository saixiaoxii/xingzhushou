// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/grade2%E4%B8%8B/fy/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/grade2%E4%B8%8B/fy/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/grade2%E4%B8%8B/fy/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
import { viteMockServe } from "file:///D:/grade2%E4%B8%8B/fy/node_modules/vite-plugin-mock/dist/index.mjs";
import copy from "file:///D:/grade2%E4%B8%8B/fy/node_modules/rollup-plugin-copy/dist/index.commonjs.js";
var __vite_injected_original_dirname = "D:\\grade2\u4E0B\\fy";
var __vite_injected_original_import_meta_url = "file:///D:/grade2%E4%B8%8B/fy/vite.config.js";
var vite_config_default = defineConfig((command) => {
  return {
    // root: command === 'build' ? 'src/' : 'src/contentPage',
    // 打包用
    root: "src/",
    // 预览用
    // root: 'src/contentPage',
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === "serve"
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/contentPage/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]"
      }),
      // 复制文件到指定目录
      copy({
        targets: [
          { src: "src/manifest.json", dest: "dist" },
          { src: "src/icons/**", dest: "dist/icons" }
        ]
      })
      // {
      //   name: 'copy-files', // 插件名称
      //   apply: 'build', // 应用于构建阶段
      //   enforce: 'post', // 在其他插件执行后执行
      //   writeBundle() { // 在构建完成后执行
      //     // 复制文件到 dist 目录
      //     fs.copySync('src/plugins/manifest.json', 'dist/manifest.json');
      //     fs.copySync('src/assets', 'dist/assets');
      //     fs.copySync('src/plugins/inject.js', 'dist/js/inject.js');
      //   }
      // }
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    build: {
      outDir: path.resolve(__vite_injected_original_dirname, "dist"),
      // 配置 content.js background.js
      rollupOptions: {
        input: {
          popup: path.resolve(__vite_injected_original_dirname, "src/popup/index.html"),
          contentPage: path.resolve(__vite_injected_original_dirname, "src/contentPage/index.html"),
          content: path.resolve(__vite_injected_original_dirname, "src/content/content.js"),
          background: path.resolve(__vite_injected_original_dirname, "src/background/service-worker.js")
        },
        output: {
          assetFileNames: "assets/[name]-[hash].[ext]",
          // 静态资源
          chunkFileNames: "js/[name]-[hash].js",
          // 代码分割中产生的 chunk
          entryFileNames: (chunkInfo) => {
            const baseName = path.basename(chunkInfo.facadeModuleId, path.extname(chunkInfo.facadeModuleId));
            const saveArr = ["content", "service-worker"];
            return `[name]/${saveArr.includes(baseName) ? baseName : chunkInfo.name}.js`;
          },
          name: "[name].js"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxncmFkZTJcdTRFMEJcXFxcZnlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXGdyYWRlMlx1NEUwQlxcXFxmeVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovZ3JhZGUyJUU0JUI4JThCL2Z5L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xuXG5pbXBvcnQgY29weSBmcm9tIFwicm9sbHVwLXBsdWdpbi1jb3B5XCJcbi8vIGltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7IC8vIFx1NUJGQ1x1NTE2NSBmcy1leHRyYSBcdTVFOTNcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKChjb21tYW5kKT0+e1xuICByZXR1cm4ge1xuICAgIC8vIHJvb3Q6IGNvbW1hbmQgPT09ICdidWlsZCcgPyAnc3JjLycgOiAnc3JjL2NvbnRlbnRQYWdlJyxcbiAgICAvLyBcdTYyNTNcdTUzMDVcdTc1MjhcbiAgICByb290OiAnc3JjLycsXG4gICAgLy8gXHU5ODg0XHU4OUM4XHU3NTI4XG4gICAgLy8gcm9vdDogJ3NyYy9jb250ZW50UGFnZScsXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICB2aXRlTW9ja1NlcnZlKHtcbiAgICAgICAgbG9jYWxFbmFibGVkOiBjb21tYW5kID09PSAnc2VydmUnLFxuICAgICAgfSksXG4gICAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG4gICAgICAgIC8vIFNwZWNpZnkgdGhlIGljb24gZm9sZGVyIHRvIGJlIGNhY2hlZFxuICAgICAgICBpY29uRGlyczogW3BhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCAnc3JjL2NvbnRlbnRQYWdlL2Fzc2V0cy9pY29ucycpXSxcbiAgICAgICAgLy8gU3BlY2lmeSBzeW1ib2xJZCBmb3JtYXRcbiAgICAgICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG4gICAgICB9KSxcbiAgICAgIC8vIFx1NTkwRFx1NTIzNlx1NjU4N1x1NEVGNlx1NTIzMFx1NjMwN1x1NUI5QVx1NzZFRVx1NUY1NVxuICAgICAgY29weSh7XG4gICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICB7IHNyYzogJ3NyYy9tYW5pZmVzdC5qc29uJywgZGVzdDogJ2Rpc3QnIH0sXG4gICAgICAgICAgeyBzcmM6ICdzcmMvaWNvbnMvKionLCBkZXN0OiAnZGlzdC9pY29ucycgfVxuICAgICAgICBdLFxuICAgICAgfSksXG4gICAgICAvLyB7XG4gICAgICAvLyAgIG5hbWU6ICdjb3B5LWZpbGVzJywgLy8gXHU2M0QyXHU0RUY2XHU1NDBEXHU3OUYwXG4gICAgICAvLyAgIGFwcGx5OiAnYnVpbGQnLCAvLyBcdTVFOTRcdTc1MjhcdTRFOEVcdTY3ODRcdTVFRkFcdTk2MzZcdTZCQjVcbiAgICAgIC8vICAgZW5mb3JjZTogJ3Bvc3QnLCAvLyBcdTU3MjhcdTUxNzZcdTRFRDZcdTYzRDJcdTRFRjZcdTYyNjdcdTg4NENcdTU0MEVcdTYyNjdcdTg4NENcbiAgICAgIC8vICAgd3JpdGVCdW5kbGUoKSB7IC8vIFx1NTcyOFx1Njc4NFx1NUVGQVx1NUI4Q1x1NjIxMFx1NTQwRVx1NjI2N1x1ODg0Q1xuICAgICAgLy8gICAgIC8vIFx1NTkwRFx1NTIzNlx1NjU4N1x1NEVGNlx1NTIzMCBkaXN0IFx1NzZFRVx1NUY1NVxuICAgICAgLy8gICAgIGZzLmNvcHlTeW5jKCdzcmMvcGx1Z2lucy9tYW5pZmVzdC5qc29uJywgJ2Rpc3QvbWFuaWZlc3QuanNvbicpO1xuICAgICAgLy8gICAgIGZzLmNvcHlTeW5jKCdzcmMvYXNzZXRzJywgJ2Rpc3QvYXNzZXRzJyk7XG4gICAgICAvLyAgICAgZnMuY29weVN5bmMoJ3NyYy9wbHVnaW5zL2luamVjdC5qcycsICdkaXN0L2pzL2luamVjdC5qcycpO1xuICAgICAgLy8gICB9XG4gICAgICAvLyB9XG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgfVxuICAgIH0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIG91dERpcjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ2Rpc3QnKSxcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RSBjb250ZW50LmpzIGJhY2tncm91bmQuanNcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgaW5wdXQ6IHtcbiAgICAgICAgICBwb3B1cDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9wb3B1cC9pbmRleC5odG1sJyksXG4gICAgICAgICAgY29udGVudFBhZ2U6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29udGVudFBhZ2UvaW5kZXguaHRtbCcpLFxuICAgICAgICAgIGNvbnRlbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMvY29udGVudC9jb250ZW50LmpzJyksXG4gICAgICAgICAgYmFja2dyb3VuZDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYy9iYWNrZ3JvdW5kL3NlcnZpY2Utd29ya2VyLmpzJyksXG4gICAgICAgIH0sXG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGFzc2V0RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uW2V4dF0nLCAvLyBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2pzL1tuYW1lXS1baGFzaF0uanMnLCAvLyBcdTRFRTNcdTc4MDFcdTUyMDZcdTUyNzJcdTRFMkRcdTRFQTdcdTc1MUZcdTc2ODQgY2h1bmtcbiAgICAgICAgICBlbnRyeUZpbGVOYW1lczogKGNodW5rSW5mbykgPT4geyAvLyBcdTUxNjVcdTUzRTNcdTY1ODdcdTRFRjZcbiAgICAgICAgICAgIGNvbnN0IGJhc2VOYW1lID0gcGF0aC5iYXNlbmFtZShjaHVua0luZm8uZmFjYWRlTW9kdWxlSWQsIHBhdGguZXh0bmFtZShjaHVua0luZm8uZmFjYWRlTW9kdWxlSWQpKVxuICAgICAgICAgICAgY29uc3Qgc2F2ZUFyciA9IFsnY29udGVudCcsICdzZXJ2aWNlLXdvcmtlciddXG4gICAgICAgICAgICByZXR1cm4gYFtuYW1lXS8ke3NhdmVBcnIuaW5jbHVkZXMoYmFzZU5hbWUpID8gYmFzZU5hbWUgOiBjaHVua0luZm8ubmFtZX0uanNgO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbmFtZTogJ1tuYW1lXS5qcydcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXVPLFNBQVMsZUFBZSxXQUFXO0FBRTFRLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixTQUFTLDRCQUE0QjtBQUNyQyxPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFFOUIsT0FBTyxVQUFVO0FBUmpCLElBQU0sbUNBQW1DO0FBQThGLElBQU0sMkNBQTJDO0FBYXhMLElBQU8sc0JBQVEsYUFBYSxDQUFDLFlBQVU7QUFDckMsU0FBTztBQUFBO0FBQUE7QUFBQSxJQUdMLE1BQU07QUFBQTtBQUFBO0FBQUEsSUFHTixTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixjQUFjO0FBQUEsUUFDWixjQUFjLFlBQVk7QUFBQSxNQUM1QixDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQTtBQUFBLFFBRW5CLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsOEJBQThCLENBQUM7QUFBQTtBQUFBLFFBRXRFLFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQTtBQUFBLE1BRUQsS0FBSztBQUFBLFFBQ0gsU0FBUztBQUFBLFVBQ1AsRUFBRSxLQUFLLHFCQUFxQixNQUFNLE9BQU87QUFBQSxVQUN6QyxFQUFFLEtBQUssZ0JBQWdCLE1BQU0sYUFBYTtBQUFBLFFBQzVDO0FBQUEsTUFDRixDQUFDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLElBWUg7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsTUFDdEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRLEtBQUssUUFBUSxrQ0FBVyxNQUFNO0FBQUE7QUFBQSxNQUV0QyxlQUFlO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTCxPQUFPLEtBQUssUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxVQUNyRCxhQUFhLEtBQUssUUFBUSxrQ0FBVyw0QkFBNEI7QUFBQSxVQUNqRSxTQUFTLEtBQUssUUFBUSxrQ0FBVyx3QkFBd0I7QUFBQSxVQUN6RCxZQUFZLEtBQUssUUFBUSxrQ0FBVyxrQ0FBa0M7QUFBQSxRQUN4RTtBQUFBLFFBQ0EsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUE7QUFBQSxVQUNoQixnQkFBZ0I7QUFBQTtBQUFBLFVBQ2hCLGdCQUFnQixDQUFDLGNBQWM7QUFDN0Isa0JBQU0sV0FBVyxLQUFLLFNBQVMsVUFBVSxnQkFBZ0IsS0FBSyxRQUFRLFVBQVUsY0FBYyxDQUFDO0FBQy9GLGtCQUFNLFVBQVUsQ0FBQyxXQUFXLGdCQUFnQjtBQUM1QyxtQkFBTyxVQUFVLFFBQVEsU0FBUyxRQUFRLElBQUksV0FBVyxVQUFVLElBQUk7QUFBQSxVQUN6RTtBQUFBLFVBQ0EsTUFBTTtBQUFBLFFBQ1I7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
