/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import L0Auth from './l0-auth'

export default defineNuxtPlugin((nuxtApp) => {
  const l0Auth = new L0Auth(useAppConfig().l0auth)
  return {
    provide: {
      otp: (email: string) => l0Auth.otp(email),
      grant: (code: string) => l0Auth.grant(code),
      isAuthorized: () => l0Auth.isAuthorized(),
      logout: () => l0Auth.logout(),
    },
  }
})
