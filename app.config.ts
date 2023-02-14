/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export default defineAppConfig({
  l0auth: {
    host: 'https://auth.l0.mytiki.com',
    worker: 'https://auth.l0.mytiki.com',
    cookie: 'refresh_token',
    secure: true,
  },
  l0index: {
    host: 'https://index.l0.mytiki.com',
  },
})
