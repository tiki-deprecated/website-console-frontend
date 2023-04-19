/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface AccountConfig {
  host: string
  worker: string
  cookie: string
  secure?: boolean | undefined
  debug?: boolean
}
