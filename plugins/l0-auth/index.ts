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
      getUser: () => l0Auth.getUser(),
      updateUser: (userId: string, req: L0AuthReqUser) =>
        l0Auth.updateUser(userId, req),
      getApp: (appId: string) => l0Auth.getApp(appId),
      createApp: (req: L0AuthReqApp) => l0Auth.createApp(req),
      deleteApp: (appId: string) => l0Auth.deleteApp(appId),
      updateApp: (appId: string, req: L0AuthReqApp) =>
        l0Auth.updateApp(appId, req),
      getKeys: (appId: string) => l0Auth.getKeys(appId),
      createKey: (appId: string, isPublic: boolean) =>
        l0Auth.createKey(appId, isPublic),
      deleteKey: (keyId: string) => l0Auth.deleteKey(keyId),
    },
  }
})
