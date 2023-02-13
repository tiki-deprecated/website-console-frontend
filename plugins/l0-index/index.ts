/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { L0Index } from '@mytiki/l0-index-plugin'

export default defineNuxtPlugin((nuxtApp) => {
  const l0Index = new L0Index(useAppConfig().l0index)
  return {
    provide: {
      l0Index: l0Index,
    },
  }
})
