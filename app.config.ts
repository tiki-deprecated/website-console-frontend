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
    host: 'https://console.mytiki.com',
  },
})
