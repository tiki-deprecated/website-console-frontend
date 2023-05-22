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
    host: 'https://console.mytiki.com',
  },
  registry: {
    host: 'https://registry.l0.mytiki.com',
  },
})
