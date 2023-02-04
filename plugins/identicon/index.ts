/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import { JdenticonConfig, toSvg } from 'jdenticon'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      identicon: (val: string, size: number, config?: JdenticonConfig) =>
        toSvg(val, size, config),
    },
  }
})
