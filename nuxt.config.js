/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export default {
  target: 'static',
  head: {
    title: 'TIKI Console | Choose Better Data',
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
  css: [
    '@/assets/fonts/koara/stylesheet.css',
    '@/assets/fonts/space-grotesk/stylesheet.css',
  ],
  styleResources: {
    sass: ['@/assets/styles/*.sass'],
    scss: ['@/assets/styles/*.scss'],
  },
  plugins: ['~/plugins/plausible.js'],
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    [
      'nuxt-compress',
      {
        gzip: {
          cache: true,
        },
        brotli: {
          threshold: 10240,
        },
      },
    ],
  ],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],
  axios: {
    baseURL: '/',
  },
  build: {
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'eval-source-map'
      }
    },
  },
  generate: {
    fallback: '404.html',
  },
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
