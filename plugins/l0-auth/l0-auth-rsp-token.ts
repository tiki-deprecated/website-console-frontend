/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface L0AuthRspToken {
  access_token: string
  refresh_token: string
  scope: string
  token_type: string
  expires_in: number
}
