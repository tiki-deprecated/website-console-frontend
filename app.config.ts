/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export default defineAppConfig({
  account: {
    host: 'https://auth.l0.mytiki.com',
    worker: 'https://console.mytiki.com',
    cookie: 'refresh_token',
    debug: false,
  },
  billing: {
    host: 'http://localhost:8787',
    stripe: {
      igtProductId: 'prod_NxPayH6ltybQVV',
      lmsmProductId: 'prod_NxPvzVRz2wXzPx',
      lmsmaoProductId: 'prod_NxPxbsvCIhGm0I',
    },
  },
  registry: {
    host: 'https://registry.l0.mytiki.com',
  },
})
