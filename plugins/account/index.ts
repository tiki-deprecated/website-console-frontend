/*
 * Copyright (c) TIKI Inc.
 * MIT license. See LICENSE file in root directory.
 */

import * as L0AuthPlugin from '@mytiki/l0-auth-plugin'
import { Auth } from './auth/auth'

export default defineNuxtPlugin((nuxtApp) => {
  const config: AccountConfig = useAppConfig().account
  const l0Auth: L0AuthPlugin.L0Auth = new L0AuthPlugin.L0Auth({
    host: config.host,
  })
  const auth = new Auth(config, l0Auth)

  return {
    provide: {
      auth: () => auth,

      getUser: async () => l0Auth.getUser((await auth.getToken())?.accessToken),
      updateUser: async (userId: string, req: L0AuthPlugin.UserReqUpdate) =>
        l0Auth.updateUser(userId, req, (await auth.getToken())?.accessToken),

      createApp: async (req: L0AuthPlugin.AppReqUpdate) =>
        l0Auth.createApp(req, (await auth.getToken())?.accessToken),
      getApp: async (appId: string) =>
        l0Auth.getApp(appId, (await auth.getToken())?.accessToken),
      updateApp: async (appId: string, req: L0AuthPlugin.AppReqUpdate) =>
        l0Auth.updateApp(appId, req, (await auth.getToken())?.accessToken),
      deleteApp: async (appId: string) =>
        l0Auth.deleteApp(appId, (await auth.getToken())?.accessToken),

      getOrg: async (orgId: string) =>
        l0Auth.getOrg(orgId, (await auth.getToken())?.accessToken),

      createKey: async (appId: string, isPublic: boolean) =>
        l0Auth.createKey(appId, isPublic, (await auth.getToken())?.accessToken),
      getKeys: async (appId: string) =>
        l0Auth.getKeys(appId, (await auth.getToken())?.accessToken),
      deleteKey: async (keyId: string) =>
        l0Auth.deleteKey(keyId, (await auth.getToken())?.accessToken),
    },
  }
})
