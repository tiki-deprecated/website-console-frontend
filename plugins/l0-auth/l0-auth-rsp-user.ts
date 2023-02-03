/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface L0AuthRspUser {
  userId: string
  email: string
  modified: Date
  created: Date
  apps: string[]
}
