/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxtjs/plausible'],
  vite: {
    //@ts-ignore
    plugins: [svgLoader()],
  },
  nitro: {
    devProxy: {
      '/api/latest/refresh': {
        target: 'https://console.mytiki.com/api/latest/refresh',
        changeOrigin: true,
        ignorePath: true,
      },
    },
  },
})
