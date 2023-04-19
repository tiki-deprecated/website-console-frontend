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
      script: [{ src: 'https://js.stripe.com/v3' }],
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
  plugins: ['~/plugins/identicon/index.ts', '~/plugins/account/index.ts'],
  runtimeConfig: {
    public: {
      stripePk:
        'pk_test_51MJlp2DveWor0wgFzMF8SfUwsr2zgm4PCb4CWzlp6mF77S10Yr21QTRqBTYcYM1IktSOao2wUBTZKlC7YVB2PUUZ00lDr8UqRk',
    },
  },
})
