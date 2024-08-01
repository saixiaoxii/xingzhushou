import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'
import { viteMockServe } from 'vite-plugin-mock'

import copy from "rollup-plugin-copy"
// import fs from 'fs-extra'; // 导入 fs-extra 库


// https://vitejs.dev/config/
export default defineConfig((command)=>{
  return {
    // root: command === 'build' ? 'src/' : 'src/contentPage',
    // 打包用
    root: 'src/',
    // 预览用
    // root: 'src/contentPage',
    plugins: [
      vue(),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), 'src/contentPage/assets/icons')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
      // 复制文件到指定目录
      copy({
        targets: [
          { src: 'src/manifest.json', dest: 'dist' },
          { src: 'src/icons/**', dest: 'dist/icons' }
        ],
      }),
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
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      // 配置 content.js background.js
      rollupOptions: {
        input: {
          popup: path.resolve(__dirname, 'src/popup/index.html'),
          contentPage: path.resolve(__dirname, 'src/contentPage/index.html'),
          content: path.resolve(__dirname, 'src/content/content.js'),
          background: path.resolve(__dirname, 'src/background/service-worker.js'),
        },
        output: {
          assetFileNames: 'assets/[name]-[hash].[ext]', // 静态资源
          chunkFileNames: 'js/[name]-[hash].js', // 代码分割中产生的 chunk
          entryFileNames: (chunkInfo) => { // 入口文件
            const baseName = path.basename(chunkInfo.facadeModuleId, path.extname(chunkInfo.facadeModuleId))
            const saveArr = ['content', 'service-worker']
            return `[name]/${saveArr.includes(baseName) ? baseName : chunkInfo.name}.js`;
          },
          name: '[name].js'
        }
      },
    }
  }
})
