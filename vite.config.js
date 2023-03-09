import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import graphql from '@rollup/plugin-graphql'
// ESLint 错误现在都会在浏览器中报告
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'

import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        // port: '8080',
        // open: true,
        cors: true,
        proxy: {
            /** */
            '/api': {
                target: 'http://127.0.0.1:9201/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/graphql': {
                target: 'http://127.0.0.1:9201/graphql',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/graphql/, '')
            },
            '/subscription': {
                target: 'http://127.0.0.1:9201/subscription',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/subscription/, '')
            }
        }
    },
    plugins: [
        vue(),
        graphql(),
        eslintPlugin(),
        AutoImport({
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/,
                /\.vue\?vue/, // .vue
                /\.md$/ // .md
            ],
            imports: [
                // presets
                'vue',
                'vue-router'
            ],
            eslintrc: {
                enabled: true, // Default `false`
                /**解决eslint和unplugin-auto-import/vite冲突 */
                filepath: './.eslintrc-auto-import.json' // Default `./.eslintrc-auto-import.json`
            },
            resolvers: [
                TDesignResolver({
                    library: 'vue-next'
                })
            ]
        }),
        Components({
            resolvers: [
                TDesignResolver({
                    library: 'vue-next'
                })
            ]
        })
    ],

    resolve: {
        alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${resolve('src/assets/css/var.less')}";`,
                    '@primary-color': '#00ffff'
                },
                javascriptEnabled: true
            }
        }
    }
})
