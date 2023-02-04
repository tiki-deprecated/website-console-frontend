/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

export default defineAppConfig({
  l0auth: {
    host: 'http://localhost:10502',
    worker: 'http://localhost:8787',
    cookie: 'refresh_token',
    secure: undefined,
    bypass: undefined,
  },
})
