/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export default {
  target: 'static',
  head: {
    title: 'console',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [],
  plugins: [],
  components: true,
  buildModules: ['@nuxtjs/eslint-module'],
  modules: ['@nuxtjs/axios', '@nuxtjs/axios', '@nuxtjs/auth-next'],
  axios: {
    baseURL: '/',
  },
  build: {},
  router: {
    middleware: ['auth'],
  },
  auth: {
    strategies: {
      l0auth: {
        scheme: '~/scripts/l0auth',
        server: 'https://auth.l0.mytiki.com/api/latest',
        audience: ['storage.l0.mytiki.com'],
      },
    },
  },
}
