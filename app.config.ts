/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export default defineAppConfig({
  account: {
    host: 'https://auth.l0.mytiki.com',
    worker: 'https://console.mytiki.com',
    cookie: 'refresh_token',
    debug: true,
  },
  billing: {
    host: 'http://localhost:8787',
    stripe: {
      igtProductId: 'prod_NwvomO97ioWrGZ',
      lmsmProductId: 'prod_NwuEkwp85fb7va',
      lmsmaoProductId: 'prod_NwuFrRFvb5ctW7',
    },
  },
  registry: {
    host: 'https://registry.l0.mytiki.com',
  },
})
