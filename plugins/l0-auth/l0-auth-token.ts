/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface L0AuthToken {
  accessToken: string
  refreshToken: string
  scope: string
  expires: Date
}
