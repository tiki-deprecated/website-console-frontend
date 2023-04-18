/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

interface L0AuthRspOrg {
  userId: string
  email: string
  modified: Date
  created: Date
  users: Array<string>
  apps: Array<string>
}
