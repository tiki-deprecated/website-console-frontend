/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { UsageRspApp } from '~/plugins/registry/usage-rsp-app'

export interface UsageRsp {
  date: Date
  apps: Array<UsageRspApp>
}
