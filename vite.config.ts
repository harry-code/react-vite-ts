import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  css: {
    preprocessorOptions: {
      // CSS 预处理器的配置
      less: {
        // less-loader 中开启 javascriptEnabled
        javascriptEnabled: true,
        // 使用 less 的 modifyVar 来覆盖 less 变量
        modifyVars: {}
      }
    }
  },
  // 设置包引入的别名
  resolve: {
    alias: [{
      find: /^~/,
      replacement: path.resolve(__dirname, "src")
    }]
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://jsonplaceholder.typicode.com/',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '')
      }
    }
  }
})
